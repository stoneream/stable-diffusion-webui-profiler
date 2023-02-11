import { Prompt } from "./Prompt";
import { v4 as uuidv4 } from "uuid";


export default class ProfileRepository {
  async fetchSavedPrompts(key: string | null): Promise<Array<Prompt>> {
    const values = Object.entries(await chrome.storage.local.get(key))
      .map(([key, value]) => { try { return value as Prompt } catch (e) { return null } });

    return values.filter((v): v is Prompt => v != null)
  }

  async getSavedPrompts(): Promise<Array<Prompt>> {
    return (await this.fetchSavedPrompts(null)).filter(v => !v.isNegativePrompt);
  }

  async getSavedNegativePrompts(): Promise<Array<Prompt>> {

    return (await this.fetchSavedPrompts(null)).filter(v => v.isNegativePrompt);
  }

  async promptFromTextArea(element: Element) {
    if (element != null && element instanceof HTMLTextAreaElement) {
      const textArea = element as HTMLTextAreaElement;

      return textArea.value;
    } else {
      return null;
    }
  }

  async savePrompt(profileName: string): Promise<void> {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let tabId = tab.id!

    chrome.scripting.executeScript({
      target: { tabId }, func: () => {
        const element = document.querySelector("body > gradio-app")?.shadowRoot?.querySelector("#txt2img_prompt > label > textarea");

        if (element != null && element instanceof HTMLTextAreaElement) {
          const textArea = element as HTMLTextAreaElement;

          return textArea.value;
        } else {
          return null;
        }
      }
    }).then(([value]) => {
      if (value.result != null && value.result != "") {
        const id = uuidv4();
        const prompt: Prompt = {
          id: id,
          profileName: profileName,
          prompt: value.result,
          createdAt: new Date(),
          isNegativePrompt: false
        }

        chrome.storage.local.set({ [id]: prompt }).then(() => {
          console.log("saved!");
        }).catch((reason) => {
          console.error(reason);
        });
      } else {
        // do nothing
      }
    });
  }

  async saveNegativePrompt(profileName: string): Promise<void> {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let tabId = tab.id!

    chrome.scripting.executeScript({
      target: { tabId }, func: () => {
        const element = document.querySelector("body > gradio-app")?.shadowRoot?.querySelector("#txt2img_neg_prompt > label > textarea");

        if (element != null && element instanceof HTMLTextAreaElement) {
          const textArea = element as HTMLTextAreaElement;

          return textArea.value;
        } else {
          return null;
        }
      }
    }).then(([value]) => {
      if (value.result != null && value.result != "") {
        const id = uuidv4();
        const prompt: Prompt = {
          id: id,
          profileName: profileName,
          prompt: value.result,
          createdAt: new Date(),
          isNegativePrompt: true
        }

        chrome.storage.local.set({ [id]: prompt }).then(() => {
          console.log("saved!");
        }).catch((reason) => {
          console.error(reason);
        });
      } else {
        // do nothing
      }
    });
  }

  async applyPrompt(id: string, isNegative: boolean, isAppend: boolean): Promise<void> {
    const [value] = await this.fetchSavedPrompts(id);

    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let tabId = tab.id!

    await chrome.scripting.executeScript({
      target: { tabId },
      args: [value.prompt, isNegative],
      func: (prompt: string, isNegative: boolean) => {

        const element = (() => {
          if (isNegative) {
            return document.querySelector("body > gradio-app")?.shadowRoot?.querySelector("#txt2img_neg_prompt > label > textarea");
          } else {
            return document.querySelector("body > gradio-app")?.shadowRoot?.querySelector("#txt2img_prompt > label > textarea");
          }
        })();

        if (element != null && element instanceof HTMLTextAreaElement) {
          const textArea = element as HTMLTextAreaElement;

          textArea.value = prompt;

          console.log(`restored ${prompt}`);
        } else {
          return null;
        }
      }
    });
  }

  async removePrompt(id: string): Promise<void> {
    await chrome.storage.local.remove(id);
  }
}

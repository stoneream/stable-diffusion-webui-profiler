import { Prompt } from "./Prompt";
import { v4 as uuidv4 } from "uuid";


export default class ProfileRepository {
  async fetchSavedPrompts(): Promise<Array<Prompt>> {
    const values = Object.entries(await chrome.storage.local.get(null))
      .map(([key, value]) => { try { return value as Prompt } catch (e) { return null } });

    return values.filter((v): v is Prompt => v != null)
  }

  async getSavedPrompts(): Promise<Array<Prompt>> {
    return (await this.fetchSavedPrompts()).filter(v => !v.isNegativePrompt);
  }

  async getSavedNegativePrompts(): Promise<Array<Prompt>> {

    return (await this.fetchSavedPrompts()).filter(v => v.isNegativePrompt);
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

  applyPrompt(id: string, isAppend: boolean): void { }

  applytNegativePrompt(profileName: string, isAppend: boolean): void { }
}

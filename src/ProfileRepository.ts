import { Prompt } from "./Prompt";

export default class ProfileRepository {
  getSavedPrompts(): Array<Prompt> {
    return [
      {
        id: "1",
        profileName: "profile name 1",
        prompt: "string",
        createdAt: new Date(),
      },
      {
        id: "2",
        profileName: "profile name 2",
        prompt: "string",
        createdAt: new Date(),
      },
      {
        id: "3",
        profileName: "profile name 3",
        prompt: "string",
        createdAt: new Date(),
      },
      {
        id: "4",
        profileName: "profile name 4",
        prompt: "string",
        createdAt: new Date(),
      },
      {
        id: "5",
        profileName: "profile name 5",
        prompt: "string",
        createdAt: new Date(),
      },
    ];
  }

  getSavedNegativePrompts(): Array<Prompt> {
    return [
      {
        id: "1",
        profileName: "profile name 1",
        prompt: "string",
        createdAt: new Date(),
      },
      {
        id: "2",
        profileName: "profile name 2",
        prompt: "string",
        createdAt: new Date(),
      },
      {
        id: "3",
        profileName: "profile name 3",
        prompt: "string",
        createdAt: new Date(),
      },
      {
        id: "4",
        profileName: "profile name 4",
        prompt: "string",
        createdAt: new Date(),
      },
      {
        id: "5",
        profileName: "profile name 5",
        prompt: "string",
        createdAt: new Date(),
      },
    ];
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
        // todo プロンプトを保存する
      } else {
      }
    });
  }

  saveNegativePrompt(profileName: string, promptText: string): void { }

  applyPrompt(profileName: string, isAppend: boolean): void { }

  applytNegativePrompt(profileName: string, isAppend: boolean): void { }
}

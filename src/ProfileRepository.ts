import { Prompt } from "./Prompt";

export default class ProfileRepository {

  getSavedPrompts(): Array<Prompt> {

    return [
      {
        id: "1",
        profileName: "profile name 1",
        prompt: "string",
        createdAt: new Date
      },
      {
        id: "2",
        profileName: "profile name 2",
        prompt: "string",
        createdAt: new Date
      },
      {
        id: "3",
        profileName: "profile name 3",
        prompt: "string",
        createdAt: new Date
      },
      {
        id: "4",
        profileName: "profile name 4",
        prompt: "string",
        createdAt: new Date
      },
      {
        id: "5",
        profileName: "profile name 5",
        prompt: "string",
        createdAt: new Date
      }
    ];
  }

  getSavedNegativePrompts(): Array<Prompt> {
    return [
      {
        id: "1",
        profileName: "profile name 1",
        prompt: "string",
        createdAt: new Date
      },
      {
        id: "2",
        profileName: "profile name 2",
        prompt: "string",
        createdAt: new Date
      },
      {
        id: "3",
        profileName: "profile name 3",
        prompt: "string",
        createdAt: new Date
      },
      {
        id: "4",
        profileName: "profile name 4",
        prompt: "string",
        createdAt: new Date
      },
      {
        id: "5",
        profileName: "profile name 5",
        prompt: "string",
        createdAt: new Date
      }
    ];
  }

  savePrompt(profileName: string, promptText: string): void {
    console.log("save prompt!");
  }

  saveNegativePrompt(profileName: string, promptText: string): void { }

  applyPrompt(profileName: string, isAppend: boolean): void { }

  applytNegativePrompt(profileName: string, isAppend: boolean): void { }

}

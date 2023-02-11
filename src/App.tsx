import "./App.css";
import ProfileRepository from "./ProfileRepository";
import React, { useEffect, useState } from "react";


function App() {
  const profileRepository = new ProfileRepository();
  const [savedPrompt, setSavedPrompt] = useState(Array<JSX.Element>());
  const [savedNegativePrompt, setSavedNegativePrompts] = useState(Array<JSX.Element>());
  const inputRef = React.createRef<HTMLInputElement>();

  useEffect(() => {
    Promise.all([
      profileRepository.getSavedPrompts(),
      profileRepository.getSavedNegativePrompts()
    ]).then(([prompts, negativePrompts]) => {
      setSavedPrompt(prompts.map((prompt) => {
        // todo リストア処理
        return <li key={prompt.id}>{prompt.profileName}</li>;
      }));
      setSavedNegativePrompts(negativePrompts.map((prompt) => {
        // todo リストア処理
        return <li key={prompt.id}>{prompt.profileName}</li>;
      }));
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prompt</h1>
        <ul>
          {savedPrompt}
        </ul>
        <h1>Negative Prompt</h1>
        <ul>
          {savedNegativePrompt}
        </ul>
        <form>
          <label>Profile Name</label>
          <input ref={inputRef} type="text" />
          <div>
            <button
              type="button"
              onClick={() => {
                profileRepository.savePrompt(
                  inputRef.current?.value ?? "noname"
                );
              }}
            >
              Save Prompt
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                profileRepository.saveNegativePrompt(
                  inputRef.current?.value ?? "noname",
                );
              }}
            >
              Save Negative Prompt
            </button>
          </div>
        </form>
      </header>
    </div>
  );

}


export default App;

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
        return (
          <li key={prompt.id}>
            <a className="App-li-text" href="#" onClick={() => {
              profileRepository.applyPrompt(prompt.id, false, false);
            }}>{prompt.profileName}</a>
            <a className="App-li-delete" href="#" onClick={() => { profileRepository.removePrompt(prompt.id); }}>[x]</a>
          </li>
        );
      }));
      setSavedNegativePrompts(negativePrompts.map((prompt) => {
        return (
          <li key={prompt.id}>
            <a className="App-li-text" href="#" onClick={() => {
              profileRepository.applyPrompt(prompt.id, true, false);
            }}>{prompt.profileName}</a>
            <a className="App-li-delete" href="#" onClick={() => { profileRepository.removePrompt(prompt.id); }}>[x]</a>
          </li>
        );
      }));
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h2>Prompt</h2>
        <ul>
          {savedPrompt}
        </ul>
        <h2>Negative Prompt</h2>
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
                  inputRef.current?.value ?? "noname",
                  false
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
                profileRepository.savePrompt(
                  inputRef.current?.value ?? "noname",
                  true
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

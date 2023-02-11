import "./App.css";
import ProfileRepository from "./ProfileRepository";
import React from "react";

class App extends React.Component {
  private profileRepository: ProfileRepository;
  private inputRef = React.createRef<HTMLInputElement>();

  constructor(props: any) {
    super(props);

    this.profileRepository = new ProfileRepository();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Prompt</h1>
          <ul>
            {this.profileRepository.getSavedPrompts().map((prompt) => {
              // todo リストア処理
              return <li key={prompt.id}>{prompt.profileName}</li>;
            })}
          </ul>
          <h1>Negative Prompt</h1>
          <ul>
            {this.profileRepository.getSavedNegativePrompts().map((prompt) => {
              // todo リストア処理
              return <li key={prompt.id}>{prompt.profileName}</li>;
            })}
          </ul>
          <form>
            <label>Profile Name</label>
            <input ref={this.inputRef} type="text" />
            <div>
              <button
                onSubmit={() => {
                  // todo promptを拾う
                  const prompt = "";
                  this.profileRepository.savePrompt(
                    this.inputRef.current?.value ?? "noname",
                    prompt
                  );
                }}
              >
                Save Prompt
              </button>
            </div>
            <div>
              <button
                onSubmit={() => {
                  // todo promptを拾う
                  const negativePrompt = "";
                  this.profileRepository.savePrompt(
                    this.inputRef.current?.value ?? "noname",
                    negativePrompt
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
}

export default App;

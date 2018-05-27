import * as React from "react";
import "./LoginGuard.css";

// The LoginGuard component is a page which validates
// the user has entered a username for the chat app without the need
// to navigate to another page

const USER_NAME_STORAGE_KEY = "userName";

export class LoginGuard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: localStorage.getItem(USER_NAME_STORAGE_KEY),
      userNameInput: ""
    };
  }

  onLogin(userName) {
    localStorage.setItem(USER_NAME_STORAGE_KEY, userName);
    this.setState({
      userName
    });
  }

  onInputChange(userNameInput) {
    this.setState({
      ...this.state,
      userNameInput,
    });
  }

  render() {
    if (this.state.userName) {
      return this.props.children({ userName: this.state.userName });
    } else {
      return (
        <div className="login-guard">
          <h1>🐵 Chatty 🐵</h1>
          <input
            type="text"
            placeholder="You name"
            tabIndex={1}
            onChange={e => this.onInputChange(e.target.value)}
          />
          <br/>
          <button
            tabIndex={2}
            disabled={this.state.userNameInput.length === 0}
            onClick={() => this.onLogin(this.state.userNameInput)}
          >
            Start
          </button>
        </div>
      );
    }
  }
}

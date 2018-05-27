import * as React from "react";
import { map } from "lodash";
import { ChatMessage } from "../components/ChatMessage";
import "./ChatPage.css";
export class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    };
  }

  handleMessage(){
    this.props.onMessage(this.props.userName, this.state.userInput)
    this.setState({
      userInput: ""
    })
  }

  render() {
    return (
      <div className="full-container chat-page">
        <div className="chat-page-history">
          {map(this.props.messages, message => (
            <ChatMessage
              key={message._id}
              message={message}
              isFromMe={message.userName === this.props.userName}
            />
          ))}
        </div>
        <form className="chat-page-control" onSubmit={e => e.preventDefault()}>
          <input
            className="chat-page-control-input"
            type="text"
            value={this.state.userInput}
            placeholder="Your message"
            onChange={e =>
              this.setState({
                userInput: e.target.value
              })
            }
          />
          <button
            className="chat-page-control-submit"
            disabled={this.props.isSending || this.state.userInput.length === 0}
            onClick={() =>
              this.handleMessage()
            }
          >
            {this.props.isSending ? `Sending...` : `Send`}
          </button>
        </form>
      </div>
    );
  }
}

import React from "react";
import { LoginGuard } from "./LoginGuard";
import { ChatPage } from "./ChatPage";
import { MessagesRestHandler } from "./MessagesRestHandler";
import "./App.css";

export class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <LoginGuard>
          {({ userName }) => (
            <MessagesRestHandler>
              {({ onMessage, messages, isSending }) => (
                <ChatPage
                  userName={userName}
                  messages={messages}
                  isSending={isSending}
                  onMessage={onMessage}
                />
              )}
            </MessagesRestHandler>
          )}
        </LoginGuard>
      </div>
    );
  }
}

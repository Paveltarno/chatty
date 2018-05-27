import * as React from "react";
import { take, uniqBy, map } from "lodash";

const POLL_INTERVAL_MS = 2000;
const MESSAGES_BUFFER_MAX = 100;

// A wrapper that communicates with the server submitting and receiving messages
export class MessagesRestHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isSending: false
    };
  }

  async sendMessage(userName, content) {
    this.setState({
      ...this.state,
      isSending: true
    });
    await fetch("/api/messages", {
      body: JSON.stringify({
        userName,
        content
      }),
      method: "POST"
    });
    this.setState({
      ...this.state,
      isSending: false
    });
    this.getMessages();
  }

  async getMessages() {
    let messages;
    if (this.state.messages.length === 0) {
      const response = await fetch("/api/messages");
      messages = (await response.json()).messages;
    } else {
      const response = await fetch(
        `/api/messages?after=${this.state.messages[0].date}`
      );
      messages = (await response.json()).messages;
    }

    // First we
    this.setState({
      ...this.state,

      // We allow only certain amount in our messages buffer
      messages: take(
        uniqBy(
          [
            ...map(messages, message => ({
              ...message,
              date: new Date(message.date)
            })),
            // Parse the date string as a date object
            ...this.state.messages
          ],
          ({ _id }) => _id
        ),
        MESSAGES_BUFFER_MAX
      )
    });
  }

  componentDidMount() {
    this.getMessages();
    this.intervalId = setInterval(() => this.getMessages(), POLL_INTERVAL_MS);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return this.props.children({
      isSending: this.state.isSending,
      messages: this.state.messages,
      onMessage: this.sendMessage.bind(this)
    });
  }
}

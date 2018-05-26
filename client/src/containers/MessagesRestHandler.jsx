import * as React from 'react';
import { last } from 'lodash';

// A wrapper that communicates with the server submitting and receiving messages
export class MessagesRestHandler extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      isSending: false,
    }
  }

  async sendMessage(userName, content){
    this.setState({
      ...this.state,
      isSending: true
    })
    await fetch('/api/messages', {
      body: JSON.stringify({
        userName,
        content,
      }),
      method: 'POST'
    })
    this.setState({
      ...this.state,
      isSending: false,
    })
  }

  async getMessages(){
    let messages = null;
    if(this.state.messages.length === 0){
      messages = await fetch('/api/messages');
    } else {
      messages = await fetch(`/api/messages?after=${last(this.state.messages).date}`)
    }

    this.setState({
      ...this.state,
      messages
    })
  }

  render(){
    return(
      this.props.children({
        isSending: this.state.isSending, 
        messages: this.state.messages,
        onMessage: this.sendMessage.bind(this)
      })
    )
  }

}
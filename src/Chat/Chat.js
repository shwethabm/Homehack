import React, { Component } from 'react';
import { database } from '../firebase';


export default class Chat extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      username: '',
      groupname: ''
    };

    this.onAddMessage = this.onAddMessage.bind(this);
  }

  componentWillMount() {
    const username = localStorage.getItem('chat_username');
    this.setState({username: username ? username : 'Unknown'});
    const groupname = localStorage.getItem('group_groupname');
    this.setState({groupname: groupname ? groupname : 'Unknown'});
    const messagesRef = database.ref('messages')
      .orderByKey()
      .limitToLast(100);

    messagesRef.on('value', snapshot => {
      let messagesObj = snapshot.val();
      let messages = [];
      Object.keys(messagesObj).forEach(key =>  messages.push(messagesObj[key]));
      messages = messages.filter(message => message.group === groupname)
      .map((message) => { return {text: message.text, user: message.user ,group: message.group , id: message.key}})
      this.setState(prevState => ({
        messages: messages,
      }));
    });
  }

  onAddMessage(event) {
    event.preventDefault();
    database.ref('messages').push({text: this.input.value, user: this.state.username, group:this.state.groupname});
    this.input.value = '';
  }

  render() {
    return (
      <div>
        <nav class="navbar"><a href="http://localhost:3000/group#/chat">{this.state.groupname}</a></nav>
        <div className="padding-13 messages-div">
            
            {this.state.messages.map((message) => {
             const _class = message.user === this.state.username ? 'message-left container' : 'message-right container';
            return (
                <div className={_class}>
                  <h6 className="name-heading">{message.user}</h6>
                  <p className="marg-left-10">{message.text}</p>
                  <span className="time-left"></span>
                </div>
            )
            })}
        </div>
      <div className="container textarea-div">
        <textarea className="text-area" ref={node => this.input = node}></textarea>
        <button className="btn btn-info send-btn " onClick={this.onAddMessage}>Send</button>
      </div>
    </div>
    );
  }
}
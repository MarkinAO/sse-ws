import ChatAPI from "./api/ChatAPI";
import Modal from "./Modal";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.contentBox = null;
    this.user = null;
    this.modal = new Modal();
    this.ws = new WebSocket('ws://sse-ws-dashboard-backend.onrender.com/ws');
    this.api = new ChatAPI(this.ws);
    this.connectedUsers = [];
    this.messages = [];
  }

  init() {
    this.bindToDOM();    
    this.modal.open();
    this.onClickBtn = this.onClickBtn.bind(this);
    this.modal.addOnClickHandler(this.onClickBtn);
    this.subscribeOnEvents();
  }

  bindToDOM() {
    this.createDashboard();
    this.showChat();
  }  

  subscribeOnEvents() {
    this.ws.addEventListener('open', (e) => {
        console.log(e)
    })

    this.ws.addEventListener('errore', (e) => {
        console.log(e)
    })

    this.ws.addEventListener('close', (e) => {
        console.log(e)
    })

    this.ws.addEventListener('message', (e) => {
        const res = JSON.parse(e.data);
        console.log(res)
        if(Array.isArray(res)) {
          this.connectedUsers = res;
        } else {
          this.messages.push(res);
        }
        this.refreshChat();
    })    

    const sendForm = document.querySelector('.form');
    sendForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = sendForm.querySelector('.new-message-input').value;
      this.sendMessage(message);      
      e.target.reset();
    })
  }

  onEnterChatHandler() {}

  sendMessage(message) {    
    const msg = JSON.stringify({
      author: this.user, 
      date: new Date, 
      text: message,
      type: 'send'
    })
    message && this.api.send(msg);
  }

  renderMessage() {}

  createDashboard() {
    let container = document.querySelector('.container');

    if (!container) {
      container = document.createElement('div');
      container.classList.add('container');
      this.container.appendChild(container);
    }

    const decorPanel = document.createElement('div');
    decorPanel.classList.add('decorPanel');
    container.appendChild(decorPanel);
    for (let i = 0; i < 3; i++) {
      const cercle = document.createElement('span');
      cercle.classList.add('cercle');
      decorPanel.appendChild(cercle);
    }

    this.contentBox = document.createElement('div');
    this.contentBox.classList.add('contentBox');
    container.appendChild(this.contentBox);
  }

  async onClickBtn(nickName) {    
    const user = { name: nickName };

    const options = {
      method: 'POST',
      body: JSON.stringify(user),
    };

    const url = 'https://sse-ws-dashboard-backend.onrender.com/new-user';
    const res = await fetch(url, options);    
    if(!res.ok) {
      this.modal.showError();
      return;
    }
    
    const json = await res.json();
    this.user = json.user;
    this.modal.close();
    this.connectedUsers.push(json.user);
    this.refreshChat();
  }

  refreshChat() {
    this.renderConnectedUsers();
    this.renderMessages();
  }

  showChat() {
    const chatConnect = document.createElement('div');
    chatConnect.classList.add('chat__connect');
    this.contentBox.append(chatConnect);

    const chatwrap = document.createElement('div');
    chatwrap.classList.add('chat__wrap');
    this.contentBox.append(chatwrap);

    const chatArea = document.createElement('div');
    chatArea.classList.add('chat__area');
    chatwrap.append(chatArea);

    this.refreshChat();

    const form = document.createElement('form');
    form.classList.add('form');
    chatwrap.append(form);

    const newMessageInput = document.createElement('input');
    newMessageInput.classList.add('new-message-input');
    newMessageInput.setAttribute('placeholder', 'Введите сообщение');
    form.append(newMessageInput);

    const sendButton = document.createElement('button');
    sendButton.classList.add('send-button');
    form.append(sendButton);
  }

  renderConnectedUsers() {
    const chatConnect = document.querySelector('.chat__connect');
    chatConnect.innerHTML = '';
    this.connectedUsers.forEach(user => {
      const userItem = document.createElement('div');
      userItem.classList.add('chat__connect-item');

      user.id === this.user?.id && userItem.classList.add('highlight');

      userItem.textContent = user.name;
      chatConnect.append(userItem);
    })
  }

  renderMessages() {
    const chatArea = document.querySelector('.chat__area');
    chatArea.innerHTML = '';

    this.messages.forEach(mes => {
      const messageWrap = document.createElement('div');
      messageWrap.classList.add('message-wrap');

      const messageBody = document.createElement('div');
      messageBody.classList.add('message-body');
      
      const messageTitle = document.createElement('div');
      messageTitle.classList.add('message-title');
      let author = mes.author.name;

      if(mes.author.id === this.user.id) {
        messageTitle.classList.add('highlight');
        messageWrap.classList.add('highlight-message');
        author = 'You';
      }

      messageTitle.textContent = `${author} ${mes.date.toLocaleString().slice(0, -3)}`;

      const messageText = document.createElement('div');
      messageText.classList.add('message-text');
      messageText.textContent = mes.text;      
      
      messageWrap.append(messageBody);      
      messageBody.append(messageTitle);
      messageBody.append(messageText);

      chatArea.append(messageWrap);
    })
  }
}
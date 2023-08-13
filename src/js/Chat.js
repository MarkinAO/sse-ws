import ChatAPI from "./api/ChatAPI";
import Modal from "./Modal";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.contentBox = null;
    this.api = new ChatAPI();
    // this.ws = new WebSocket('ws://sse-ws-dashboard-backend.onrender.com/ws');
    this.modal = new Modal();
  }

  init() {
    this.registerEvents();
    this.bindToDOM();
    // this.modal.open();
    // this.modal.addOnBtnHandler(this.onBtnHandler);
    this.showChat();
  }

  bindToDOM() {
    this.createDashboard();
  }

  registerEvents() {    
      // this.ws.addEventListener('open', (e) => {
      //     console.log(e)
      // })

      // this.ws.addEventListener('errore', (e) => {
      //     console.log(e)
      // })

      // this.ws.addEventListener('message', (e) => {
      //     console.log(e)
      // })

      // this.ws.addEventListener('close', (e) => {
      //     console.log(e)
      // })
  }

  subscribeOnEvents() {}

  onEnterChatHandler() {}

  sendMessage() {}

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

  async onBtnHandler(nickName) {    
    const user = { name: nickName };

    const options = {
      method: 'POST',
      body: JSON.stringify(user),
    };

    const url = 'https://sse-ws-dashboard-backend.onrender.com/new-user';

    const res = await fetch(url, options);
    
    if(!res.ok) {
      this.modal.showErrore();
      return;
    }

    this.modal.close();
    this.showChat();
  }

  showChat() {
    const chatConnect = document.createElement('div');
    chatConnect.classList.add('chat__connect');
    this.contentBox.append(chatConnect);
    chatConnect.textContent = 'A row is created for every separate string listed, and a column is created for each cell in the string. Multiple cell tokens with the same name within and between rows create a single named grid area that spans the corresponding grid cells. Unless those cells form a rectangle, the declaration is invalid. '

    const chatArea = document.createElement('div');
    chatArea.classList.add('chat__area');
    this.contentBox.append(chatArea);
  }
}

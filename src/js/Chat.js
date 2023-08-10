import ChatAPI from "./api/ChatAPI";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;
  }

  async init() {
    this.registerEvents();
    this.bindToDOM();
  }

  bindToDOM() {
    this.createDashboard();
  }

  registerEvents() {
    const ws = new WebSocket('ws://sse-ws-dashboard-backend.onrender.com/ws');
    
        ws.addEventListener('open', (e) => {
            console.log(e)
        })

        ws.addEventListener('errore', (e) => {
            console.log(e)
        })

        ws.addEventListener('message', (e) => {
            console.log(e)
        })

        ws.addEventListener('close', (e) => {
            console.log(e)
        })
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

    const header = document.createElement('div');
    header.classList.add('header');
    container.appendChild(header);

    const addTicketBtn = document.createElement('div');
    addTicketBtn.classList.add('btn');
    addTicketBtn.textContent = 'Добавить тикет';

    header.appendChild(addTicketBtn);

    this.contentBox = document.createElement('div');
    this.contentBox.classList.add('contentBox');
    container.appendChild(this.contentBox);
  }
}

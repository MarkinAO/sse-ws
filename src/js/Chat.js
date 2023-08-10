import ChatAPI from "./api/ChatAPI";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;
  }

  async init() {
    this.registerEvents();
  }

  bindToDOM() {}

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
}

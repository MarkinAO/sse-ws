import Entity from './Entity';
import createRequest from './createRequest';

export default class ChatAPI extends Entity {
    constructor(ws) {
        super(ws);        
    }
    send(msg) {
        this.ws.send(msg);
    }
}

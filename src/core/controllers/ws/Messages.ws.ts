import { globalStore } from '../../../store/global.store';
import { snackbar } from '../../../services/snackbar';
import { wsConfig } from '../../contants/Api';

const urlWs = wsConfig.CHATS;

class MessageWS {
  private _ws: WebSocket;
  private _userId: number;
  private _chatId: number;
  private _token: string;
  private _ping: any;

  constructor() {
    this._handleOpen = this._handleOpen.bind(this);
    this._handleMassage = this._handleMassage.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  private _addEvents() {
    this._ws.addEventListener('open', this._handleOpen);
    this._ws.addEventListener('message', this._handleMassage);
    this._ws.addEventListener('error', this._handleError);
    this._ws.addEventListener('close', this._handleClose);
  }

  private _removeEvents() {
    this._ws.removeEventListener('open', this._handleOpen);
    this._ws.removeEventListener('message', this._handleMassage);
    this._ws.removeEventListener('error', this._handleError);
    this._ws.removeEventListener('close', this._handleClose);
  }

  private _handleOpen() {
    this.getMessages({ offset: 0 });
    this._ping = setInterval(() => {
      this._ws.send('');
    }, 10000);
  }

  private _handleMassage(evt: MessageEvent) {
    const data = JSON.parse(evt.data);
    if (Array.isArray(data)) {
      if (!data.length) {
        globalStore.setState({ messages: [] });
      } else if (data[0].id === 0) {
        globalStore.setState({ messages: data });
      } else {
        const messages = [...globalStore.state.messages, ...data];
        globalStore.setState({ messages });
      }
    } else if (typeof data === 'object' && data.type === 'message') {
      const messages = [data, ...globalStore.state.messages];
      globalStore.setState({ messages });
    }
  }

  private _handleError(evt: ErrorEvent) {
    console.error('Socket error', evt.message);
  }

  private _handleClose(evt: CloseEventInit) {
    this._removeEvents();
    if (evt.wasClean) {
      snackbar.open('Соединение закрыто чисто', 'error');
    } else {
      snackbar.open('Проблемы с подключением', 'error');
    }
    if (evt.code === 1006) {
      this._reconnection();
    }
  }

  private _reconnection() {
    this.connect({
      userId: this._userId,
      chatId: this._chatId,
      token: this._token
    });
  }

  public connect(options: { userId: number; chatId: number; token: string }) {
    this._userId = options.userId;
    this._chatId = options.chatId;
    this._token = options.token;
    this._ws = new WebSocket(`${urlWs}/${options.userId}/${options.chatId}/${options.token}`);
    globalStore.setState({ messages: [] });
    this._addEvents();
  }

  public getMessages(options: { offset: number }) {
    this._ws.send(
      JSON.stringify({
        content: options.offset.toString(),
        type: 'get old'
      })
    );
  }

  public leave() {
    if (!this._ws) {
      return;
    }
    clearInterval(this._ping);
    this._ws.close();
    this._removeEvents();
  }

  public sendMessage(message: string) {
    this._ws.send(
      JSON.stringify({
        content: message,
        type: 'message'
      })
    );
  }
}

export default new MessageWS();

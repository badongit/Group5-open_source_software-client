import Socket from "socket.io-client";
import { SocketEventEnum } from "./constants";

export default class SocketService {
  /**
   *
   * @param {Socket} socket
   */
  constructor(socket) {
    this.socket = socket;

    /**
     * @type User
     */
    this.user = {};
  }

  /**
   *
   * @param {Socket} socket
   */
  setSocket = (socket) => {
    this.socket = socket;
  };

  getSocket = () => this.socket;

  /**
   *
   * @param {User} user
   */
  setUser = (user) => {
    this.user = user;
  };

  clientSendFile = ({ file, metadata }) => {
    console.log(`client send file`);
    this.socket.emit(SocketEventEnum.CLIENT_SEND_FILE, {
      file,
      metadata,
    });
  };

  test = () => {
    this.socket.emit("test", "test");
  };

  getUser = () => this.user;

  onReceiveConversations = (callback) => {
    this.socket.on(SocketEventEnum.SV_SEND_CONVERSATIONS, (data) => {
      callback(data);
    })
  }

  clientGetConversations = () => {
    this.socket.emit(SocketEventEnum.CLIENT_GET_CONVERSATIONS);
  }

  destroyAllListeners = () => {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  };

  /**
   *
   * @param {(...args?: any[]) => any} handler
   */
  destroyListeners = (eventNames) => {
    if (this.socket) {
      eventNames.forEach((eventName) => {
        this.socket.removeAllListeners(eventName);
      });
    }
  };

  disconnect = () => {
    this.socket.close();
  };
}

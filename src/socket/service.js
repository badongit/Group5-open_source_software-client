import Socket from "socket.io-client";

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

  getUser = () => this.user;

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

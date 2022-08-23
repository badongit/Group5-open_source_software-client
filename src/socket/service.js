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
    });
  };

  clientGetConversations = () => {
    this.socket.emit(SocketEventEnum.CLIENT_GET_CONVERSATIONS);
  };

  // create conversation
  /**
   *
   * @param {{ type: string, title: string, members: Array}}
   */
  clientCreateConversation = ({ type, title, members }) => {
    this.socket.emit(SocketEventEnum.CLIENT_CREATE_CONVERSATION, {
      type,
      title,
      members: members.concat(this.user._id),
    });
  };

  // join room
  onInvitationJoinRoom = () => {
    this.socket.on(SocketEventEnum.SV_SEND_INVITATION_JOIN_ROOM, (data) => {
      if (data?.members.includes(this.user._id)) {
        this.socket.emit(SocketEventEnum.CLIENT_JOIN_ROOM, {
          conversationId: data?.conversationId,
        });
      }
    });
  };

  // rename group
  /**
   *
   * @param {{ conversationId: string, title: string}}
   */
  clientRenameGroup = ({ conversationId, title }) => {
    this.socket.emit(SocketEventEnum.CLIENT_RENAME_GROUP, {
      conversationId,
      title,
    });
  };

  // add members to conversation
  clientAddToConversation = ({ conversationId, members }) => {
    this.socket.emit(SocketEventEnum.CLIENT_ADD_TO_CONVERSATION, {
      conversationId,
      members,
    });
  };

  // leave conversation
  clientLeaveConversation = ({ userId, conversationId }) => {
    this.socket.emit(SocketEventEnum.CLIENT_LEAVE_CONVERSATION, {
      userId,
      conversationId,
    });
  };

  // send message
  /**
   *
   * @param {{ text: string, conversationId: string, userId: string}}
   */
  clientSendMessage = ({
    text,
    conversationId,
    userId,
    file,
    metadata,
    subId,
  }) => {
    if (!text && !file) return;
    this.socket.emit(SocketEventEnum.CLIENT_SEND_MESSAGE, {
      text,
      conversationId,
      file,
      metadata,
      userId,
      subId,
    });
  };

  // recall message
  clientRecallMessage = ({ messageId }) => {
    this.socket.emit(SocketEventEnum.CLIENT_RECALL_MESSAGE, {
      messageId,
    });
  };

  onReceiveMessage = (callback) => {
    this.socket.on(SocketEventEnum.SV_SEND_MESSAGE, (data) => {
      callback(data);
    });
  };

  onReceiveConversation = (callback) => {
    this.socket.on(SocketEventEnum.SV_SEND_CONVERSATION, (data) => {
      callback(data);
    });
  };

  clientSendUserId = ({ userId, another, PeerId }) => {
    console.log("gửi perr", PeerId);
    this.socket.emit(SocketEventEnum.CLIENT_SEND_USER_ID, {
      userId,
      another,
      PeerId,
    });
  };

  onReceiveCall = (callback) => {
    this.socket.on(SocketEventEnum.SV_CALL_TO_USER, (data) => {
      callback(data);
    });
  };

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

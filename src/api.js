import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
console.log(BASE_URL)
console.log(process.env.REACT_APP_BASE_URL);
/** API Class.
 *
 * Static class tying together methods used to get/send to the API
 * that is not already covered by the action creators.
 *
 */

class AnonChatApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${AnonChatApi.token}` };
    
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get chat messages from group chat id. */

  static async getChatMessages(id, offset) {
    let res = await this.request(`message/${id}`, {offset});
    return res.messages;
  }

  /** Post message data to database, allowing future users to retrieve them */

  static async sendChatMessage(data) {
    let res = await this.request(`message/${data.unique_id}`, data, "post");
    return res.messages;
  }

  /** Get group chat by id */
  static async getGroupChat(id) {
        let res = await this.request(`chat/${id}`)
        return res.groupChat;
  }

  /** Gets a user by username. 
   * When the app is loaded, this
   * function is called to get
   * the current user
  */
  static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
  }

  /** Check if user exists, just retrieve the username */
  static async checkForUser(username) {
        let res = await this.request(`users/${username}/check`);
        return res.user;
  }

  /** Login user and get token. */
  static async getLogin(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
  }

  /** Signup user */
  static async getSignup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
  }

  /** Delete user */
  static async deleteUser() {
      let res = await this.request(`users`, {}, "delete");
      return res;
  }
}

export default AnonChatApi;
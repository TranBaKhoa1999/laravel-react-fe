import axios from "@/lib/axios.js";
import { ChatRequest } from "../types/Chat";
import { ApiResponse } from "@/types/ApiResponse";

const linkApi = process.env.NEXT_PUBLIC_BACKEND_API_PREFIX + "/assistant";

export class ChatService {
  static async sendMessage(message: string): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${linkApi}`, {
        prompt: message,
      } as ChatRequest);

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message");
    }
  }
}

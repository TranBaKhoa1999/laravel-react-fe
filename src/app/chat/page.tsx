"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "../../components/ChatMessage";
import ChatInput from "../../components/ChatInput";
import SoundToggle from "../../components/SoundToggle";
import AnimeCharacter from "../../components/AnimeCharacter";
import { Message } from "../../types/Chat";
import { ChatService } from "../../services/ChatService";
import SpeechService from "../../services/SpeechService";
import { toast } from "react-toastify";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isCharacterSpeaking, setIsCharacterSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load sound preference from localStorage
  useEffect(() => {
    const savedSoundPreference = localStorage.getItem("chat-sound-enabled");
    if (savedSoundPreference !== null) {
      setIsSoundEnabled(JSON.parse(savedSoundPreference));
    }
  }, []);

  // Save sound preference to localStorage
  useEffect(() => {
    localStorage.setItem("chat-sound-enabled", JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call API
      const response = await ChatService.sendMessage(content);

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Play sound if enabled
      if (isSoundEnabled && SpeechService.isSupported()) {
        setIsCharacterSpeaking(true);
        SpeechService.speak(response.data, () => {
          setIsCharacterSpeaking(false);
        });
      } else {
        // If sound is disabled, still show character speaking animation
        setIsCharacterSpeaking(true);
        setTimeout(() => setIsCharacterSpeaking(false), 3000);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.");
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-content py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg h-[800px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">AI Assistant</h1>
                  <p className="text-sm text-blue-100">
                    Hỏi đáp với AI thông minh
                  </p>
                </div>
              </div>
              <SoundToggle
                isEnabled={isSoundEnabled}
                onToggle={setIsSoundEnabled}
              />
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Chào mừng bạn!
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Tôi là AI Assistant, sẵn sàng giúp bạn trả lời các câu hỏi và
                  hỗ trợ mọi vấn đề.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}

            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-3 py-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>

      {/* Anime Character */}
      <AnimeCharacter isSpeaking={isCharacterSpeaking} />
    </>
  );
}

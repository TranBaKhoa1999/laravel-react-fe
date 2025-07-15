import { useState, useEffect } from "react";
import VoiceRecognitionService from "../services/VoiceRecognitionService";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);

  // Check voice support on mount
  useEffect(() => {
    setIsVoiceSupported(VoiceRecognitionService.isSupported());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceInput = async () => {
    if (!isVoiceSupported || isListening || isLoading) return;

    try {
      setIsListening(true);
      await VoiceRecognitionService.startListening(
        (transcript) => {
          setMessage(transcript);
          setIsListening(false);
        },
        (error) => {
          console.error("Voice recognition error:", error);
          setIsListening(false);
        }
      );
    } catch (error) {
      console.error("Voice input error:", error);
      setIsListening(false);
    }
  };

  const stopVoiceInput = () => {
    VoiceRecognitionService.stopListening();
    setIsListening(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 border-t bg-white rounded-b-lg"
    >
      {/* Voice Input Button */}
      {isVoiceSupported && (
        <button
          type="button"
          onClick={isListening ? stopVoiceInput : handleVoiceInput}
          disabled={isLoading}
          className={`p-2 rounded-lg transition-colors text-sm ${
            isListening
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isListening ? "Dừng ghi âm" : "Ghi âm giọng nói"}
        >
          {isListening ? (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs">Đang nghe...</span>
            </div>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          )}
        </button>
      )}

      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            isListening ? "Đang nghe giọng nói..." : "Nhập tin nhắn của bạn..."
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          rows={1}
          disabled={isLoading || isListening}
        />
      </div>
      <button
        type="submit"
        disabled={!message.trim() || isLoading || isListening}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs">Đang gửi...</span>
          </div>
        ) : (
          "Gửi"
        )}
      </button>
    </form>
  );
}

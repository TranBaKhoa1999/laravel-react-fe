import { useState, useEffect } from "react";

interface AnimeCharacterProps {
  isSpeaking: boolean;
}

export default function AnimeCharacter({ isSpeaking }: AnimeCharacterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mouthFrame, setMouthFrame] = useState(0);

  useEffect(() => {
    // Show character after a short delay
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Mouth animation when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setMouthFrame((prev) => (prev + 1) % 4); // 4 frames for mouth animation
    }, 150); // Change frame every 150ms

    return () => clearInterval(interval);
  }, [isSpeaking]);

  if (!isVisible) return null;

  const getMouthShape = () => {
    switch (mouthFrame) {
      case 0:
        return "w-3 h-1"; // Closed
      case 1:
        return "w-4 h-2"; // Slightly open
      case 2:
        return "w-5 h-3"; // Open
      case 3:
        return "w-4 h-2"; // Slightly open
      default:
        return "w-3 h-1";
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
      <div className="relative">
        {/* Character Container */}
        <div className="w-32 h-40 relative">
          {/* Background glow when speaking */}
          {isSpeaking && (
            <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          )}

          {/* Character Body */}
          <div className="relative w-full h-full">
            {/* Hair - Long flowing blue hair */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-gradient-to-b from-blue-300 to-blue-400 rounded-full"></div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-26 h-14 bg-gradient-to-b from-blue-200 to-blue-300 rounded-full"></div>

            {/* Hair strands */}
            <div className="absolute -top-3 left-6 w-1 h-4 bg-blue-400 rounded-full transform rotate-12"></div>
            <div className="absolute -top-3 right-6 w-1 h-4 bg-blue-400 rounded-full transform -rotate-12"></div>
            <div className="absolute -top-2 left-8 w-1 h-3 bg-blue-300 rounded-full transform rotate-6"></div>
            <div className="absolute -top-2 right-8 w-1 h-3 bg-blue-300 rounded-full transform -rotate-6"></div>

            {/* Hair accessories - Blue roses and ribbons */}
            <div className="absolute -top-1 left-4 w-3 h-3 bg-blue-500 rounded-full opacity-80"></div>
            <div className="absolute -top-1 right-4 w-3 h-3 bg-blue-500 rounded-full opacity-80"></div>
            <div className="absolute -top-2 left-3 w-2 h-4 bg-purple-400 rounded-full transform rotate-12"></div>
            <div className="absolute -top-2 right-3 w-2 h-4 bg-purple-400 rounded-full transform -rotate-12"></div>

            {/* Crown-like headpiece */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-blue-300 rounded-full"></div>
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-blue-200 rounded-full"></div>

            {/* Face */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-gradient-to-b from-pink-100 to-pink-200 rounded-full border-2 border-pink-300 shadow-lg">
              {/* Large expressive blue eyes */}
              <div className="absolute top-6 left-4 w-4 h-5 bg-blue-400 rounded-full border border-blue-500"></div>
              <div className="absolute top-6 right-4 w-4 h-5 bg-blue-400 rounded-full border border-blue-500"></div>

              {/* Eye highlights */}
              <div className="absolute top-5 left-3 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-5 right-3 w-2 h-2 bg-white rounded-full"></div>

              {/* Pupils */}
              <div className="absolute top-7 left-4 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-7 right-4 w-2 h-2 bg-black rounded-full"></div>

              {/* Eyebrows - slightly furrowed when speaking */}
              <div
                className={`absolute top-4 left-3 w-3 h-1 bg-black rounded-full transform ${
                  isSpeaking ? "rotate-12" : "rotate-6"
                }`}
              ></div>
              <div
                className={`absolute top-4 right-3 w-3 h-1 bg-black rounded-full transform ${
                  isSpeaking ? "-rotate-12" : "-rotate-6"
                }`}
              ></div>

              {/* Angry vein when speaking */}
              {isSpeaking && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-red-500 rounded-full"></div>
              )}

              {/* Animated mouth */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div
                  className={`${getMouthShape()} bg-black rounded-full transition-all duration-75`}
                ></div>
              </div>

              {/* Blush */}
              <div className="absolute top-10 left-2 w-2 h-1 bg-pink-400 rounded-full opacity-60"></div>
              <div className="absolute top-10 right-2 w-2 h-1 bg-pink-400 rounded-full opacity-60"></div>
            </div>

            {/* Body - White dress */}
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-white rounded-full border border-gray-200"></div>

            {/* Dress details */}
            <div className="absolute top-30 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-white to-gray-100 rounded-full"></div>

            {/* Purple bow with gem */}
            <div className="absolute top-26 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-purple-400 rounded-full"></div>
            <div className="absolute top-25 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-300 rounded-full"></div>

            {/* Large blue bow on chest */}
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-blue-300 rounded-full"></div>
            <div className="absolute top-31 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-200 rounded-full"></div>

            {/* Butterfly motifs */}
            <div className="absolute top-34 left-6 w-2 h-1 bg-blue-300 rounded-full transform rotate-45"></div>
            <div className="absolute top-34 right-6 w-2 h-1 bg-blue-300 rounded-full transform -rotate-45"></div>
          </div>

          {/* Floating energy effects when speaking */}
          {isSpeaking && (
            <>
              <div className="absolute -top-4 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-bounce"></div>
              <div
                className="absolute -top-5 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="absolute -top-3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-bounce"
                style={{ animationDelay: "0.6s" }}
              ></div>
              <div
                className="absolute -top-6 right-1/2 w-1 h-1 bg-purple-300 rounded-full animate-bounce"
                style={{ animationDelay: "0.9s" }}
              ></div>
            </>
          )}
        </div>

        {/* Speech bubble with Vietnamese text */}
        {isSpeaking && (
          <div className="absolute bottom-full left-0 mb-3 bg-white text-gray-800 rounded-lg shadow-lg p-3 text-xs max-w-40 animate-pulse">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-ping"></div>
              <div
                className="w-1 h-1 bg-gray-400 rounded-full animate-ping"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-1 bg-gray-400 rounded-full animate-ping"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <div className="text-xs text-gray-600">Đang nói...</div>
            <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        )}
      </div>
    </div>
  );
}

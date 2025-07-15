"use client";

import { useEffect, useState } from "react";

interface SoundToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function SoundToggle({ isEnabled, onToggle }: SoundToggleProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsSupported("speechSynthesis" in window);
  }, []);

  if (!isMounted) return null; // Tránh hydration mismatch

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-blue-100 opacity-50">Âm thanh</span>
        <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-white bg-opacity-10">
          <span className="inline-block h-3 w-3 transform translate-x-1 rounded-full bg-white opacity-50" />
        </div>
        <span className="text-xs text-blue-100 opacity-50">(Không hỗ trợ)</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-blue-100">Âm thanh</span>
      <button
        onClick={() => onToggle(!isEnabled)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
          isEnabled ? "bg-white bg-opacity-30" : "bg-white bg-opacity-20"
        }`}
        title={isEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            isEnabled ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

class SpeechService {
  private speechSynthesis: SpeechSynthesis | null = null;
  private speechUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.speechSynthesis = window.speechSynthesis;
    }
  }

  speak(text: string, onEnd?: () => void) {
    if (!this.speechSynthesis) {
      console.warn("Speech synthesis not supported");
      return;
    }

    // Cancel any ongoing speech
    this.speechSynthesis.cancel();

    // Process text for better speech
    const processedText = this.processTextForSpeech(text);

    // Create new utterance
    this.speechUtterance = new SpeechSynthesisUtterance(processedText);

    // Detect language and set appropriate voice
    // const detectedLang = this.detectLanguage(text);
    this.speechUtterance.lang = "vi-VN";

    // Configure speech settings for anime-like female voice
    this.speechUtterance.rate = 0.85; // Slightly slower for natural feel
    this.speechUtterance.pitch = 1.2; // Higher pitch for female voice
    this.speechUtterance.volume = 0.9; // 90% volume

    // Add event listeners
    if (onEnd) {
      this.speechUtterance.onend = onEnd;
    }

    this.speechUtterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
    };

    // Speak the text
    this.speechSynthesis.speak(this.speechUtterance);
  }

  private processTextForSpeech(text: string): string {
    // Remove markdown formatting for cleaner speech
    let processed = text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/\*(.*?)\*/g, "$1") // Remove italic
      .replace(/`(.*?)`/g, "$1") // Remove code
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links
      .replace(/#{1,6}\s/g, "") // Remove headers
      .replace(/\n\s*\n/g, ". ") // Replace double newlines with periods
      .replace(/\n/g, " ") // Replace single newlines with spaces
      .replace(/\s+/g, " ") // Normalize spaces
      .trim();

    // Add pauses for better rhythm
    processed = processed
      .replace(/\./g, "... ")
      .replace(/!/g, "! ")
      .replace(/\?/g, "? ");

    return processed;
  }

  private detectLanguage(text: string): string {
    // Simple language detection based on character sets
    const vietnamesePattern =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
    const japanesePattern =
      /[あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん]/;
    const chinesePattern = /[\u4e00-\u9fff]/;
    const koreanPattern = /[\uac00-\ud7af]/;
    const englishPattern = /^[a-zA-Z\s.,!?;:'"()-]+$/;

    if (vietnamesePattern.test(text)) {
      return "vi-VN"; // Vietnamese
    } else if (japanesePattern.test(text)) {
      return "ja-JP"; // Japanese
    } else if (chinesePattern.test(text)) {
      return "zh-CN"; // Chinese
    } else if (koreanPattern.test(text)) {
      return "ko-KR"; // Korean
    } else if (englishPattern.test(text)) {
      return "en-US"; // English
    } else {
      // Default to Vietnamese for mixed content
      return "vi-VN";
    }
  }

  stop() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }
}

export default new SpeechService();

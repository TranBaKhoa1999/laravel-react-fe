class VoiceRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.setupRecognition();
    } else if (typeof window !== "undefined" && "SpeechRecognition" in window) {
      this.recognition = new (window as any).SpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = "vi-VN"; // Vietnamese
    this.recognition.maxAlternatives = 1;
  }

  startListening(
    onResult: (text: string) => void,
    onError?: (error: string) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error("Speech recognition not supported"));
        return;
      }

      if (this.isListening) {
        reject(new Error("Already listening"));
        return;
      }

      this.isListening = true;

      this.recognition.onstart = () => {
        console.log("Voice recognition started");
      };

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        console.log("Voice recognized:", transcript);
        onResult(transcript);
        this.isListening = false;
        resolve();
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Voice recognition error:", event.error);
        this.isListening = false;
        const errorMessage = this.getErrorMessage(event.error);
        if (onError) onError(errorMessage);
        reject(new Error(errorMessage));
      };

      this.recognition.onend = () => {
        console.log("Voice recognition ended");
        this.isListening = false;
      };

      try {
        this.recognition.start();
      } catch (error) {
        this.isListening = false;
        reject(error);
      }
    });
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  isSupported(): boolean {
    return (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    );
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }

  private getErrorMessage(error: string): string {
    switch (error) {
      case "no-speech":
        return "Không nghe thấy giọng nói. Vui lòng thử lại.";
      case "audio-capture":
        return "Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.";
      case "not-allowed":
        return "Quyền truy cập microphone bị từ chối. Vui lòng cho phép trong cài đặt trình duyệt.";
      case "network":
        return "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.";
      case "service-not-allowed":
        return "Dịch vụ nhận diện giọng nói không khả dụng.";
      default:
        return "Có lỗi xảy ra khi nhận diện giọng nói. Vui lòng thử lại.";
    }
  }
}

export default new VoiceRecognitionService();

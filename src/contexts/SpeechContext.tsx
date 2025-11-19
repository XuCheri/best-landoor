import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

// Define the shape of our SpeechContext
interface SpeechContextType {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  browserSupportsSpeechRecognition: boolean;
}

// Create the context with default values
const SpeechContext = createContext<SpeechContextType>({
  isListening: false,
  transcript: '',
  startListening: () => {},
  stopListening: () => {},
  browserSupportsSpeechRecognition: false,
});

export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  // Directly compute browserSupportsSpeechRecognition on every render
  const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const browserSupportsSpeechRecognition = !!SpeechRecognitionConstructor;

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("Browser does not support Speech Recognition or API not ready.");
      return;
    }

    recognitionRef.current = new SpeechRecognitionConstructor();
    recognitionRef.current.continuous = false; // Simplified for testing
    recognitionRef.current.interimResults = false; // Simplified for testing
    recognitionRef.current.lang = 'en-US'; // Changed to a more common language for testing

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognitionRef.current.onresult = (event: any) => {
      setTranscript(event.results[0][0].transcript);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [browserSupportsSpeechRecognition]); // Dependency on the directly computed value

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        console.log("SpeechContext: Attempting to start speech recognition...");
        recognitionRef.current.start();
      } catch (e) {
        console.error("SpeechContext: Error starting speech recognition:", e);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      console.log("SpeechContext: Attempting to stop speech recognition...");
      recognitionRef.current.stop();
    }
  };

  const value = {
    isListening,
    transcript,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition,
  };

  return (
    <SpeechContext.Provider value={value}>
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => useContext(SpeechContext);
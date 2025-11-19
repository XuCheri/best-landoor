import React from 'react';
import { useSpeech } from '../contexts/SpeechContext';

const SpeechInteractionUI = () => {
  const { isListening, transcript, startListening, stopListening, browserSupportsSpeechRecognition } = useSpeech();

  console.log("SpeechInteractionUI: Full context received:", { isListening, transcript, startListening, stopListening, browserSupportsSpeechRecognition });

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center p-4 bg-red-800 bg-opacity-50 rounded-lg">
        <p className="text-xl text-white">抱歉，您的浏览器不支持语音识别功能。</p>
        <p className="text-md text-white/70 mt-2">请尝试使用 Chrome 或 Edge 浏览器。</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center p-4">
      <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
        实时语音交互
      </h2>
      <button
        onClick={isListening ? stopListening : startListening}
        className={`px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 
                    ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        style={{ color: 'white' }}
      >
        {isListening ? '停止聆听' : '开始语音输入'}
      </button>
      {transcript && (
        <p className="mt-8 text-2xl text-white/90 max-w-2xl">
          您说: <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{transcript}</span>
        </p>
      )}
      {isListening && (
        <p className="mt-4 text-lg text-white/70">正在聆听中...</p>
      )}
    </div>
  );
};

export default SpeechInteractionUI;

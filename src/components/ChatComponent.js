import React, { useState, useEffect, useRef } from 'react';
import './chatstyle.css';

// Main ChatComponent
const ChatComponent = () => {
  const [state, setState] = useState('initial');
  const [messages, setMessages] = useState([]);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const chatBoxRef = useRef(null);
  const chatInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Scroll chat to the bottom
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a bot message
  const addBotMessage = (text) => {
    setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text }]);
  };

  // Send a user message
  const addUserMessage = (text) => {
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text }]);
  };

  // Handle text input
  const handleInput = () => {
    const messageText = chatInputRef.current.value.trim();
    if (messageText) {
      addUserMessage(messageText);
      chatInputRef.current.value = '';
      if (state === 'awaitingDetails') {
        addBotMessage('Please proceed with the analysis via voice recording.');
        setState('awaitingVoiceRecording');
      } else if (state === 'awaitingVoiceRecordingResponse') {
        if (messageText.toLowerCase() === 'r') {
          window.location.reload();
        } else {
          addBotMessage('Please hit refresh.');
          setState('initial');
        }
      }
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgUrl = e.target.result;
        setMessages((prevMessages) => [...prevMessages, { sender: 'user', imgUrl }]);
        addBotMessage('Please enter patient details.');
        setState('awaitingDetails');
      };
      reader.readAsDataURL(file);
    }
  };

  // Start recording audio
  const startRecording = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        recorder.start();
        setIsRecording(true);
        setIsPaused(false);
        setAudioStream(stream);
        setMediaRecorder(recorder);
        setAudioChunks([]);

        recorder.ondataavailable = (event) => {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        };
      }
    } catch (error) {
      addBotMessage('Error accessing microphone. Please check permissions.');
      console.error(error);
    }
  };

  // Pause audio recording
  const pauseRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.pause();
      setIsPaused(true);
    }
  };

  // Continue audio recording
  const continueRecording = () => {
    if (mediaRecorder && isPaused) {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  };

  // Stop audio recording
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setMessages((prevMessages) => [...prevMessages, { sender: 'user', audioUrl: url }]);
        addBotMessage("If the patient's voice is recorded properly, press R to refresh and perform the operation again.");
        setState('awaitingVoiceRecordingResponse');
      };
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
            {message.imgUrl && <img src={message.imgUrl} alt="Uploaded" className="uploaded-image" />}
            {message.audioUrl && <audio controls src={message.audioUrl} className="audio-player" />}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          id="chatInput"
          placeholder="Type a message..."
          ref={chatInputRef}
          onKeyPress={(e) => e.key === 'Enter' && handleInput()}
        />
        <button id="sendButton" onClick={handleInput}>
          Send
        </button>
        <input type="file" id="uploadImage" ref={fileInputRef} onChange={handleImageUpload} hidden />
        <button onClick={() => fileInputRef.current.click()}>Upload Image</button>
        {state === 'awaitingVoiceRecording' && (
          <>
            <button id="recordButton" onClick={startRecording} disabled={isRecording}>
              {isRecording ? 'Recording...' : 'Record'}
            </button>
            {isRecording && (
              <>
                <button id="pauseButton" onClick={pauseRecording} disabled={isPaused}>
                  {isPaused ? 'Paused' : 'Pause'}
                </button>
                <button id="stopButton" onClick={stopRecording}>
                  Stop
                </button>
              </>
            )}
          </>
        )}
        <button id="endConversation" onClick={() => window.location.reload()}>
          End Conversation
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;

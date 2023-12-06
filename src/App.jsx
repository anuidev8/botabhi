import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useState ,useRef, useEffect, Suspense} from "react";
import axios from 'axios'
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { Enviroment } from "./components/Enviroment";
import AudioPlayer from "./components/AudioPlayer";
import { useOpenAiApi } from "./components/useOpenAiApi";

const f = new FFmpeg()
const Loader = () =>{
  return (
    <div className="loader-container">
    <div class="loader loader-big">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
</div>
<h3 style={{ marginTop:4 }}>Loading...</h3>
</div>
  )
}

// This is a conceptual example and may not work out-of-the-box.
// It assumes you have a library that can decode WebM and encode WAV.

async function audioToBase64(audioFile) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(audioFile);
  });
}


function App() {
  const [messages, setMessages] = useState([
    
  ]);
  const [userMessage, setUserMessage] = useState("");
  const chatInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contentType, setContentType] = useState(false)
const [loadingMessage, setLoadingMessage] = useState("Thinking...");
const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [audioUrl, setAudioUrl] = useState(null);

  const generateResponse = async (api) => {
    setContentType('text')
     setIsLoading(true); // Set loading state to true
  setLoadingMessage("Thinking..."); // Set loading message
    try {
      const response = await axios.post(
      `https://testappapi.pythonanywhere.com/${api}`,
        {
          ask: userMessage
        }
      );
      const aiResponse = response.data.response.trim();
     
      setMessages([...messages, { role: "outgoing", content: userMessage },{ role: "incoming", content: aiResponse }]);
    } catch (error) {
      console.error("Error fetching response: ", error);
      setMessages([
        ...messages,
        {
          role: "incoming",
          content: "Oops! Something went wrong. Please try again."
        }
      ]);
    }finally {
      setIsLoading(false); // Reset loading state to false
      setLoadingMessage(""); // Reset loading message
    }
  };

  const sendTextWithAudio = async () =>{
    setIsLoading(true); // Set loading state to true
    setLoadingMessage("Thinking..."); // Set loading message
    try {
      const body =  new FormData()
      body.append('conditional','audio')
      body.append('ask',userMessage)
      const response = await axios.post(
      `http://127.0.0.1:5000/asking`,body);
  // Step 2: Create a Blob from the binary data
const file =  response.data
        console.log(file);
  var numbers = file.trim().split(/\s*,\s*/g).map(x => x/1);
  var binstr = String.fromCharCode(...numbers);
  var b64str = btoa(binstr);
  var src = 'data:audio/wav;base64,' + b64str;

const blob = new Blob([response.data], { type: 'audio/mp3' }); // Replace 'audio/mpeg' with the correct MIME type if needed

// Step 3: Create an Object URL for the Blob
const audioUrlt = src
        
setAudioUrl(audioUrlt); // Save the audio URL in the state


// Add a message indicating that an audio response is available
setMessages([...messages, { role: "outgoing", content: userMessage }, { role: "incoming", content: "Audio response received", audio:audioUrlt}]);
    } catch (error) {
      console.error("Error fetching response: ", error);
      setMessages([
        ...messages,
        {
          role: "incoming",
          content: "Oops! Something went wrong. Please try again."
        }
      ]);
    }finally {
      setIsLoading(false); // Reset loading state to false
      setLoadingMessage(""); // Reset loading message
    } 
  }

  const handleChat = async (e) => {
    e.preventDefault();
    if (!userMessage) return;
    //generateResponse();
    //sendTextWithAudio()
    //setUserMessage("");
   await handleMessage() 
    chatInputRef.current.style.height = "unset";
    chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
  };

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
    e.target.style.height = "unset";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const startRecording = async () => {
    setContentType('audio')
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream,{ mimeType: 'audio/webm' });
    mediaRecorderRef.current.start();

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    setIsRecording(true);
  };


    const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    mediaRecorderRef.current.onstop = async () => {
     
      const audioBlob = new Blob(audioChunksRef.current,{ type: 'audio/webm' });
     
      audioChunksRef.current = []
     
      
      // Here you would handle the audioBlob, for example by sending it to the server
      // or adding it to the messages state to be played back in the UI.
      setIsLoading(true); // Set loading state to true
      setLoadingMessage("Thinking..."); // Set loading message
        try {
          const body =  new FormData()
          body.append('conditional','audio')
          body.append('file',audioBlob)
          const response = await axios.post(
          `http://127.0.0.1:5000/asking`,body);
      // Step 2: Create a Blob from the binary data
const blob = new Blob([response.data], { type: 'audio/mp3' }); // Replace 'audio/mpeg' with the correct MIME type if needed

// Step 3: Create an Object URL for the Blob
const audioUrlt = URL.createObjectURL(blob);
            
  setAudioUrl(response.data); // Save the audio URL in the state
  

  // Add a message indicating that an audio response is available
  setMessages([...messages, { role: "outgoing", content: userMessage }, { role: "incoming", content: "Audio response received", audio:audioUrlt}]);
        } catch (error) {
          console.error("Error fetching response: ", error);
          setMessages([
            ...messages,
            {
              role: "incoming",
              content: "Oops! Something went wrong. Please try again."
            }
          ]);
        }finally {
          setIsLoading(false); // Reset loading state to false
          setLoadingMessage(""); // Reset loading message
        }   
    };
  };

const { getThread,sendMessage ,checking,getMessage} = useOpenAiApi()

const handleMessage = async (e) => {

  try {
        setContentType('text')
     setIsLoading(true); // Set loading state to true
  setLoadingMessage("Thinking..."); // Set loading message
    const thread = await getThread()
    console.log(thread);
    await sendMessage(`${userMessage}`)
     await checking()
     const  aiResponse = await getMessage()
     setMessages([...messages, { role: "outgoing", content: userMessage },{ role: "incoming", content: aiResponse }]);
  }catch (error) {
    console.error("Error fetching response: ", error);
    setMessages([
      ...messages,
      {
        role: "incoming",
        content: "Oops! Something went wrong. Please try again."
      }
    ]);
  }finally {
    setIsLoading(false); // Reset loading state to false
    setLoadingMessage(""); // Reset loading message
  }
 
  
  
}

/*   useEffect(() => {
    const loadBackgroundTexture = async () => {
      const texture = await new Promise(resolve =>
        new THREE.TextureLoader().load(
          'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg',
          resolve
        )
      );
      // Apply the texture to the background
      scene.background = texture;
    };
     // Create a new Three.js scene
     const scene = new THREE.Scene();
    loadBackgroundTexture();
  }, []); */
  
  return (
    <div style={{ height:'100vh' }}>
   
     
      <Suspense fallback={<Loader />} >
    {/*   <Experience /> */}
   
   
    <Enviroment />
   
  
    {
      messages.length === 0 &&
      <div className="chat-present">
      <p className="chat-present-text chat-present-text-title" style={{ marginTop:'1.2rem' }}>Meditate with Abhi</p>
        <p className="chat-present-text" style={{ marginTop:'.6rem' }}>Hi, I am Abhi Duggal. <br/> </p>
      <div className="cover"></div>
      </div>
    }
   
    
 
    <ul className="chatbox">
      {messages.map((message, index) => (
        <li key={index} className={`appear chat ${message.role}`}>
          {message.role === "incoming" && (
            <span className="material-symbols-outlined"> 
          <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 640 512" height="1.9em" width="1.9em" ><path d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z" /></svg>


           </span>
          )}
          <p>{message.content}</p>
          {message.audio && (
        <audio controls >
           <source src={message.audio} type="audio/mpeg"/>
          Your browser does not support the audio element.
        </audio>
      )}
        </li>
      ))}
       {isLoading && (
    <div class="loader">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
</div>
  )}
    </ul>
    <form className="chat-input" style={{ zIndex:'100' }} onSubmit={handleChat}>
    <textarea
              ref={chatInputRef}
              placeholder="Enter a message..."
              spellCheck="false"
              required=""
              value={userMessage}
              onChange={handleInputChange}
              />


              <button
              type="submit"
              id="send-btn"
             
              className="send-btn"
            >
            
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" height="1.6em" width="1.6em"><path d="M435.9 64.9l-367.1 160c-6.5 3.1-6.3 12.4.3 15.3l99.3 56.1c5.9 3.3 13.2 2.6 18.3-1.8l195.8-168.8c1.3-1.1 4.4-3.2 5.6-2 1.3 1.3-.7 4.3-1.8 5.6L216.9 320.1c-4.7 5.3-5.4 13.1-1.6 19.1l64.9 104.1c3.2 6.3 12.3 6.2 15.2-.2L447.2 76c3.3-7.2-4.2-14.5-11.3-11.1z" /></svg>
            
             </button>
             <button
              
              onClick={isRecording ? stopRecording : startRecording}
              className="send-btn-voice"
            >
            
      
      {
        !isRecording  && <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1.5em" width="1.5em" ><path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" /></svg>
      }

      {
        isRecording && <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1.5em" width="1.5em" ><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S16.411,20,12,20z" /><path d="M9 9H15V15H9z" /></svg>
      }

            
             </button>
            
    </form>
    <AudioPlayer />
    </Suspense>
    </div>
  );
}

export default App;


/* content: `
Analyze the user's input ask message and follow these instructions:\n"
- If the message contains the word 'today', respond information according  docs with  the current date and time ('${currentHour}') to the message.\n"
- If the message contains any other day or any other content, return the information of different events  according docs.\n"
 ask input: ${workflow.ask}" 

` */
import React, { useState } from 'react'
 import ChatbotComponent from './components/ChatbotComponent/ChatbotComponent'

const App = () => {
      const [showChatbot, setShowChatbot] = useState(false);
  
  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button id='chatbot-toggler' onClick={() => setShowChatbot(prev => !prev)}>
          <span className="material-symbols-rounded">mode_comment</span>
          <span className="material-symbols-rounded">close</span>
      </button>
      <ChatbotComponent setShowChatbot={setShowChatbot}/>
    </div>
  )
}

export default App

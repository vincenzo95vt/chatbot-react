import React, { useEffect, useRef, useState } from 'react'
import "./ChatbotComponent.css"
import ChatbotIcon from '../ChatbotIcon/ChatbotIcon'
import ChatformComponent from '../ChatformComponent/ChatformComponent'
import ChatMessage from '../ChatMessage/ChatMessage'
import { fetchResponse } from '../../core/services/services'

const ChatbotComponent = ({setShowChatbot}) => {
    const [chatHistory, setChatHistory] = useState([]);
    const chatBodyRef = useRef();

    const generateBotResponse = async (history) => {
        const updateHistory = (text, isError = false) => {
            setChatHistory(prev => [...prev.filter(msg => msg.text !== "Pensando..."), {role: "model", text, isError }])
        }
        
        history = history.map(({role, text}) => ({role, parts: [{text}]}))

        const response = await fetchResponse(history)
        updateHistory(response);
        if(response === "error"){
          updateHistory("Error", true)
        }
    }

    useEffect(() => {
        chatBodyRef.current.scrollTo({top:chatBodyRef.current.scrollHeight, behavior: "smooth"});
    }, [chatHistory])

  return (
    <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(prev => !prev)} class="material-symbols-rounded">keyboard_arrow_down</button>    
        </div>
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">
              Hola! En que puedo ayudarte hoy?
            </p>
          </div>
          {chatHistory.map((chat, idx) => (
            <ChatMessage key={idx} chat={chat}/>
          ) )}
        </div> 
        <div className="chat-footer">
          <ChatformComponent chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>
    </div>
  )
}

export default ChatbotComponent

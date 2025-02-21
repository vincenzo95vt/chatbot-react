import React, { useEffect, useRef, useState } from 'react'
import "./ChatbotComponent.css"
import ChatbotIcon from '../ChatbotIcon/ChatbotIcon'
import ChatformComponent from '../ChatformComponent/ChatformComponent'
import ChatMessage from '../ChatMessage/ChatMessage'

const ChatbotComponent = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const chatBodyRef = useRef();

    const generateBotResponse = async (history) => {
        const updateHistory = (text) => {
            setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text}])
        }
        
        history = history.map(({role, text}) => ({role, parts: [{text}]}))

        const requestOpstions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({contents: history})
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_URL, requestOpstions);
            const data = await response.json();
            if(!response.ok) throw new Error(data.error.message || "Algo ha ido mal...");

            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateHistory(apiResponseText)
            console.log(data)
        } catch (error) {
            
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
          <button class="material-symbols-rounded">keyboard_arrow_down</button>    
        </div>
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">
              Hello! How can I assist you today?
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

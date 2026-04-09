import { useState } from 'react'
import { saveMessage, getMessages } from './services/api'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('Hello')

  const handleSave = async () => {
    try {
      await saveMessage(text)
      alert("Message Saved!")
      handleGet()
    } catch (err) {
      alert("Failed to save message")
    }
  }

  const handleGet = async () => {
    try {
      const data = await getMessages()
      if (data && data.messages) {
        setMessages(data.messages)
      }
    } catch (err) {
      alert("Failed to get messages")
    }
  }

  return (
    <>
      <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px', margin: 'auto' }}>
        <h2>Simple Web</h2>
        
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Enter message"
          style={{ padding: '0.5rem', marginBottom: '1rem' }}
        />
        
        <button onClick={handleSave}>
          Write "{text}"
        </button>
        <button onClick={handleGet}>
          Get Messages
        </button>

        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h3>Messages from DB:</h3>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App

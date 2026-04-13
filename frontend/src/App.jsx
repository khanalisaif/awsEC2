import { useState, useEffect } from 'react'
import { saveMessage, getMessages, deleteMessage } from './services/api'
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

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await deleteMessage(id);
      handleGet();
    } catch (err) {
      alert("Failed to delete message");
    }
  }

  useEffect(() => {
    handleGet();
  }, []);

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
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {messages.map((msg, index) => (
              <li key={msg._id || index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <span style={{ marginRight: '1rem' }}>{msg.text}</span>
                <button 
                  onClick={() => handleDelete(msg._id)}
                  style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App

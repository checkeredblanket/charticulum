import './App.css'
import { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="app">
      <header>Charticulum</header>
      <main>
        <h1>Chart Your Curriculum</h1>
        <p>See how it all fits together.</p>
        <button onClick={() => setShowModal(!showModal)}>
          {showModal ? 'Close' : 'Get Started'}
        </button>
      </main>
      <footer>Copyright @ 2026 Charticulum. All rights reserved.</footer>
    </div>
  )
}

export default App
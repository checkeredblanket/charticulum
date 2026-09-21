import { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="app">
      <header>Charticulum</header>
      <main>
        <h1>Chart Your Curriculum</h1>
        <p>The Visual Academic Planner</p>
        <button onClick={() => setShowModal(!showModal)}>
          {showModal ? 'Close' : 'Get Started'}
        </button>
      </main>
      <footer>@ 2026 Charticulum. All rights reserved.</footer>
    </div>
  )
}

export default App
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextEditor from './components/textEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="header">Instant Sync</div>
     <TextEditor/>
    </>
  )
}

export default App

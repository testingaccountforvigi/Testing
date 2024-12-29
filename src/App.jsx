import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Questions from './components/Questions'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Router>
  )
}

export default App 
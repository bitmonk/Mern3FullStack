import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SingleBlog from './pages/SingleBlog'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog/:id' element={<SingleBlog />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

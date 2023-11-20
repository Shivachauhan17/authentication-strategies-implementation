import React from "react"
import {BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/successfull' element={<div>hello peter</div>}/>
      <Route path='/failure' element={<div>bye peter</div>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

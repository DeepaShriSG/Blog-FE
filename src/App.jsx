import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Welcome from "./components/Welcome"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Blog from "./components/Blog"
import Header from "./components/Header"
import Create from "./components/Create"
import Dashboard from "./components/Dashboard"
import ErrorProvider,{ErrorContext} from "./context/ErrorProvider"

function App() {
 

  return <Router>
      <Routes>
      <Route path = "/blog/:id" element={
       <>
        <Header/>
        <Blog/>
       </> 
     
      }/>  
      <Route path = "/home" element={ 
       <>
       <Header/>
       <Home/>
       </>
      }/>
      <Route path="/dashboard" element={
       <>
       <Header/>
       <Dashboard/>
       </> 
      }/>
      <Route path="/create" element={
         <>
       
      <ErrorProvider>
      <Header/>
        <Create/>
        </ErrorProvider>
        </>
        }/>
      <Route path="/signup" element={<ErrorProvider><Signup/></ErrorProvider>} />  
      <Route path = "/login" element={<Login/>} />
      <Route path = "/" element={<Welcome/>}/>
      </Routes>
     </Router>
     
      
    
  
}

export default App

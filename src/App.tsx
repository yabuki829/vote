import React, { useState } from 'react';
import './App.css';
import Content from './components/contents/Vote/Content';
import Header from './components/headerComponents/Header';
import RightBar from './components/headerComponents/RightBar';
import SideBar from './components/headerComponents/SideBar';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import NotFound from './components/Error/NotFound';
import Contact from './components/contents/contact/Contact';
import Profile from './components/contents/Profile/Profile';
import Register from './components/contents/Auth/Register';
import Login from './components/contents/Auth/Login';
import Post from './components/contents/Post/Post';
import ThreadContent from './components/contents/Thread/ThreadContent';
import VoteDetails from './components/contents/Vote/VoteDetails';
import ThreadDetail from './components/contents/Thread/ThreadDetail';

function App(){

  return (
    <Router>
      <div className=' antialiased md:flex'>
       
        <div className='sticky top-0 z-50 h-0 hidden md:block'>
          <SideBar  />
        </div>
        <div className='flex-grow sticky top-0 z-50'>
          <Header/ >
          <div className=' md:mt-0'>
            <Routes>
              <Route path='/' element={<Content/>}>
              </Route>
              <Route path='/vote/:id' element={<VoteDetails/>}>
              </Route>
              <Route path='/thread/:id' element={ <ThreadDetail/>}>
              </Route>
              <Route path='/thread' element={ <ThreadContent/>}>
              </Route>
              <Route path='/contact' element={<Contact/>}>
              </Route>
              <Route path='/post' element={<Post/>}>
                
              </Route>
              <Route path='/profile' element={<Profile/>}>
              </Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/*' element={<NotFound/ >}>
              </Route>
            </Routes>
          </div>
        </div> 
        
        <Routes>
          <Route path='/' element={<RightBar/>}></Route>
          <Route path='/thread' element={ <RightBar/>}></Route>
          <Route path='/profile' element={<RightBar/>}></Route>
          <Route path='/vote/:id' element={<RightBar/>}></Route>
          <Route path='/thread/:id' element={<RightBar/>}></Route>
        </Routes>
      </div>
     
      </Router>
  );
}

export default App;

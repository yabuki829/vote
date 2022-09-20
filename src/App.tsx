import React, { useState } from 'react';
import './App.css';
import Content from './components/Content';

import Header from './components/headerComponents/Header';
import RightBar from './components/headerComponents/RightBar';
import SideBar from './components/SideBar';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import NotFound from './components/contents/NotFound';
import Contact from './components/contents/contact/Contact';
import Profile from './components/contents/Profile';
import Register from './components/contents/Auth/Register';
import Login from './components/contents/Auth/Login';

function App(){
  const [isSideBarOpen,setSideBarOpen] = useState(false)

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
              <Route path='/' element={<><Content/><Content/><Content/><Content/></>}>
              </Route>
              <Route path='/thread' element={ <h1>Thread</h1>}>
              </Route>
              <Route path='/contact' element={<Contact/>}>
              </Route>
              <Route path='/post' element={<h1>投稿ページ</h1>}>
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
       
         
        </Routes>
      </div>
     
      </Router>
  );
}

export default App;

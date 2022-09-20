import React, { useState } from 'react';
import './App.css';
import Content from './components/Content';

import Header from './components/headerComponents/Header';
import RightBar from './components/headerComponents/RightBar';
import SideBar from './components/SideBar';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import NotFound from './components/contents/NotFound';
import Contact from './components/contents/contact/Contact';

function App(){
  const [isSideBarOpen,setSideBarOpen] = useState(false)

  return (
    <Router>
      <div className=' antialiased md:flex'>
       
        <div className='sticky top-0 z-50 h-0 hidden md:block'>
          <SideBar isOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />
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
              <Route path='/profile' element={<h1>プロフィール</h1>}>
              </Route>
              <Route path='/register' element={<h1>Register画面</h1>}></Route>
              <Route path='/*' element={<NotFound/ >}>
              </Route>
            </Routes>
          </div>
        </div> 
        <Routes>
          <Route path='/' element={<RightBar/>}></Route>
          <Route path='/thread' element={ <RightBar/>}></Route>
          <Route path='/profile' element={<RightBar/>}></Route>
          <Route path='/post' element={<RightBar/>}></Route>
          
         
        </Routes>
      </div>
     
      </Router>
  );
}

export default App;

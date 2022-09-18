import React, { useState } from 'react';
import './App.css';
import Content from './components/Content';

import Header from './components/Header';
import RightBar from './components/headerComponents/RightBar';
import SideBar from './components/SideBar';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"

function App(){
  const [isSideBarOpen,setSideBarOpen] = useState(false)

  return (
   
      <div className=' antialiased md:flex'>
        <Router>
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
              <Route path='/contact' element={<h1>Contact</h1>}>
              </Route>
              <Route path='/post' element={<h1>投稿ページ</h1>}>
              </Route>
            </Routes>
           
          </div>
         
        </div>   
        <div className='top-0 right-0 sticky md:h-full hidden md:block'>
          <RightBar/>
        </div>
        </Router>
      </div>
    
  );
}

export default App;

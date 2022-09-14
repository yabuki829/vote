import React, { useState } from 'react';
import './App.css';
import Content from './components/Content';

import Header from './components/Header';
import RightBar from './components/RightBar';
import SideBar from './components/SideBar';



function App(){
  const [isSideBarOpen,setSideBarOpen] = useState(false)

  return (
   
      <div className=' antialiased md:flex'>
        <div className='sticky top-0 z-50 h-0 hidden md:block'>
          <SideBar isOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />
        </div>

        <div className='flex-grow sticky top-0 z-50'>
          <Header/ >
          <div className=' md:mt-0'>
            <Content/>
            <Content/>
            <Content/>
            <Content/>
            <Content/>
            <Content/>
            <Content/>
            <Content/>
            <Content/>
            <Content/> <Content/> <Content/> <Content/>
          </div>
         
        </div>   
        <div className='top-0 right-0 sticky md:h-full hidden md:block'>
          <RightBar/>
        </div>
      </div>

     
    
  );
}

export default App;

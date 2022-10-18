import React from 'react'
import { useLocation } from 'react-router-dom';

const Search = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);

  function fetchAPIVoteData(){
    //query.get('q')でfilterかける
  }
  return (
    <div>
       <div></div>
    </div>
  )
}

export default Search
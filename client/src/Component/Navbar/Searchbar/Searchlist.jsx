/*import React from 'react'
import { FaSearch } from "react-icons/fa"
import './Searchlist.css'
const Searchlist = ({Titlearray,setsearchquery}) => {
  return (
    <>
        <div className="Container_SearchList">
            {Titlearray.map(m=>{
                return <p key={m} onClick={e=>setsearchquery(m)} className='titleItem'>
                    <FaSearch/>{m}
                </p>
            })
            }
        </div>
    </>
  )
}

export default Searchlist*/



import React from 'react';
import { FaSearch } from "react-icons/fa";
import './Searchlist.css';

const Searchlist = ({ Titlearray, setsearchquery }) => {
  return (
    <div className="Container_SearchList">
      {Titlearray?.length > 0 ? (
        Titlearray.map((m) => (
          <p
            key={m}
            onClick={() => setsearchquery(m)}
            className="titleItem"
          >
            <FaSearch /> {m}
          </p>
        ))
      ) : (
        <p className="no-results">No suggestions available</p>
      )}
    </div>
  );
};

export default Searchlist;

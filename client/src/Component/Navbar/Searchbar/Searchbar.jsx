import React, { useState, useEffect } from 'react';
import './Searchbar.css';
import { BsMicFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import Searchlist from './Searchlist';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Searchbar = () => {
  const [Searchquery, setsearchquery] = useState('');
  const [searchlist, setsearchlist] = useState(false);

  // Fetch videos from Redux store
  const videos = useSelector(s => s?.videoreducer?.data || []);

  // Filter titles safely
  const Titlearray = videos
    .filter(video =>
      (video?.videotitle || '').toUpperCase().includes((Searchquery || '').toUpperCase())
    )
    .map(video => video?.videotitle);

  // Hide the dropdown when search is empty
  useEffect(() => {
    if (Searchquery === '') setsearchlist(false);
  }, [Searchquery]);

  return (
    <>
      <div className="SearchBar_Container">
        <div className="SearchBar_Container2">
          <div className="search_div">
            <input
              type="text"
              className="iBox_SearchBar"
              placeholder="Search"
              value={Searchquery}
              onChange={e => setsearchquery(e.target.value)}
              onClick={() => setsearchlist(true)}
            />
            <Link to={`/search/${Searchquery}`}>
              <FaSearch className="searchIcon_SearchBar" />
            </Link>
            <BsMicFill className="Mic_SearchBar" />

            {Searchquery && searchlist && (
              <Searchlist setsearchquery={setsearchquery} Titlearray={Titlearray} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;

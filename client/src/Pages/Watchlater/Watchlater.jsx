import React from 'react';
import WHL from '../../Component/WHL/WHL';
import { useSelector } from 'react-redux';

const Watchlater = () => {
  // Safely get watch later video list
  const watchlatervideolist = useSelector((state) => state.watchlaterreducer || { data: [] });

  // Safely get current user
  const currentuser = useSelector((state) => state.authreducer?.authdata);
  const userId = currentuser?.result?._id;

  // If not logged in, show message
  if (!userId) {
    return <p style={{ padding: '20px' }}>Please log in to view your Watch Later videos.</p>;
  }

  // Ensure videolist is always an array
  const safeVideoList = watchlatervideolist?.data || [];

  return <WHL page="Watch Later" videolist={safeVideoList} />;
};

export default Watchlater;

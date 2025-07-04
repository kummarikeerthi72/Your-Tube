import React from 'react';
import WHL from '../../Component/WHL/WHL';
import { useSelector } from 'react-redux';

const Watchhistory = () => {
  // Safely select the watch history video list from redux
  const watchhistoryvideolist = useSelector((state) => state.historyreducer || { data: [] });

  // Optional: Check if user is logged in (if needed)
  const currentuser = useSelector((state) => state.authreducer?.authdata);
  const userId = currentuser?.result?._id;

  // If user not logged in, show message instead of crashing
  if (!userId) {
    return <p style={{ padding: '20px' }}>Please log in to view your watch history.</p>;
  }

  // Defensive: make sure WHL gets an array (never null)
  const safeVideoList = watchhistoryvideolist?.data || [];

  return (
    <WHL page="History" videolist={safeVideoList} />
  );
};

export default Watchhistory;

import React from 'react';
import WHL from '../../Component/WHL/WHL';
import { useSelector } from 'react-redux';

const Likedvideo = () => {
  // Safely get liked video list from redux
  const likedvideolist = useSelector((state) => state.likedvideoreducer || { data: [] });

  // Safely get current user
  const currentuser = useSelector((state) => state.authreducer?.authdata);
  const userId = currentuser?.result?._id;

  // If not logged in, show message
  if (!userId) {
    return <p style={{ padding: '20px' }}>Please log in to view your liked videos.</p>;
  }

  // Ensure videolist is never null
  const safeVideoList = likedvideolist?.data || [];

  return <WHL page="Liked Video" videolist={safeVideoList} />;
};

export default Likedvideo;

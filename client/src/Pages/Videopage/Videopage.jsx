import React, { useEffect } from 'react';
import './Videopage.css';
import moment from 'moment';
import Likewatchlatersavebtns from './Likewatchlatersavebtns';
import { useParams, Link } from 'react-router-dom';
import Comment from '../../Component/Comment/Comment';
import { viewvideo } from '../../action/video';
import { addtohistory } from '../../action/history';
import { useSelector, useDispatch } from 'react-redux';

const Videopage = () => {
  const { vid } = useParams();
  const dispatch = useDispatch();

  const vids = useSelector((state) => state.videoreducer);
  const currentuser = useSelector((state) => state.currentuserreducer);

  // Find current video
  const vv = Array.isArray(vids?.data) ? vids.data.find((q) => q._id === vid) : null;

  // Add to views and history
  useEffect(() => {
    if (vid) {
      dispatch(viewvideo({ id: vid }));
    }

    if (currentuser?.result?._id && vid) {
      dispatch(
        addtohistory({
          videoid: vid,
          viewer: currentuser.result._id,
        })
      );
    }
  }, [currentuser, dispatch, vid]);

  if (!vv) return <p style={{ padding: '20px' }}>Loading video...</p>;

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            {/* Streaming-compatible video */}
           <video
  src={`http://localhost:5000/uploads/${vv.filename}`}  // Ensure it matches upload route
  className="video_ShowVideo_videoPage"
  controls
  type="video/mp4"
/>


            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.title}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.views || 0} views <div className="dot"></div>{' '}
                    {moment(vv?.createdat).fromNow()}
                  </div>
                  <Likewatchlatersavebtns vv={vv} vid={vid} />
                </div>
              </div>

              <Link to="/" className="chanel_details_videoPage">
                <b className="chanel_logo_videoPage">
                  <p>{(vv?.uploader || 'U').charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videoPage">{vv?.uploader || 'Unknown'}</p>
              </Link>

              <div className="comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comment videoid={vv._id} />
              </div>
            </div>
          </div>

          {/* ✅ More videos */}
          <div className="moreVideoBar">
            <h3>More Videos</h3>
            <div className="moreVideosList">
              {(vids?.data || [])
                .filter((video) => video._id !== vid)
                .map((video) => (
                  <Link key={video._id} to={`/videopage/${video._id}`} className="moreVideoCard">
                    <video
                      src={`http://localhost:5000/${video.filepath}`}
                      className="thumbnail"
                      muted
                    />
                    <div className="moreVideoInfo">
                      <p className="moreVideoTitle">{video.title}</p>
                      <p className="moreVideoUploader">{video.uploader}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Videopage;

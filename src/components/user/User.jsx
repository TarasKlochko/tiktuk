import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import postsList from '../../user-feed.json';
import Loading from '../loading/Loading';
import './User.css';

console.log(postsList.itemList);
export default function User() {
  const location = useLocation();
  const name = location.pathname.split('user/')[1];
  const [userData, setUserData] = useState();
  // const [postsList, setPostsList] = useState();
  const [firstPost, setFirstPost] = useState(0);
  const [lastPost, setLastPost] = useState(10);
  const postPerPage = 10;
  const postsFromApi = postsList.itemList.length;

  useEffect(() => {
    fetch(`https://tiktok33.p.rapidapi.com/user/info/${name}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
        'x-rapidapi-key': 'c1257dc04cmshd888bbb072eb770p1f2b8ajsnbf16d4cd1d66',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('userData', data);
        setUserData(data);
      })
      .catch((err) => {
        console.error(err);
      });

    // fetch(`https://tiktok33.p.rapidapi.com/user/feed/${name}`, {
    //   method: 'GET',
    //   headers: {
    //     'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
    //     'x-rapidapi-key': 'c1257dc04cmshd888bbb072eb770p1f2b8ajsnbf16d4cd1d66',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('data', data);
    //     setPostsList(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, [name]);

  function handlePrevPosts() {
    if (firstPost > 0) {
      setFirstPost(firstPost - postPerPage);
      setLastPost(lastPost - postPerPage);
    }
  }

  function handleNextPosts() {
    if (lastPost < postsFromApi) {
      setFirstPost(firstPost + postPerPage);
      setLastPost(lastPost + postPerPage);
    }
  }

  return (
    <>
      {userData && (
        <div className="user">
          <div className="user__avatar">
            <img className="user__avatar-img" src={userData.user.avatarMedium} alt="avatar" />
          </div>
          <ul className="user__info">
            <li className="user__item">
              <span className="user__item_key">id:</span> {userData.user.id}
            </li>
            <li className="user__item">
              <span className="user__item_key">unique id:</span> {userData.user.uniqueId}
            </li>
            <li className="user__item">
              <span className="user__item_key">nickname:</span> {userData.user.nickname}
            </li>
            <li className="user__item">
              <span className="user__item_key">link:</span> {userData.user.bioLink ? userData.user.bioLink.link : '-'}
            </li>
            <li className="user__item">
              <span className="user__item_key">signature:</span> {userData.user.signature}
            </li>
            <li className="user__item">
              <span className="user__item_key">follower count:</span> {userData.stats.followerCount}
            </li>
            <li className="user__item">
              <span className="user__item_key">heart:</span> {userData.stats.heart}
            </li>
            <li className="user__item">
              <span className="user__item_key">video count:</span> {userData.stats.videoCount}
            </li>
          </ul>
        </div>
      )}

      {userData && postsList && (
        <>
          <ul className="video-list">
            {postsList.itemList.map((item, index) => {
              if (index >= firstPost && index < lastPost) {
                return (
                  <li key={item.id} className="video-list__item">
                    <p className="video-list__item-playCount">play count: {item.stats.playCount}</p>
                    <iframe
                      className="video-list__item-video"
                      src={item.video.playAddr}
                      title="YouTube video player"
                      frameBorder="0"
                      sandbox=""
                      allowFullScreen
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </li>
                );
              }
              return null;
            })}
          </ul>
          <div className="pagination-wrap">
            <button
              type="button"
              className={firstPost ? 'prev-posts' : ' prev-posts prev-posts_disabled'}
              onClick={handlePrevPosts}
            >
              Prev
            </button>
            <button
              type="button"
              className={lastPost < postsFromApi ? 'prev-posts' : 'prev-posts prev-posts_disabled'}
              onClick={handleNextPosts}
            >
              Next
            </button>
          </div>
        </>
      )}
      {!userData && <Loading />}
    </>
  );
}

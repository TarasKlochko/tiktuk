import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './PostList.css';

export default function PostList() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState();
  const [firstPost, setFirstPost] = useState(0);
  const [lastPost, setLastPost] = useState(10);
  const [errorFromAPI, setErrorFromAPI] = useState();
  const postPerPage = 10;
  const postsFromApi = 30;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://tiktok33.p.rapidapi.com/trending/feed?&limit=${postsFromApi}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
        'x-rapidapi-key': 'c1257dc04cmshd888bbb072eb770p1f2b8ajsnbf16d4cd1d66',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setIsLoading(false);
        setPosts(data);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setErrorFromAPI(err);
      });
  }, []);

  function handleUser(name) {
    navigate(`/user/${name}`);
  }

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
      {isLoading && <Loading />}
      <ul className="post-list">
        {posts &&
          posts.map((post, index) => {
            if (index >= firstPost && index < lastPost) {
              return (
                <li className="post-list__item" key={post.id}>
                  <iframe
                    className="post-list__video"
                    src={post.videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    sandbox=""
                    allowFullScreen
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  <div className="post-list__info">
                    <div className="post-list__avatar" onClick={() => handleUser(post.authorMeta.name)}>
                      <img className="post-list__avatar-img" src={post.authorMeta.avatar} alt="avatar" />
                    </div>
                    <div className="post-list__info-wrap">
                      <p className="post-list__info-text">{post.text}</p>
                      <h2 className="post-list__info-name" onClick={() => handleUser(post.authorMeta.name)}>
                        {post.authorMeta.name}
                      </h2>
                      {post.hashtags && (
                        <p className="post-list__info-hash">{post.hashtags.map((hash) => `#${hash.name} `)}</p>
                      )}
                      <div className="post-list__info-coment-like-wrap">
                        <p className="post-list__info-coment">{post.commentCount ? post.commentCount : '0'} coments</p>{' '}
                        <p className="post-list__info-likes">{post.diggCount ? post.diggCount : '0'} likes</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            }
            return null;
          })}
      </ul>
      {posts && (
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
      )}
      {errorFromAPI && <ErrorMessage errorMessage={errorFromAPI} />}
    </>
  );
}

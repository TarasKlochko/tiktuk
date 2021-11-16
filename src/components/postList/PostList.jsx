import React, { useState, useEffect } from 'react';
import './PostList.css';

export default function PostList() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch('https://tiktok33.p.rapidapi.com/trending/feed?&limit=10', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
        'x-rapidapi-key': '5a73653850msh2d398658b35d08ep117c3cjsn513825c6aa32',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setPosts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ul className="post-list">
      {posts &&
        posts.map((post) => (
          <li className="post-list__item" key={post.id}>
            <iframe
              className="post-list__video"
              src={post.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              sandbox=""
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            <div className="post-list__info">
              <div className="post-list__avatar">
                <img className="post-list__avatar-img" src={post.authorMeta.avatar} alt="avatar" />
              </div>
              <div className="post-list__info-wrap">
                <p className="post-list__info-text">{post.text}</p>
                <h2 className="post-list__info-name"> {post.authorMeta.name}</h2>
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
        ))}
    </ul>
  );
}

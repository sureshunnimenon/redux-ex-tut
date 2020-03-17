import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// bring in asyncrhonous fetch posts

import { fetchPosts } from '../actions/postsActions';
import Post from '../components/Post';

function PostsPage({ dispatch, loading, posts, hasErrors }) {
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Show loading, error, or success state
  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>;
    if (hasErrors) return <p>Unable to display posts.</p>;
    return posts.map(post => <Post key={post.id} post={post} />);
  };

  return (
    <section>
      <h1>Posts</h1>
      {renderPosts()}
    </section>
  );
}

// map redux state to props
const mapStateToProps = state => ({
  loading: state.posts.loading,
  posts: state.posts.posts,
  hasErrors: state.posts.hasErrors
});

// connect redux to react

export default connect(mapStateToProps)(PostsPage);

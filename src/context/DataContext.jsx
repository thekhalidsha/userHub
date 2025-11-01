import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';

const DataContext = createContext();

const postsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.payload;
    case 'ADD_POST':
      return [action.payload, ...state];
    case 'UPDATE_POST':
      return state.map(post => 
        post.id === action.payload.id ? action.payload : post
      );
    case 'DELETE_POST':
      return state.filter(post => post.id !== action.payload);
    default:
      return state;
  }
};

const fetchWithDelay = async (url, delay = 800) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
};

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, dispatch] = useReducer(postsReducer, []);
  const [loading, setLoading] = useState({ users: false, posts: false });
  const [error, setError] = useState({ users: null, posts: null });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(prev => ({ ...prev, users: true }));
      try {
        const data = await fetchWithDelay('/data/users.json');
        setUsers(data);
        setError(prev => ({ ...prev, users: null }));
      } catch (err) {
        setError(prev => ({ ...prev, users: 'Failed to load users' }));
        toast.error('Failed to load users');
      } finally {
        setLoading(prev => ({ ...prev, users: false }));
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(prev => ({ ...prev, posts: true }));
      try {
        const data = await fetchWithDelay('/data/posts.json');
        dispatch({ type: 'SET_POSTS', payload: data });
        setError(prev => ({ ...prev, posts: null }));
      } catch (err) {
        setError(prev => ({ ...prev, posts: 'Failed to load posts' }));
        toast.error('Failed to load posts');
      } finally {
        setLoading(prev => ({ ...prev, posts: false }));
      }
    };
    fetchPosts();
  }, []);

  const addPost = (userId, postData) => {
    const newPost = {
      id: Date.now(),
      userId,
      ...postData,
      date: new Date().toISOString().split('T')[0]
    };
    dispatch({ type: 'ADD_POST', payload: newPost });
    toast.success('Post created successfully!');
  };

  const updatePost = (postId, updates) => {
    const updatedPost = posts.find(p => p.id === postId);
    if (updatedPost) {
      dispatch({ 
        type: 'UPDATE_POST', 
        payload: { ...updatedPost, ...updates } 
      });
      toast.success('Post updated successfully!');
    }
  };

  const deletePost = (postId) => {
    dispatch({ type: 'DELETE_POST', payload: postId });
    toast.success('Post deleted successfully!');
  };

  const getPostsByUserId = (userId) => {
    return posts.filter(post => post.userId === parseInt(userId));
  };

  const searchPosts = (query, userId = null) => {
    let filteredPosts = posts;
    if (userId) {
      filteredPosts = getPostsByUserId(userId);
    }
    return filteredPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const value = {
    users,
    posts,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    getPostsByUserId,
    searchPosts
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

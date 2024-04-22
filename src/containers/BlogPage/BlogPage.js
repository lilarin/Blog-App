import React, { useState, useEffect } from 'react';
import './BlogPage.css';
import axios from 'axios';

export const BlogContent = () => {
    const [posts, setPosts] = useState([]);
    const [openPost, setOpenPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('content');
    const [error, setError] = useState(null);
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3003/api/filter/posts', {
            params: {
                searchType: searchType,
                searchTerm: searchTerm
            }
        })
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            setError(error);
            console.error('Error retrieving data from the API:', error);
            setShowErrorPopup(true);
            setTimeout(() => {
                setShowErrorPopup(false);
                setError(null);
            }, 15000);
        });
    }, [searchType, searchTerm]);
    

    const handlePostClick = (postId) => {
        setOpenPost(openPost === postId ? null : postId);
    };

    const getPreviewStyle = (postId) => {
        if (openPost === postId) {
            return { display: 'none' };
        } else {
            return { opacity: 0.5 };
        }
    };

    const handleAnimationEnd = () => {
        setError(null);
        setShowErrorPopup(false);
      };

    /* const filteredPosts = posts.filter(post => {
        if (searchType === 'content') {
            return post.content.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'title') {
            return post.title.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'author') {
            return post.author.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    }); */

    return (
        <>
            {showErrorPopup && (
            <div className={`popup ${showErrorPopup ? '' : 'fadeOut'}`}>
                <p>{error && error.message}</p>
            </div>
            )}

            <h1>Простий блог</h1>

            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Пошук..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="content">Зміст</option>
                    <option value="title">Назва</option>
                    <option value="author">Автор</option>
                </select>
            </div>

            <div className="posts">
                {posts.map(post => (
                    <div key={post.id} className={`post ${openPost === post.id ? 'active' : ''}`} onClick={() => handlePostClick(post.id)}>
                        <h2>{post.title}</h2>
                        {openPost !== post.id && (
                            <p style={{ ...getPreviewStyle(post.id) }}>
                                {post.content.slice(0, 200)}...
                            </p>
                        )}
                        {openPost === post.id && (
                            <>
                                <p>{post.content}</p>
                                <p>Автор: {post.author}</p>
                                <p>Дата: {post.date}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

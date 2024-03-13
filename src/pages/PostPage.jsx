import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    const fetchPostInfo = () => {
        fetch(`http://localhost:3000/post/${id}`)
            .then(response => response.json())
            .then(postInfo => setPostInfo(postInfo));
    };

    const fetchComments = () => {
        fetch(`http://localhost:3000/comments/${id}`)
            .then(response => response.json())
            .then(comments => setComments(comments));
    };

    const handleCommentSubmit = () => {
        fetch('http://localhost:3000/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ content: newComment, postId: id }),
        })
            .then(response => response.json())
            .then(comment => {
                setComments([...comments, comment]);
                setNewComment('');
            });
    };

    useEffect(() => {
        fetchPostInfo();
        fetchComments();
    }, []);

    if (!postInfo) return '';

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            <div className="author"> <span id="tag">{postInfo.category}</span></div>

            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit this post
                    </Link>
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />

            <div className="comments-section">
                <h2>Comments</h2>
                <div className="comment-list">
                    {comments.map(comment => (
                        <div key={comment._id} className="comment">
                            <span className="comment-author">@{comment.author.username}</span>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
                {userInfo && (
                    <div className="new-comment">
                        <textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleCommentSubmit}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
}

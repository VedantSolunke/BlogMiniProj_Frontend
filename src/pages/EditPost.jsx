import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Uncategorized'); // Added category state
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                    setCategory(postInfo.category); // Set category from the retrieved post data
                });
            });
    }, [id]);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('category', category); // Include category in the form data
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }

        try {
            const response = await fetch('http://localhost:3000/post', {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
                setRedirect(true);
            } else {
                console.error('Failed to update post:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />;
    }

    return (
        <form onSubmit={updatePost}>
            <input
                type="title"
                placeholder={'Title'}
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <input
                type="summary"
                placeholder={'Summary'}
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
            />
            <select
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}
            >
                <option value="Uncategorized">Uncategorized</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Food">Food</option>
                <option value="Parenting">Parenting</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Career">Career</option>
                <option value="Science">Science</option>
                <option value="Sports">Sports</option>
                <option value="DIY">DIY</option>
                <option value="Social Issues">Social Issues</option>
                <option value="Relationships">Relationships</option>
                <option value="Self-Care">Self-Care</option>
                <option value="Product Reviews">Product Reviews</option>
                <option value="Humor">Humor</option>
            </select>
            <input
                type="file"
                onChange={(ev) => setFiles(ev.target.files)}
            />
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: '5px' }}>Update post</button>
        </form>
    );
}

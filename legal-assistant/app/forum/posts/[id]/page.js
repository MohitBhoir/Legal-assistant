'use client'
import { useState, useEffect, use } from 'react'; // Import `use` from React

export default function PostDetailsPage({ params }) {
  // Unwrap the `params` Promise using `use`
  const unwrappedParams = use(params);
  const { id } = unwrappedParams; // Access `id` from the unwrapped `params`

  const [comment, setComment] = useState('');
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch post and comments based on the id
    const fetchPost = async () => {
      // Replace with actual API call
      const fetchedPost = {
        id: id,
        title: 'Divorce Proceedings',
        category: 'Family Law',
        description: 'Need help with divorce procedures in Texas.',
        content: 'I am going through a divorce and need legal advice on how to proceed with custody and alimony agreements in Texas.',
      };
      setPost(fetchedPost);
    };

    const fetchComments = async () => {
      // Replace with actual API call
      const fetchedComments = [
        {
          id: 1,
          author: 'Lawyer A',
          text: 'You should consider hiring a local family lawyer experienced in Texas state laws.',
          date: '2024-01-01',
        },
        {
          id: 2,
          author: 'Lawyer B',
          text: 'Focus on gathering financial documents and evidence of parenting roles.',
          date: '2024-01-02',
        },
      ];
      setComments(fetchedComments);
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    alert(`Comment submitted: ${comment}`);
    setComment('');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6 bg-gradient-to-r from-indigo-400 to-cyan-400 m-3 rounded-md">
      

      {/* Post Details and Comments (RHS for larger screens) */}
      <div className="lg:w-2/3">
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h1 className="text-2xl font-bold mb-4 text-[rgb(3,70,148)]">{post.title}</h1>
          <p className="text-sm text-gray-600 mb-2">Category: {post.category}</p>
          <p className="text-gray-700 mb-4">{post.description}</p>
          <div>
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <p>{post.content}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          {comments.length > 0 ? (
            comments.map((comment)  => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow mb-4">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-sm text-gray-600">{comment.date}</p>
                <p className="mt-2">{comment.text}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>

      {/* Comment Form (LHS for larger screens, bottom for smaller screens) */}
      <div className="lg:w-1/3">
        <div className="sticky top-4 bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Add a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(3,70,148)]"
              rows={5}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[rgb(3,70,148)] text-white rounded-lg hover:bg-[rgb(5,90,180)] transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
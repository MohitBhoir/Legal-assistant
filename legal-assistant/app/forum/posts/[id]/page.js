'use client'
import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { formateDate } from '@/utils/data';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';
import noComment from '@/public/images/no-comments.png'

export default function Page({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams; // Access id from the unwrapped params
  const { data: session, status } = useSession();
  const router = useRouter();

  const [comment, setComment] = useState('');
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const res = await fetch(`/api/forum/posts/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong');
        }

        setPost(data.post || {});
        setComments(data.post.comments);
      } catch (error) {
        console.log('error : ' + error.message);
      }
    };

    if (id) {
      fetchPostById();
    }
  }, [id]);

  const handleCommentSubmit = async (e) => {

    if (!comment.trim()) return;

    try {
      const res = await fetch(`/api/forum/posts/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          authorId: session.user.id
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to post comment');
      }

      // setComments((prev) => [...prev, data.comment]);
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    }
  };

  if (status === 'loading' || !post) {
    return <Loader />;
  }

  console.log(post);

  return (
    <div className="min-h-[calc(100vh-94.2px)] max-w-6xl m-3 mx-auto p-4 flex flex-col lg:flex-row gap-6 bg-white md:justify-center justify-between rounded-md">
      {/* Post Details */}
      <div className="lg:w-2/3">
        <div className="bg-gray-50 p-6 rounded-2xl mb-6 shadow-md border border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{post.title}</h1>
          <div className="text-sm text-gray-500 mb-2">📂 Category: <span className="font-medium text-gray-700">{post.category.join(" , ")}</span></div>
          <p className="text-base text-gray-700 mb-4 leading-relaxed">{post.description}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📝 Details</h2>
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>
        </div>

        {/* Comments */}
        <div className="ml-3">
          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="bg-white p-4 rounded-lg shadow items-start flex flex-row mb-4">
                {comment.authorId?.image && (
                  <Image
                    src={comment?.authorId?.image}
                    alt={comment?.authorId?.name}
                    className="w-10 h-10 rounded-full object-cover object-center mr-4"
                    width={30}
                    height={30}
                  />
                )}
                <div>
                  <p className="text-lg text-black font-bold">
                    {session.user.id === comment?.authorId?._id ? "You" : comment?.authorId?.name}
                  </p>
                  <p className="text-sm text-gray-600">{formateDate(comment.createdAt)}</p>
                  <p className="mt-2">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
              <div className="w-full md:mt-[10rem] mt-[2rem] h-auto flex justify-center items-center">
                <Image
                    src={noComment}
                    alt={'no comments yet'}
                    height={100}
                    width={100}
                    className="object-contain"
                />
              </div>
          )}
        </div>
      </div>

      {/* Comment Form */}
      <div className="lg:w-1/3">
        <div className="sticky top-[84.2px] bg-gray-100 p-2 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Add a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
              rows={5}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[rgb(3,70,148)] text-white rounded-lg hover:opacity-90 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client'
import {useState, useEffect, use} from 'react';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {formateDate} from '@/utils/data';
import {useRouter} from 'next/navigation';
import Loader from '@/app/components/Loader';
import noComment from '@/public/images/no-comments.png'
import userPic from "@/public/images/user.png";
import lawyerPic from "@/public/images/lawyer.png";
import upvote from "@/public/images/upvote.png"
import downvote from "@/public/images/downvote.png"
import {Dropdown} from "flowbite-react";

export default function Page({params}) {
    const unwrappedParams = use(params);
    const {id} = unwrappedParams;
    const {data: session, status} = useSession();
    const router = useRouter();

    let profilePic = null;
    if (session?.user?.image) {
        profilePic = session?.user.image;
    } else if (session?.user?.role === 'user') {
        profilePic = userPic;
    } else {
        profilePic = lawyerPic;
    }

    const [comment, setComment] = useState('');
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [filterType, setFilterType] = useState([]);
    const filterTypeArray = [{name: 'upvote'}, {name: 'downvote'}, {name: 'recent'}]

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

    const handleVote = async (commentIndex, commentId, voteType, e) => {
        e.preventDefault();

        if ((voteType === 'upvote' && comments[commentIndex].upvotes.includes(session.user.id)) || (voteType === 'downvote' && comments[commentIndex].downvotes.includes(session.user.id))) {
            return;
        }

        try {
            const res = await fetch(`/api/forum/comments/${commentId}`, {
                method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({voteType}),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to vote');

            setComments((prevComments) => prevComments.map((c) => c._id === commentId ? {
                ...c,
                upvotes: voteType === 'upvote' ? [...(c.upvotes || []), session.user.id] : c.upvotes?.filter((id) => id !== session.user.id),
                downvotes: voteType === 'downvote' ? [...(c.downvotes || []), session.user.id] : c.downvotes?.filter((id) => id !== session.user.id),
            } : c));
        } catch (error) {
            console.error('Vote error:', error.message);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        try {
            const res = await fetch(`/api/forum/posts/${id}/comment`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({content: comment, authorId: session.user.id}),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to post comment');

            setComments((prev) => [...prev, {...data.comment, authorId: {...session.user}}]);
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error.message);
        }
    };

    const getFilteredComments = () => {
        let sorted = [...comments];
        if (filterType.includes('upvote')) {
            sorted = sorted.sort((a, b) => (b.upvotes?.length || 0) - (a.upvotes?.length || 0));
        }
        if (filterType.includes('downvote')) {
            sorted = sorted.sort((a, b) => (b.downvotes?.length || 0) - (a.downvotes?.length || 0));
        }
        if (filterType.includes('recent')) {
            sorted = sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return sorted;

    };

    if (status === 'loading' || !post) return <Loader/>;
    if (!session) router.push('/');

    return (<div
        className="min-h-[calc(100vh-94.2px)] max-w-6xl m-3 mx-auto p-4 flex flex-col lg:flex-row gap-6 bg-white md:justify-center justify-between rounded-md">
        {/* Post Details */}
        <div className="lg:w-2/3">
            <div className="bg-gray-50 p-6 rounded-2xl mb-6 shadow-md border border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{post.title}</h1>
                <div className="text-sm text-gray-500 mb-2">📂 Category: <span
                    className="font-medium text-gray-700">{post.category.join(', ')}</span></div>
                <p className="text-base text-gray-700 mb-4 leading-relaxed">{post.description}</p>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">📝 Details</h2>
                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                </div>
            </div>

            {/* Comments */}
            <div className="ml-3">
                <h2 className="text-lg font-semibold mb-4">Comments</h2>
                {getFilteredComments().length > 0 ? (getFilteredComments().map((comment, commentIndex) => (
                    <div key={comment._id}
                         className="bg-white p-4 rounded-lg shadow items-start flex flex-row mb-4">
                        <Image
                            src={comment.authorId?.image || profilePic}
                            alt={comment.authorId?.name || 'author name'}
                            className="w-10 h-10 rounded-full object-cover object-center mr-4"
                            width={30}
                            height={30}
                        />
                        <div className="flex-1">
                            <p className="text-lg text-black font-bold">
                                {session.user.id === comment?.authorId?._id ? 'You' : comment?.authorId?.name}
                            </p>
                            <p className="text-sm text-gray-600">{formateDate(comment.createdAt)}</p>
                            <p className="mt-2">{comment.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <button onClick={(e) => handleVote(commentIndex, comment._id, 'upvote', e)}
                                        className="flex flex-row gap-1 items-center">
                                    <Image src={upvote} height={30} width={30}
                                           alt="upvote image"/><span>[{comment?.upvotes?.length || 0}]</span>
                                </button>
                                <button onClick={(e) => handleVote(commentIndex, comment._id, 'downvote', e)}
                                        className="flex flex-row gap-1 items-center">
                                    <Image src={downvote} height={30} width={30}
                                           alt="downvote image"/><span>[{comment?.downvotes?.length || 0}]</span>
                                </button>
                            </div>
                        </div>
                    </div>))) : (
                    <div className="w-full md:mt-[10rem] mt-[2rem] h-auto flex justify-center items-center">
                        <Image src={noComment} alt="no comments yet" height={100} width={100}
                               className="object-contain"/>
                    </div>)}
            </div>
        </div>

        {/* Right Side: Comment Form and Filter */}
        <div className="lg:w-1/3">
            {session?.user?.role === 'lawyer' && (

                <div className="sticky top-[84.2px] bg-gray-100 p-2 rounded-lg shadow mb-4">
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
                </div>)}

            {/* Filter Box */}
            <div className="sticky top-[22rem] bg-white p-4 rounded-lg shadow-md">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filters</label>

                <Dropdown
                    label="Select filters"
                    dismissOnClick={false}
                    className="bg-white max-h-60 overflow-y-auto w-full rounded-lg shadow-lg"
                    color="light"
                >
                    {filterTypeArray.map((fil, ind) => {
                        const isSelected = filterType.includes(fil.name)
                        return (<Dropdown.Item
                                key={ind}
                                onClick={() => setFilterType((prev) => {
                                    const alreadySelected = prev.includes(fil.name);
                                    return alreadySelected ? prev.filter(f => f !== fil.name) : [...prev, fil.name];
                                })}

                                className={`text-sm ${isSelected ? 'bg-blue-100 font-semibold' : 'text-black'}`}
                            >
                                {fil.name} {isSelected ? '✓' : ''}
                            </Dropdown.Item>)
                    })}
                </Dropdown>

                {/* Styled tags for selected categories */}
                <div className="flex flex-wrap mt-2 gap-2">
                    {filterType.map((fil, idx) => (<span
                        key={idx}
                        className="bg-blue-200 text-blue-900 text-sm px-2 py-1 rounded-lg flex items-center space-x-1"
                    >
                            <span>{fil}</span>
                            <button
                                type="button"
                                className="ml-1 text-xs text-blue-800 hover:text-red-600"
                                onClick={() => setFilterType((prev) => {
                                    return prev.filter((f) => f !== fil);
                                })}
                            >
                              ×
                            </button>
                        </span>))}
                </div>
            </div>
        </div>
    </div>);
}

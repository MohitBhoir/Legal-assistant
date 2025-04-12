'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminEmails , formateDate, lawCategories } from '@/utils/data.js';
import Loader from '@/app/components/Loader';
import noPostFound from '@/public/images/no-post-found.png'
import Image from "next/image";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || !adminEmails.includes(session.user.email)) {
            router.push('/');
        }
    }, [status, session, router]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/forum/posts');
                const data = await res.json();
                setPosts(data.posts);
                setFilteredPosts(data.posts);
            } catch (e) {
                console.log('error : ', e.message);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        let updatedPosts = [...posts];

        // Filter by category
        if (selectedCategory !== 'All') {
            updatedPosts = updatedPosts.filter((post) =>
                post.category.includes(selectedCategory)
            );
        }

        // Filter by search query
        if (searchQuery.trim() !== '') {
            updatedPosts = updatedPosts.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredPosts(updatedPosts);
        setCurrentPage(1); // Reset to page 1 on new filter
    }, [searchQuery, selectedCategory, posts]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            const res = await fetch(`/api/forum/posts/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete post');
            setPosts((prev) => prev.filter((post) => post._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // const uniqueCategories = [
    //     'All',
    //     ...new Set(posts.flatMap((post) => post.category || [])),
    // ];

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    if (status === 'loading' || !session) return <Loader />;

    return (
        <div className="max-w-7xl relative mx-auto min-h-[calc(100vh-94.2px)] py-8 px-4">
            <div className="flex flex-col md:flex-row md:justify-around md:items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-1/4 p-2 border border-gray-300 rounded-lg"
                >
                    {lawCategories.map((cat, index) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {filteredPosts.length === 0 ? (
                <div className='absolute top-[calc(50%-50px)] left-[calc(50%-50px)] '>
                    <Image
                        src={noPostFound}
                        alt={'no post found'}
                        height={100}
                        width={100}
                        className="object-contain"

                    />
                </div>
            ) : (
                <div className="flex flex-col items-center gap-6">
                    {currentPosts.map((post) => (
                        <div
                            key={post._id}
                            className="w-full md:w-[70%] bg-white border border-gray-300 shadow-md rounded-xl p-6 transition hover:shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={post.authorId?.image || '/default-avatar.png'}
                                    alt="Author"
                                    className="w-12 h-12 rounded-full border"
                                />
                                <div>
                                    <p className="font-semibold">{post.authorId?.name || 'Unknown'}</p>
                                    <p className="text-sm text-gray-500">
                                        Posted on {formateDate(post.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
                            <p className="text-gray-700 mb-4">{post.content}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.category?.map((cat, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => router.push(`/forum/posts/edit/${post._id}`)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-[rgb(3,70,148)] text-white rounded-lg disabled:bg-gray-400 text-sm sm:text-base"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    prev < Math.ceil(filteredPosts.length / postsPerPage) ? prev + 1 : prev
                                )
                            }
                            disabled={currentPage >= Math.ceil(filteredPosts.length / postsPerPage)}
                            className="px-4 py-2 bg-[rgb(3,70,148)] text-white rounded-lg disabled:bg-gray-400 text-sm sm:text-base"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

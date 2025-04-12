'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TextInput, Select, Button } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import Loader from '../components/Loader';
import { lawCategories as dummyCategories } from '@/utils/data';
import Image from 'next/image';

export default function ForumPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const res = await fetch('/api/forum/posts'); // adjust this if your route is different
        const data = await res.json();
        setPosts(data.posts || []);
        setLoadingPosts(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);

  if (status === 'loading' || loadingPosts) {
    return <Loader />;
  }
  console.log(posts)

  const postsPerPage = 4;
  const filteredPosts = posts.filter((post) => {
    return (
      (!selectedCategory || post.category === selectedCategory) &&
      (!searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
      <>

        {!session || !session.user ? (
            <div className="relative md:p-8 min-h-[calc(100vh-74.2px)] w-full bg-white">
              <div className="absolute top-[calc(50%)] left-[calc(50%-175.531px)] text-center text-lg font-medium">You must be logged in to view the forum.</div>
            </div>
        ) : (
            <div className="relative md:p-8 min-h-[calc(100vh-74.2px)] w-full bg-white">
              <h1 className="text-3xl tracking-[0.225rem] sm:text-4xl md:text-5xl font-bold text-center mb-10 text-[rgb(54,74,148)]">
                Public Legal Help Forum
              </h1>

              <div className="flex gap-8 w-full md:flex-row m-auto lg:w-[80%] flex-col p-5 justify-center">

                {/* Info Card */}
                <div className="hover:shadow-xl transition-shadow w-full md:w-[30%] bg-blue-50 border-l-4 border-[rgb(3,70,148)] p-6 rounded-2xl shadow mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-black mb-3">
                    Need Legal Help? Start a New Discussion
                  </h2>
                  <p className="text-gray-700 mb-4">
                    If you're facing a legal issue and couldn't find a similar case, feel free to start a new discussion. Our legal community is here to help you with guidance and information.
                  </p>
                  <Link href="/forum/posts/create-post">
                    <Button color="blue" className="bg-[rgb(3,70,148)] text-white w-full text-base rounded-lg hover:opacity-90">
                      Create New Post
                    </Button>
                  </Link>
                </div>

                {/* Post Section */}
                <div className="w-full md:w-[70%] h-full">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">

                    <form onSubmit={handleSearch} className="w-full sm:w-2/3">
                      <TextInput
                          type="text"
                          placeholder="Search Posts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                      />
                    </form>

                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full sm:w-1/3"
                    >
                      <option value="">All Categories</option>
                      {dummyCategories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                      ))}
                    </Select>
                  </div>

                  {/* Post Cards */}
                  {displayedPosts.length > 0 ? (
                      <ul className="space-y-6">
                        {displayedPosts.map((post) => (
                          <li
                            key={post._id}
                            className="flex flex-col sm:flex-row gap-4 p-6 border rounded-2xl bg-white hover:shadow-lg transition-shadow"
                          >
                            {/* Author Image */}
                            <Image
                              src={post.authorId?.image}
                              height={40}
                              width={40}
                              alt="Author"
                              className="w-12 h-12 rounded-full object-cover object-center"
                            />

                            {/* Post Content */}
                            <div className="flex flex-col justify-center gap-2 w-full">
                              <Link href={`/forum/posts/${post._id}`}>
                                <span className="text-xl sm:text-2xl font-bold text-black hover:underline cursor-pointer">
                                  {post.title}
                                </span>
                              </Link>

                              {/* Category Badge */}
                              <div className="flex gap-4 md:flex-row flex-col flex-wrap">
                                {post.category.map((cat, ind) => (
                                  <span
                                    key={ind}
                                    className="w-fit px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full gap-1 shadow-sm"
                                  >
                                    {cat}
                                  </span>
                                ))}
                              </div>

                              <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                                {post.content}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-gray-600 text-lg py-16">
                        No posts available.
                      </div>
                    )}
                  {/* Pagination */}
                  {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-10 flex-wrap">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="px-4 py-2 bg-[rgb(3,70,148)] text-white rounded-lg disabled:bg-gray-400 text-sm sm:text-base"
                        >
                          Previous
                        </button>
                        <span className="text-sm sm:text-base text-black">
                    Page {currentPage} of {totalPages}
                  </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="px-4 py-2 bg-[rgb(3,70,148)] text-white rounded-lg disabled:bg-gray-400 text-sm sm:text-base"
                        >
                          Next
                        </button>
                      </div>
                  )}
                </div>
              </div>
            </div>
        )}
      </>
  );
}

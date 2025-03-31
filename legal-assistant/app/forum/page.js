'use client'
import { useState } from 'react';
import Link from 'next/link';
import { TextInput, Select, Button } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import Loader from '../components/Loader';

const dummyCategories = [
  { id: 1, name: 'Family Law' },
  { id: 2, name: 'Criminal Law' },
  { id: 3, name: 'Corporate Law' },
];

const dummyPosts = [
  { id: 1, title: 'Divorce Proceedings', category: 'Family Law', description: 'Need help with divorce procedures in Texas.' },
  { id: 2, title: 'Theft Case Advice', category: 'Criminal Law', description: 'What to do if falsely accused of theft?' },
  { id: 3, title: 'Contract Breach', category: 'Corporate Law', description: 'Legal actions for breach of contract in a partnership.' },
  { id: 4, title: 'Child Custody', category: 'Family Law', description: 'How to win child custody in court?' },
  { id: 5, title: 'Fraud Allegations', category: 'Criminal Law', description: 'Steps to take if accused of fraud.' },
];

export default function ForumPage() {
  const { data: session, status } = useSession(); // status helps in handling loading state

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  if (status === "loading") {
    return (
      <Loader />
    );
  }

  const postsPerPage = 4;
  const filteredPosts = dummyPosts.filter((post) => {
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
    <div className="p-4 h-auto w-full bg-white">
      {!session || !session.user ? (
        <p className="text-center text-lg">You must be logged in to view the forum.</p>
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-6 text-black">
            Public Forum
          </h1>

          {/* Search Bar and Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-6 gap-4">
            <form onSubmit={handleSearch} className="w-full sm:w-auto flex-grow">
              <TextInput
                type="text"
                placeholder="Search Posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </form>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border rounded-lg"
            >
              <option value="">All Categories</option>
              {dummyCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          {/* List of Posts */}
          <ul className="space-y-4">
            {displayedPosts.map((post) => (
              <li
                key={post.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
              >
                <Link href={`/forum/posts/${post.id}`}>
                  <span className="text-base sm:text-lg font-semibold text-black lg:text-2xl hover:underline">
                    {post.title}
                  </span>
                </Link>
                <p className="text-xl text-[rgb(3,70,148)]">{post.category}</p>
                <p className="mt-2 text-sm sm:text-base text-gray-700">
                  {post.description}
                </p>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-2 bg-[rgb(3,70,148)] text-white text-sm sm:text-base rounded-lg disabled:bg-gray-600"
            >
              Previous
            </button>
            <span className="text-sm sm:text-base text-black">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-2 bg-[rgb(3,70,148)] text-white text-sm sm:text-base rounded-lg disabled:bg-gray-600"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}



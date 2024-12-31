'use client'
import { useState } from 'react';
import Link from 'next/link';
import { TextInput, Select, Button } from 'flowbite-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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
    <div className="my-4 max-w-4xl mx-auto p-4 h-full">
      <h1 className="text-2xl font-bold text-center mb-6">Public Forum</h1>

      {/* Search Bar and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <form onSubmit={handleSearch} className="w-full md:w-auto">
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
          className="w-full md:w-auto"
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
            className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
          >
            <Link href={`/forum/posts/${post.id}`}>
              <span className="text-lg font-semibold text-blue-600 hover:underline">
                {post.title}
              </span>
            </Link>
            <p className="text-sm text-gray-600">{post.category}</p>
            <p className="mt-2 text-gray-700">{post.description}</p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6 ">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      
    </div>
  );
}
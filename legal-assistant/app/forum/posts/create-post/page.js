'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, Textarea, Button, Dropdown } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import Loader from '../../../components/Loader';
import { lawCategories } from '@/utils/data';

export default function page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    category: [],
    content: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status === 'loading') return <Loader />;

  if (!session || !session.user) {
    return <p className="text-center text-lg font-medium p-10">You must be logged in to create a post.</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create post');

      const result = await res.json();
      console.log('Post created:', result);

      router.push('/forum');
    } catch (error) {
      console.error('Error submitting post:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-blue-50 border-l-4 border-[rgb(3,70,148)] shadow-xl rounded-xl p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[rgb(3,70,148)] mb-8 text-center">
          Start a New Discussion
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <TextInput
                name="title"
                type="text"
                required
                placeholder="Enter post title"
                value={formData.title}
                onChange={handleChange}
                className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>

            <Dropdown
                label="Select categories"
                dismissOnClick={false}
                className="bg-white max-h-60 overflow-y-auto w-full sm:w-[20rem] md:w-[25rem] lg:w-[30rem] rounded-lg shadow-lg"
                color="light"
            >
              {lawCategories.map((cat) => {
                const isSelected = formData.category.includes(cat.name);
                return (
                    <Dropdown.Item
                        key={cat.id}
                        onClick={() =>
                            setFormData((prev) => {
                              const alreadySelected = prev.category.includes(cat.name);
                              const newCategories = alreadySelected
                                  ? prev.category.filter((c) => c !== cat.name)
                                  : [...prev.category, cat.name];
                              return {...prev, category: newCategories};
                            })
                        }
                        className={`text-sm ${isSelected ? 'bg-blue-100 font-semibold' : 'text-black'}`}
                    >
                      {cat.name} {isSelected ? '✓' : ''}
                    </Dropdown.Item>
                );
              })}
            </Dropdown>

            {/* Show selected categories */}
            <div className="flex flex-wrap mt-2 gap-2">
              {formData.category.map((cat, idx) => (
                  <span
                      key={idx}
                      className="bg-blue-200 text-blue-900 text-sm px-2 py-1 rounded-lg flex items-center space-x-1"
                  >
        <span>{cat}</span>
        <button
            type="button"
            className="ml-1 text-xs text-blue-800 hover:text-red-600"
            onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  category: prev.category.filter((c) => c !== cat),
                }))
            }
        >
          ×
        </button>
      </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea
                name="content"
                required
                rows={6}
                placeholder="Describe your legal issue in detail..."
                value={formData.content}
                onChange={handleChange}
                className="w-full"
            />
          </div>

          <div className="flex justify-center">
            <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[rgb(3,70,148)] text-white px-6 py-2 rounded-lg text-base hover:opacity-90 transition-all duration-200"
            >
              {isSubmitting ? 'Posting...' : 'Submit Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

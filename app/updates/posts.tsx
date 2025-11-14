'use client';

import { useState } from 'react';

import PostsSidebar from './posts-sidebar';
import PostsList from './posts-list';
// import { useUsersQuery } from '@/hooks/use-users.query';

export default function Posts({ posts }: { posts: Post[] }) {
  // const { data, error, isLoading, isError, isSuccess, refetch } =
  // useUsersQuery();
  const categories = ['News', 'Admin', 'General', 'Improvements', 'Legal'];

  const [selectedCategory, setSelectedCategory] = useState<string>('News');

  // console.log({
  //   data,
  //   error,
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   refetch,
  // });
  return (
    <section>
      <div className="pb-12 md:pb-20">
        <div className="px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="md:flex md:justify-between">
              {/* Sidebar */}
              <PostsSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Posts */}
              <PostsList posts={posts} selectedCategory={selectedCategory} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// src/hooks/useAuthorsQuery.ts
import { useMemo } from 'react';
import usePostsQuery from 'src/hooks/usePostsQuery';

const useAuthorsQuery = () => {
  const posts = usePostsQuery();

  const authors = useMemo(() => {
    const authorMap = new Map<string, { count: number; profile_photo?: string }>();

    posts.forEach(post => {
      if (post.author) {
        post.author.forEach(author => {
          if (authorMap.has(author.name)) {
            const existing = authorMap.get(author.name)!;
            authorMap.set(author.name, { count: existing.count + 1, profile_photo: author.profile_photo });
          } else {
            authorMap.set(author.name, { count: 1, profile_photo: author.profile_photo });
          }
        });
      }
    });

    return Array.from(authorMap.entries()).map(([name, info]) => ({ name, ...info }));
  }, [posts]);

  return authors;
};

export default useAuthorsQuery;

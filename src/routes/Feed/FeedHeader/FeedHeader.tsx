import React, { useState, useMemo } from "react";
import CategorySelect from "./CategorySelect"
import WriterSelect from "./WriterSelect"
import OrderButtons from "./OrderButtons"
import styled from "@emotion/styled"
import usePostsQuery from "src/hooks/usePostsQuery";
import useAuthorsQuery from "src/hooks/useAuthorsQuery";

type Props = {}

const FeedHeader: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedAuthorPhoto, setSelectedAuthorPhoto] = useState<string | null>(null);

  const posts = usePostsQuery();
  const authors = useAuthorsQuery();

  // Prepare author data to pass to CategorySelect
  const authorList = useMemo(() => {
    const authorMap = new Map<string, { count: number }>();

    posts.forEach(post => {
      if (post.author) {
        post.author.forEach(author => {
          if (authorMap.has(author.name)) {
            authorMap.set(author.name, { count: authorMap.get(author.name)!.count + 1 });
          } else {
            authorMap.set(author.name, { count: 1 });
          }
        });
      }
    });

    return Array.from(authorMap.entries()).map(([name, info]) => ({ name, count: info.count }));
  }, [posts]);

  const handleAuthorSelect = (author: string, photo: string | null) => {
    setSelectedAuthor(author);
    setSelectedAuthorPhoto(photo);
  };
  return (
    <StyledWrapper>
      <LeftGroup>
        <CategorySelect
          selectedAuthor={selectedAuthor}
          selectedAuthorPhoto={selectedAuthorPhoto}
          authors={authorList} // Pass authors data with post counts
        />
        <WriterSelect onAuthorSelect={handleAuthorSelect} />
      </LeftGroup>
      <OrderButtons />
    </StyledWrapper>
  )
}

export default FeedHeader;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
`

const LeftGroup = styled.div`
  display: flex;
  gap: 1rem; /* 원하는 간격으로 조정 */
`

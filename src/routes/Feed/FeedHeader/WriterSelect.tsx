import useDropdown from "src/hooks/useDropdown";
import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import { MdExpandMore } from "react-icons/md";
import styled from "@emotion/styled";
import usePostsQuery from "src/hooks/usePostsQuery";
import Image from "next/image";
import allPeople from "src/assets/image/allPeople.png";

type Props = {};

const AuthorSelect: React.FC<Props> = () => {
  const router = useRouter();
  const data = usePostsQuery();
  const [dropdownRef, opened, handleOpen] = useDropdown();

  const [selectedAuthorPhoto, setSelectedAuthorPhoto] = useState<string | null>(null);

  // 작성자 정보 필터링
  const authors = useMemo(() => {
    const authorMap = new Map<string, { count: number, profile_photo?: string }>();
    data.forEach(post => {
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
  }, [data]);

  const totalPosts = data.length;

  const handleOptionClick = (author: string) => {
    if (author === "All Authors") {
      router.push({
        query: {
          ...router.query,
          author: undefined, // 모든 글을 보기 위해 author 쿼리 파라미터를 삭제
        },
      });
      setSelectedAuthorPhoto(null);
    } else {
      router.push({
        query: {
          ...router.query,
          author,
        },
      });
      const selectedAuthor = authors.find(a => a.name === author);
      setSelectedAuthorPhoto(selectedAuthor?.profile_photo || null);
    }
  };

  useEffect(() => {
    if (router.query.author) {
      const selectedAuthor = authors.find(a => a.name === router.query.author);
      setSelectedAuthorPhoto(selectedAuthor?.profile_photo || null);
    } else {
      setSelectedAuthorPhoto(null);
    }
  }, [router.query.author, authors]);

  return (
    <StyledWrapper>
      <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
        {selectedAuthorPhoto ? (
          <Image
            src={selectedAuthorPhoto}
            width={20}
            height={20}
            alt={router.query.author as string}
            className="selected-author-photo"
          />
        ) : (
          <Image
            src={allPeople}
            width={20}
            height={20}
            alt="All Authors"
            className="selected-author-photo"
          />
        )}
        {`${router.query.author || 'All Authors'} (${router.query.author ? data.filter(post => post.author && post.author.some(a => a.name === router.query.author)).length : totalPosts})`} <MdExpandMore />
      </div>
      {opened && (
        <div className="content">
          <div
            className="item"
            onClick={() => handleOptionClick("All Authors")}
          >
            <Image
              src={allPeople}
              width={20}
              height={20}
              alt="All Authors"
              className="author-photo"
            />
            {`All Authors (${totalPosts})`}
          </div>
          {authors.map((author, idx) => (
            <div
              className="item"
              key={idx}
              onClick={() => handleOptionClick(author.name)}
            >
              {author.profile_photo && (
                <Image
                  src={author.profile_photo}
                  width={20}
                  height={20}
                  alt={author.name}
                  className="author-photo"
                />
              )}
              {`${author.name} (${author.count})`}
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  );
};

export default AuthorSelect;

const StyledWrapper = styled.div`
  position: relative;
  > .wrapper {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    gap: 0.25rem;
    font-size: 1rem;
    line-height: 1.75rem;
    font-weight: 700;
    cursor: pointer;
    
    .selected-author-photo {
      border-radius: 50%;
    }
  }
  > .content {
    position: absolute;
    z-index: 40;
    padding: 0.25rem;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray10};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    > .item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      white-space: nowrap;
      cursor: pointer;

      :hover {
        background-color: ${({ theme }) => theme.colors.gray4};
      }

      .author-photo {
        border-radius: 50%;
      }
    }
  }
`;

import useDropdown from "src/hooks/useDropdown";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { DEFAULT_CATEGORY } from "src/constants";
import styled from "@emotion/styled";
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery";

type Props = {
  selectedAuthor?: string | null;
  selectedAuthorPhoto?: string | null;
  authors: Array<{ name: string; count: number }>; // 작가 정보를 전달합니다.
};

const CategorySelect: React.FC<Props> = ({ selectedAuthor, selectedAuthorPhoto, authors }) => {
  const router = useRouter();
  const data = useCategoriesQuery();
  const [dropdownRef, opened, handleOpen] = useDropdown();

  const [currentCategory, setCurrentCategory] = useState(
    `${router.query.category || ``}` || DEFAULT_CATEGORY
  );

  // 현재 카테고리의 게시물 수를 가져옵니다.
  const currentCategoryCount = data[currentCategory] || 0;

  // 선택된 작가의 게시물 수를 가져옵니다.
  const selectedAuthorPostCount = selectedAuthor
    ? authors.find(author => author.name === selectedAuthor)?.count || 0
    : 0;

  const handleOptionClick = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
      },
    });
  };

  useEffect(() => {
    // router.query.category가 변경될 때 currentCategory를 업데이트합니다.
    setCurrentCategory(`${router.query.category || ``}` || DEFAULT_CATEGORY);
  }, [router.query.category]);

  return (
    <StyledWrapper>
      <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
        {selectedAuthor ? (
          <>
            <span className="text">
              📂 All posts ({selectedAuthorPostCount})
            </span>
            <MdExpandMore />
          </>
        ) : (
          // 작가가 선택되지 않은 경우
          <>
            <span className="text">
              {`${currentCategory} Posts (${currentCategoryCount})`}
            </span>
            <MdExpandMore />
          </>
        )}
      </div>
      {opened && (
        <div className="content">
          {Object.keys(data).map((key, idx) => (
            <div
              className="item"
              key={idx}
              onClick={() => handleOptionClick(key)}
            >
              {`${key} (${data[key]})`}
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  );
};

export default CategorySelect;

const StyledWrapper = styled.div`
  position: relative;

  > .wrapper {
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    gap: 0.25rem;
    align-items: center;
    font-size: 16px;
    line-height: 1.75rem;
    font-weight: 700;
    cursor: pointer;

    > .text {
      font-size: 16px;
      line-height: 1.75rem;
      font-weight: 700;
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
    }
  }
`;
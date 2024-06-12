import Link from "next/link";
import { CONFIG } from "site.config";
import { formatDate } from "src/libs/utils";
import Tag from "../../../components/Tag";
import { TPost } from "../../../types";
import Image from "next/image";
import Category from "../../../components/Category";
import styled from "@emotion/styled";

type Props = {
  data: TPost;
};

const PostCard: React.FC<Props> = ({ data }) => {
  const category = (data.category && data.category?.[0]) || undefined;
  const isPinned = data.tags?.includes("Pinned") || false; // Pinned 태그가 있는지 확인

  return (
    <StyledWrapper href={`/${data.slug}`} isPinned={isPinned}>
      <article>
        {category && (
          <div className="category">
            <Category>{category}</Category>
          </div>
        )}
        {data.thumbnail && (
          <div className={`thumbnail ${isPinned ? "pinned-thumbnail" : ""}`}>
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              className="thumbnail-image"
              css={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div data-thumb={!!data.thumbnail} data-category={!!category} className="content">
          <header className="top">
            <h2>{data.title}</h2>
          </header>
          <div className="date">
            <div className="content">
              {formatDate(
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </div>
          </div>
          {!isPinned && ( // Pinned 항목이 아닐 때만 summary를 렌더링
            <div className="summary">
              <p>{data.summary}</p>
            </div>
          )}
          <div className="tags">
            {data.tags &&
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  );
};

export default PostCard;

const StyledWrapper = styled(Link)<{ isPinned?: boolean }>`
  article {
    overflow: hidden;
    position: relative;
    margin-bottom: 1.5rem;
    border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    transition-property: box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;

    @media (min-width: 768px) {
      margin-bottom: 2rem;
    }

    :hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    > .category {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 10;
    }

    > .thumbnail {
      position: relative;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray2};
      padding-bottom: 66%;

      @media (min-width: 1024px) {
        padding-bottom: 50%;
      }

      &.pinned-thumbnail {
        width: 40%;
        height: auto;
        order: 2;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        img {
          width: 100% !important;
          height: auto !important;
          max-width: 100%; /* Ensure the image does not exceed its container */
          max-height: 100%; /* Ensure the image does not exceed its container */
          position: relative !important;
          border-radius: 10px;
        }
      }
    }
    > .content {
      padding: 1rem;

      &[data-thumb="false"] {
        padding-top: 3.5rem;
      }
      &[data-category="false"] {
        padding-top: 1.5rem;
      }
      > .top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (min-width: 768px) {
          flex-direction: row;
          align-items: baseline;
        }
        h2 {
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 500;

          cursor: pointer;

          @media (min-width: 768px) {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }
      }
      > .date {
        display: flex;
        margin-bottom: 1rem;
        gap: 0.5rem;
        align-items: center;
        .content {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray10};
          @media (min-width: 768px) {
            margin-left: 0;
          }
        }
      }
      > .summary {
        margin-bottom: 1rem;
        p {
          display: none;
          line-height: 2rem;
          color: ${({ theme }) => theme.colors.gray11};

          @media (min-width: 768px) {
            display: block;
          }
        }
      }
      > .tags {
        display: flex;
        gap: 0.5rem;
      }
    }

    ${({ isPinned, theme }) =>
      isPinned &&
      `
      display: flex;
      flex-direction: row;
      background-color: ${theme.scheme === "light" ? "#fff" : "#282828"};
      height: 16vh;
      > .thumbnail {
        width: 30%;
        height: auto;
        order: 2;
        margin: auto; /* Center the image horizontally and vertically */
        background-color: transparent;
        display: flex;
        align-items: center;  /* 수직 가운데 정렬 */
        justify-content: center;  /* 수평 가운데 정렬 */
      }

      > .category { 
        display: none; 
      }
      > .thumbnail .thumbnail-image {
        width: 100%;
        height: auto;
      }

      > .content {
        width: 70%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        order: 1;

        > .summary { 
          display: none; 
        }
      }

      &[data-thumb="false"] > .content {
        padding-top: 1rem;
      }
      &[data-category="false"] > .content {
        padding-top: 1rem;
      }
    `}
  }
`;
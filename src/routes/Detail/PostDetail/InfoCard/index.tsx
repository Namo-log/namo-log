import { CONFIG } from "site.config"
import { TPost } from "src/types"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const InfoCard: React.FC<Props> = ({ data }) => {
  return (
    <StyledWrapper>
      <div className="content">
        {data.author && data.author[0] && data.author[0].name && (
          <>
            <div className="author">
              <Image
                css={{ borderRadius: "50%" }}
                src={data.author[0].profile_photo || CONFIG.profile.image}
                alt="profile_photo"
                width={60}
                height={60}
              />
            </div>
            <div className="info">
              <a className="name">{data.author[0].name}</a>
              <div className="part">Android Developer</div>
            </div>
          </>
        )}
      </div>
    </StyledWrapper>
  )
}

export default InfoCard

const StyledWrapper = styled.div`
  
  .content {
    padding: 2rem;
    display: flex;
    
    background-color: ${({ theme }) => theme.colors.gray3};
    border-radius: 0.7rem;
    margin-bottom: 1rem;
  }

  .info {
    margin-left: 2rem;
    
    > .name {
      font-weight: 500;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.gray12};
    }

    .part {
      font-weight: 100;
      margin-top: 0.5rem;
      font-size: 1.1rem;
      color: ${({ theme }) => theme.colors.gray11};
    }

    a {
      text-decoration: underline;
      text-underline-position: under;
      cursor: pointer;
      :hover {
        color: ${({ theme }) => theme.colors.orange11};
      }
    }
  }
`
import React from "react"
import CategorySelect from "./CategorySelect"
import WriterSelect from "./WriterSelect"
import OrderButtons from "./OrderButtons"
import styled from "@emotion/styled"

type Props = {}

const FeedHeader: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <LeftGroup>
        <CategorySelect />
        <WriterSelect />
      </LeftGroup>
      <OrderButtons />
    </StyledWrapper>
  )
}

export default FeedHeader

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

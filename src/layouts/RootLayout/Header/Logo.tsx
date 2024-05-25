import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"
import Image from "next/image";
import { roboto } from "src/assets/fonts/roboto"
import { css } from "@emotion/react" 

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title} style={{display:'flex', justifyContent:'center', gap:'10px'}}>
      <Image src={CONFIG.blog.homeLogo} alt={CONFIG.blog.title} width={23} height={23} /> {/* Using Image component */}
      <div css={roboto}>{CONFIG.blog.homeTitle}</div>
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)``

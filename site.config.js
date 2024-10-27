const CONFIG = {
  // profile setting (required)
  profile: {
    name: "몽이",
    image: "/mongi.png", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "mascot of namo",
    bio: "나의 모임 기록 어플",
    email: "namo.corps.official@gmail.com",
    linkedin: "",
    github: "Namo-log",
    instagram: "namo___official",
  },
  projects: [
    {
      name: `namo site`,
      href: "https://litt.ly/namong",
    },
  ],
  // blog setting (required)
  blog: {
    // 여기에 나모 로고 넣기
    title: "NAMO Tech Blog",
    homeTitle: "namo-log",
    description: "대학생끼리 하는 프로젝트인 나모의 기술 블로그 입니다.",
    homeLogo: "/images/Logo.png"
  },

  // CONFIG configration (required)
  link: "https://morethan-log.vercel.app",
  since: 2024, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: true,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }

export type Lang = "en" | "fa";

type ServiceCopy = {
  tag: string;
  title: string;
  subtitle: string;
  bullets: string[];
  stack: string;
  cta: string;
};

type ProcessStep = { num: string; label: string; text: string };
type WhyPoint   = { label: string; text: string };
type HomeServiceItem = { slug: string; title: string; desc: string };
type HomePoint = { icon: string; label: string; text: string };
type HomeStatItem = { value: string; suffix?: string; label: string; punchline: string };
type Testimonial = { name: string; role: string; text: string };
type FaqItem     = { q: string; a: string };

type PageCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lines: string[];
};

type AboutPurposeUi = {
  quoteLabel: string;
  quote: string;
  openingEyebrow: string;
  openingTitle: string;
  opening: string[];
  beliefsEyebrow: string;
  beliefsTitle: string;
  beliefs: { label: string; text: string }[];
  pillarsEyebrow: string;
  pillarsTitle: string;
  pillars: { tag: string; title: string; text: string }[];
  commitmentEyebrow: string;
  commitmentTitle: string;
  commitments: string[];
  closingEyebrow: string;
  closing: string;
  relatedLabel: string;
  relatedTitle: string;
  relatedDesc: string;
  relatedHref: string;
  backAbout: string;
  backAboutDesc: string;
};

type ErrorPageCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  art?: string;
  prompt: string;
  ctaHome: string;
  ctaContact: string;
  ctaRetry?: string;
  ctaLogin?: string;
};

type Dict = {
  nav: {
    home: string;
    aboutus: string;
    aboutTeam: string;
    aboutPartners: string;
    aboutHonors: string;
    aboutVision: string;
    aboutMission: string;
    product: string;
    productWeb: string;
    productMobile: string;
    productWindows: string;
    productAi: string;
    productPlatforms: string;
    services: string;
    serviceWeb: string;
    serviceUiUx: string;
    serviceEcommerce: string;
    serviceAndroid: string;
    serviceIos: string;
    serviceSeo: string;
    serviceConsulting: string;
    serviceSupport: string;
    portfolio: string;
    portfolioWebsites: string;
    portfolioEcommerce: string;
    portfolioMobile: string;
    portfolioDesktop: string;
    portfolioOther: string;
    blog: string;
    contactus: string;
    contactRequest: string;
    contactConsultation: string;
    contactCollaborate: string;
    panel: string;
    login: string;
    contact: string;
    menuTitle: string;
    themeLight: string;
    themeDark: string;
    language: string;
  };
  pages: {
    aboutus: PageCopy;
    aboutTeam: PageCopy;
    aboutPartners: PageCopy;
    aboutHonors: PageCopy;
    aboutVision: PageCopy;
    aboutMission: PageCopy;
    contactRequest: PageCopy;
    contactConsultation: PageCopy;
    contactCollaborate: PageCopy;
    product: PageCopy;
    productWeb: PageCopy;
    productMobile: PageCopy;
    productWindows: PageCopy;
    productAi: PageCopy;
    productPlatforms: PageCopy;
    portfolio: PageCopy;
    portfolioWebsites: PageCopy;
    portfolioEcommerce: PageCopy;
    portfolioMobile: PageCopy;
    portfolioDesktop: PageCopy;
    portfolioOther: PageCopy;
    blog: PageCopy;
    panel: PageCopy;
  };
  blogUi: {
    filterLabel: string;
    filterAll: string;
    readMore: string;
    readFull: string;
    minRead: string;
    noPosts: string;
    relatedTitle: string;
    backToBlog: string;
    featuredLabel: string;
    articlesLabel: string;
    categoriesLabel: string;
    totalLabel: string;
    rssLinkEn: string;
    rssLinkFa: string;
    shareLabel: string;
    copyLink: string;
    copiedLink: string;
    prevPost: string;
    nextPost: string;
    postNavLabel: string;
    writtenBy: string;
    tableOfContents: string;
    allArticlesLabel: string;
    categories: {
      web: string;
      design: string;
      seo: string;
      mobile: string;
      product: string;
      ai: string;
    };
  };
  aboutUi: {
    manifesto: string;
    storyEyebrow: string;
    storyTitle: string;
    paragraphs: string[];
    pillarsEyebrow: string;
    pillarsTitle: string;
    pillars: { label: string; text: string }[];
    capabilitiesEyebrow: string;
    capabilitiesTitle: string;
    capabilities: { tag: string; title: string; desc: string }[];
    exploreEyebrow: string;
    exploreTitle: string;
    exploreMore: string;
    statsStrip: {
      eyebrow: string;
      items: { value: string; suffix?: string; label: string; note: string }[];
    };
    timeline: {
      eyebrow: string;
      title: string;
      items: { era: string; title: string; text: string }[];
    };
    visionMission: {
      eyebrow: string;
      title: string;
      vision: { title: string; text: string; linkLabel: string };
      mission: { title: string; text: string; linkLabel: string };
    };
    teamPreview: {
      eyebrow: string;
      title: string;
      subtitle: string;
      roles: { tag: string; title: string; text: string }[];
      cta: string;
    };
    offices: {
      eyebrow: string;
      title: string;
      hint: string;
      cities: { name: string; label: string; status: string }[];
    };
    honorsPreview: {
      eyebrow: string;
      title: string;
      items: { value: string; label: string; desc: string }[];
      cta: string;
    };
    why: {
      eyebrow: string;
      title: string;
      subtitle: string;
      points: HomePoint[];
    };
    exploreCards: { slug: string; desc: string }[];
  };
  visionUi: AboutPurposeUi;
  missionUi: AboutPurposeUi;
  hero: {
    eyebrow: string;
    slogan: string;
    lead: string;
    tagline: string;
    subcopy: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    version: string;
    brand: string;
  };
  heroMap: {
    ariaLabel: string;
    windowTitle: string;
    hint: string;
    statusLine: string;
    cities: {
      tehran: string;
      shiraz: string;
      ahvaz: string;
    };
  };
  trust: {
    eyebrow: string;
    items: {
      id: string;
      value: number;
      prefix?: string;
      suffix: string;
      label: string;
      note: string;
      decimals?: number;
    }[];
  };
  services: Record<string, ServiceCopy>;
  why: {
    eyebrow: string;
    title: string;
    subtitle: string;
    points: WhyPoint[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: ProcessStep[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: Testimonial[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  home: {
    services: {
      eyebrow: string;
      title: string;
      subtitle: string;
      hint: string;
      moreLabel: string;
      allLink: string;
      items: HomeServiceItem[];
    };
    products: {
      eyebrow: string;
      title: string;
      subtitle: string;
      hint: string;
      moreLabel: string;
      allLink: string;
      items: HomeServiceItem[];
    };
    why: {
      eyebrow: string;
      title: string;
      subtitle: string;
      points: HomePoint[];
    };
    stats: {
      eyebrow: string;
      items: HomeStatItem[];
    };
    start: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cta: string;
      responseNote: string;
    };
    terminalIntro: {
      title: string;
      subtitle: string;
    };
  };
  auth: {
    login: {
      eyebrow: string;
      title: string;
      subtitle: string;
      tabEmail: string;
      tabOtp: string;
      labelEmail: string;
      labelPassword: string;
      labelOtp: string;
      otpChannelEmail: string;
      otpChannelSms: string;
      labelPhone: string;
      phonePlaceholder: string;
      otpSentEmail: string;
      otpSentSms: string;
      submit: string;
      sendOtp: string;
      verifyOtp: string;
      changeContact: string;
      loading: string;
      toRegister: string;
      errorGeneric: string;
      forgotPassword: string;
      labelTotp: string;
      totpSubtitle: string;
      totpSubmit: string;
      totpBack: string;
    };
    forgotPassword: {
      eyebrow: string;
      title: string;
      subtitle: string;
      tabEmail: string;
      tabSms: string;
      labelEmail: string;
      labelPhone: string;
      phonePlaceholder: string;
      submit: string;
      loading: string;
      sentEmail: string;
      sentSms: string;
      continueReset: string;
      changeContact: string;
      toLogin: string;
      errorGeneric: string;
    };
    resetPassword: {
      eyebrow: string;
      title: string;
      subtitle: string;
      labelEmail: string;
      labelPhone: string;
      phonePlaceholder: string;
      labelCode: string;
      labelPassword: string;
      labelConfirm: string;
      submit: string;
      loading: string;
      passwordMismatch: string;
      resendCode: string;
      toLogin: string;
      errorGeneric: string;
    };
    register: {
      eyebrow: string;
      title: string;
      subtitle: string;
      tabEmail: string;
      tabOtp: string;
      labelName: string;
      labelEmail: string;
      labelPassword: string;
      labelConfirm: string;
      labelOtp: string;
      otpChannelEmail: string;
      otpChannelSms: string;
      labelPhone: string;
      phonePlaceholder: string;
      otpSentEmail: string;
      otpSentSms: string;
      submit: string;
      sendOtp: string;
      verifyOtp: string;
      changeContact: string;
      loading: string;
      toLogin: string;
      errorGeneric: string;
      errorPasswordMatch: string;
    };
    panel: {
      welcome: string;
      signedInAs: string;
      logout: string;
      loggingOut: string;
      noPasswordHint: string;
      statusLabel: string;
      statusValue: string;
      linkServices: string;
      linkPortfolio: string;
      linkContact: string;
    };
  };
  errors: {
    pages: {
      notFound: ErrorPageCopy;
      forbidden: ErrorPageCopy;
      maintenance: ErrorPageCopy;
      sessionExpired: ErrorPageCopy;
      offline: ErrorPageCopy;
      server: ErrorPageCopy;
      global: ErrorPageCopy;
    };
    auth: {
      INVALID_CREDENTIALS: string;
      INVALID_OTP: string;
      ACCOUNT_NOT_FOUND: string;
      ACCOUNT_NOT_FOUND_PHONE: string;
      EMAIL_ALREADY_EXISTS: string;
      PHONE_ALREADY_EXISTS: string;
      RATE_LIMIT: string;
      VALIDATION: string;
      SERVER: string;
      LOGOUT_FAILED: string;
      SESSION_FAILED: string;
      OTP_SEND_FAILED: string;
    };
    contact: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageMin: string;
      networkError: string;
    };
    projectRequest: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      phoneRequired: string;
      phoneInvalid: string;
      projectTypeRequired: string;
      budgetRequired: string;
      timelineRequired: string;
      descriptionRequired: string;
      descriptionMin: string;
      networkError: string;
    };
    consultationRequest: {
      nameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
      contactMethodRequired: string;
      emailRequired: string;
      emailInvalid: string;
      contactTimeRequired: string;
      networkError: string;
    };
    collaborateRequest: {
      networkError: string;
      hiring: {
        nameRequired: string;
        resumeRequired: string;
        urlInvalid: string;
        skillsRequired: string;
        salaryRequired: string;
        workModeRequired: string;
      };
      freelancer: {
        nameRequired: string;
        phoneRequired: string;
        phoneInvalid: string;
        specialtyRequired: string;
        portfolioRequired: string;
      };
    };
    inline: {
      offlineBanner: string;
      offlinePage: string;
      retry: string;
      chunkLoad: string;
    };
    offlineUi: {
      windowTitle: string;
      tabTitle: string;
      codeLabel: string;
      statusNet: string;
      statusDns: string;
      statusCache: string;
      statusOffline: string;
      statusUnavailable: string;
      statusAvailable: string;
      terminalLines: string[];
      checklistTitle: string;
      checklist: string[];
      onlineRestored: string;
      lastSync: string;
    };
    network: {
      failed: string;
      timeout: string;
      badGateway: string;
      malformed: string;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    labelName: string;
    labelEmail: string;
    labelPhone: string;
    labelService: string;
    labelMessage: string;
    labelSubmit: string;
    submitting: string;
    serviceOptions: string[];
    success: string;
    directEmail: string;
    directPhone: string;
    directAddress: string;
    orDirect: string;
  };
  projectRequest: {
    sectionBasic: string;
    sectionType: string;
    sectionBudget: string;
    sectionTimeline: string;
    sectionDescription: string;
    sectionFiles: string;
    labelName: string;
    labelEmail: string;
    labelPhone: string;
    labelCompany: string;
    labelCompanyOptional: string;
    labelDescription: string;
    labelUpload: string;
    removeFile: string;
    filesHint: string;
    labelSubmit: string;
    submitting: string;
    success: string;
    sendAnother: string;
    projectTypes: Record<string, string>;
    budgets: Record<string, string>;
    timelines: Record<string, string>;
  };
  consultationRequest: {
    sectionContactMethod: string;
    sectionContactTime: string;
    labelName: string;
    labelPhone: string;
    labelEmail: string;
    labelEmailOptional: string;
    labelSubmit: string;
    submitting: string;
    success: string;
    sendAnother: string;
    contactMethods: Record<string, string>;
    contactTimes: Record<string, string>;
  };
  collaborateRequest: {
    branchToggleLabel: string;
    branches: Record<string, string>;
    labelSubmit: string;
    submitting: string;
    success: string;
    sendAnother: string;
    hiring: {
      sectionBasic: string;
      sectionResume: string;
      sectionLinks: string;
      sectionDetails: string;
      sectionWorkMode: string;
      labelName: string;
      labelGithub: string;
      labelLinkedin: string;
      labelPortfolioUrl: string;
      labelSkills: string;
      labelSalary: string;
      labelUploadResume: string;
      resumeHint: string;
      workModes: Record<string, string>;
    };
    freelancer: {
      sectionBasic: string;
      sectionSpecialty: string;
      sectionPortfolio: string;
      sectionResume: string;
      labelName: string;
      labelPhone: string;
      labelUploadPortfolio: string;
      labelUploadResume: string;
      portfolioHint: string;
      resumeHint: string;
      specialties: Record<string, string>;
    };
  };
  footer: {
    tagline: string;
    rights: string;
    copyrightBrand: string;
    copyrightSuffix: string;
    changelogAria: string;
    changelogTitle: string;
    changelogClose: string;
    linkTerms: string;
    linkServices: string;
    linkContact: string;
    stack: string;
    brand: string;
    social: {
      instagram: string;
      linkedin: string;
      facebook: string;
      telegram: string;
    };
  };
  terms: {
    eyebrow: string;
    title: string;
    subtitle: string;
    rules: { title: string; body: string }[];
    changelogTitle: string;
    changelogIntro: string;
    versionNote: string;
  };
  consent: {
    message: string;
    accept: string;
    reject: string;
  };
  pwa: {
    installTitle: string;
    installBody: string;
    installAction: string;
    installDismiss: string;
    installSuccess: string;
    pushTitle: string;
    pushBody: string;
    pushAction: string;
    pushDismiss: string;
    pushSuccess: string;
    pushDenied: string;
    pushUnsupported: string;
    installedBadge: string;
  };
  preloader: {
    corner: string;
    welcome: string;
    deploying: string;
    bottom: string;
    lines: { text: string; tone: "ok" | "error" | "accent" | "wait" | "success"; gap: number }[];
  };
  navPreloader: {
    prompt: string;
    loading: (path: string) => string;
    steps: string[];
  };
  terminal: {
    title: string;
    hint: string;
    prompt: string;
    tabTitle: string;
    clearCmd: string;
    whoamiCmd: string;
    placeholder: string;
    notFound: (cmd: string) => string;
    whoamiLines: (data: { ip: string; os: string; browser: string; device: string; screen: string; viewport: string; language: string; timezone: string; cores: string }) => string[];
    commands: Record<string, string[]>;
  };
  marquee: string[];
};

export const dictionaries: Record<Lang, Dict> = {
  en: {
    nav: {
      home: "Home", aboutus: "About Us", aboutTeam: "Our Team", aboutPartners: "Key Partners", aboutHonors: "Achievements", aboutVision: "Vision", aboutMission: "Mission", product: "Product", productWeb: "Web", productMobile: "Mobile", productWindows: "Windows", productAi: "Artificial Intelligence", productPlatforms: "Integrated Platforms", services: "Services", serviceWeb: "Website Design", serviceUiUx: "UI/UX Design", serviceEcommerce: "Online Store", serviceAndroid: "Android App", serviceIos: "iOS App", serviceSeo: "SEO & Optimization", serviceConsulting: "Consulting & Project Analysis", serviceSupport: "Support & Development", portfolio: "Portfolio", portfolioWebsites: "Websites", portfolioEcommerce: "Online Stores", portfolioMobile: "Mobile Apps", portfolioDesktop: "Desktop Software", portfolioOther: "Other Projects", blog: "Blog", contactus: "Contact", contactRequest: "Submit Project Request", contactConsultation: "Free Consultation", contactCollaborate: "Work With Us", panel: "User Panel", login: "Sign in", contact: "Contact Us", menuTitle: "Site menu", themeLight: "Light", themeDark: "Dark", language: "Language", }, pages: {
      aboutus: {
        eyebrow: "> loading /aboutus...", title: "About First Data", subtitle: "Fifteen years building software, with the same passion and more experience.", lines: [
          "150+ live projects across web, mobile, desktop, and custom platforms.",
          "Cross-functional squads with senior-led delivery and weekly transparent reporting.",
          "Full code ownership, no vendor lock-in, support after every launch.",
        ], }, aboutTeam: {
        eyebrow: "> loading /aboutus/team...", title: "Our Team", subtitle: "Engineers, designers, and strategists united by craft and accountability.", lines: [
          "Cross-functional squads aligned to your product goals, not siloed departments.", "Senior-led delivery with transparent communication at every milestone.", ], }, aboutPartners: {
        eyebrow: "> loading /aboutus/partners...", title: "Key Partners", subtitle: "Trusted alliances that extend our capabilities and your reach.", lines: [
          "Technology, cloud, and industry partners vetted for reliability and scale.", "We integrate best-in-class tools without locking you into unnecessary complexity.", ], }, aboutHonors: {
        eyebrow: "> loading /aboutus/honors...", title: "Achievements", subtitle: "Milestones earned through consistent delivery and client trust.", lines: [
          "150+ projects shipped across web, mobile, and enterprise software.", "Recognized for performance, accessibility, and long-term support excellence.", ], },       aboutVision: {
        eyebrow: "> loading /aboutus/vision...", title: "Our Vision", subtitle: "We believe technology should become a lasting advantage for your business, not a recurring expense you restart every year.", lines: [
          "Digital systems that grow with you, not against you.", "Independence, clarity, and quality that still matter years after launch.", "A future where your team moves faster because your software keeps up.", ], }, aboutMission: {
        eyebrow: "> loading /aboutus/mission...", title: "Our Mission", subtitle: "We build, deliver, and maintain software products that make your growth measurable, reliable, and sustainable.", lines: [
          "Every project scoped with honesty, built with engineering discipline, and supported after go-live.", "Clear communication, on-time delivery, and code you fully own.", "Partnership that continues long after version one ships.", ], }, contactRequest: {
        eyebrow: "> loading /contactus/request...", title: "Submit Project Request", subtitle: "Tell us what you need built, we scope, plan, and respond within one business day.", lines: [
          "Share goals, timeline, and constraints so we can propose a realistic delivery path.", "Every request is reviewed by a senior engineer, not a sales bot.", ], }, contactConsultation: {
        eyebrow: "> loading /contactus/consultation...", title: "Free Consultation", subtitle: "A focused session to clarify your product, tech stack, and next steps, no obligation.", lines: [
          "Ideal when you have an idea but need expert guidance before committing budget.", "We help you separate must-haves from nice-to-haves and avoid costly wrong turns.", ], }, contactCollaborate: {
        eyebrow: "> loading /contactus/collaborate...", title: "Work With Us", subtitle: "Agencies, studios, and businesses looking for a long-term engineering partner.", lines: [
          "White-label delivery, dedicated squads, or co-build models, structured and transparent.", "We integrate with your workflow, tools, and communication rhythm.", ], }, product: {
        eyebrow: "> loading /product...", title: "Digital Products", subtitle: "Platforms and tools engineered for scale.", lines: [
          "Custom CMS, dashboards, APIs, and integrated business systems.", "Every product is built for performance, security, and maintainability.", ], }, productWeb: {
        eyebrow: "> loading /product/web...", title: "Web", subtitle: "Browser-based products, portals, and SaaS platforms.", lines: [
          "Progressive web apps, admin panels, and customer-facing portals.", "Built with modern stacks for speed, accessibility, and SEO.", ], }, productMobile: {
        eyebrow: "> loading /product/mobile...", title: "Mobile", subtitle: "iOS and Android products for field teams and consumers.", lines: [
          "Native and cross-platform apps with offline-first workflows.", "App-store deployment, analytics, and push engagement built in.", ], }, productWindows: {
        eyebrow: "> loading /product/windows...", title: "Windows", subtitle: "Desktop software for Windows environments and enterprise IT.", lines: [
          "Line-of-business tools, installers, and MSI deployment pipelines.", "Deep OS integration with secure update and licensing models.", ], }, productAi: {
        eyebrow: "> loading /product/ai...", title: "Artificial Intelligence", subtitle: "AI-powered features embedded into your products and workflows.", lines: [
          "LLM integrations, intelligent search, and automated decision support.", "Privacy-aware design with on-premise and cloud deployment options.", ], }, productPlatforms: {
        eyebrow: "> loading /product/platforms...", title: "Integrated Platforms", subtitle: "Unified systems that connect web, mobile, desktop, and backends.", lines: [
          "Single sign-on, shared APIs, and synchronized data across channels.", "Modular architecture that grows with your organization.", ], }, portfolio: {
        eyebrow: "> loading /portfolio...", title: "Portfolio", subtitle: "Selected projects across web, mobile, and enterprise software.", lines: [
          "E-commerce platforms, mobile apps, ERP integrations, and SEO-driven websites.", "Case studies and metrics available on request.", ], }, portfolioWebsites: {
        eyebrow: "> loading /portfolio/websites...", title: "Websites", subtitle: "Corporate sites, landing pages, and content platforms built for performance.", lines: [
          "Responsive design, fast load times, and SEO-ready architecture from day one.", "From brand showcases to multi-language publishing systems.", ], }, portfolioEcommerce: {
        eyebrow: "> loading /portfolio/ecommerce...", title: "Online Stores", subtitle: "E-commerce experiences that convert visitors into loyal customers.", lines: [
          "Payment gateways, inventory sync, and checkout flows tuned for conversion.", "B2C storefronts and B2B ordering portals across industries.", ], }, portfolioMobile: {
        eyebrow: "> loading /portfolio/mobile-apps...", title: "Mobile Apps", subtitle: "Native and cross-platform apps for iOS and Android.", lines: [
          "Consumer apps, field-service tools, and companion apps for web platforms.", "Push notifications, offline support, and app-store deployment included.", ], }, portfolioDesktop: {
        eyebrow: "> loading /portfolio/desktop...", title: "Desktop Software", subtitle: "Windows and cross-platform desktop applications for business workflows.", lines: [
          "ERP clients, internal tools, and data-heavy dashboards with local performance.", "Secure deployment, auto-update pipelines, and enterprise licensing support.", ], }, portfolioOther: {
        eyebrow: "> loading /portfolio/other...", title: "Other Projects", subtitle: "Integrations, APIs, automation, and bespoke digital products.", lines: [
          "Custom middleware, third-party integrations, and workflow automation.", "Every engagement scoped to your stack, team, and growth goals.", ], }, blog: {
        eyebrow: "> loading /blog...", title: "Blog", subtitle: "Engineering, design, SEO, product, mobile, and AI, practical notes from our team.", lines: [
          "Long-form guides and checklists from projects we ship, web, mobile, SEO, and product.", "Filter by topic or open the featured article for this week's deep dive.", ], }, panel: {
        eyebrow: "> auth /panel...", title: "User Panel", subtitle: "Client dashboard, project status, files, and support tickets.", lines: [
          "Sign in to track milestones, download deliverables, and message your team.", "Panel access is provided after project kickoff.", ], }, }, blogUi: {
      filterLabel: "Filter by category", filterAll: "All", readMore: "Read article", readFull: "Read full article", minRead: "min read", noPosts: "No posts in this category yet.", relatedTitle: "Related articles", backToBlog: "Back to blog", featuredLabel: "Featured", articlesLabel: "articles shown", categoriesLabel: "topics", totalLabel: "total posts", rssLinkEn: "RSS (English)", rssLinkFa: "RSS (Persian)", shareLabel: "Share", copyLink: "Copy link", copiedLink: "Copied!", prevPost: "Previous", nextPost: "Next", postNavLabel: "Post navigation", writtenBy: "By", tableOfContents: "On this page", allArticlesLabel: "All articles", categories: {
        web: "Web", design: "UI/UX", seo: "SEO", mobile: "Mobile", product: "Product", ai: "AI", }, }, aboutUi: {
      manifesto: "Tools change, engineering principles do not.",
      storyEyebrow: "// our story",
      storyTitle: "Software built with craft, not hype.",
      paragraphs: [
        "At First Data, software development is not just writing code, it is finding the right solution for every problem. From marketing websites and online stores to mobile apps, desktop software, and custom products, we build every project with the same care and standards we apply to our own products.",
        "Technology has shifted, tools have come and gone, and we have grown with them. We adopt modern stacks, but we decide based on experience, not passing trends.",
        "We stay with clients after delivery, because a good product does not end at version one.",
      ],
      pillarsEyebrow: "// how we work",
      pillarsTitle: "Principles that outlast the stack.",
      pillars: [
        { label: "Solution first", text: "Every brief starts with the problem, scope, and measurable outcome, not a preset framework." },
        { label: "Experience over hype", text: "We pick tools that survive production, not demos that look good in a pitch deck." },
        { label: "After launch", text: "Support, iteration, and monitoring are part of delivery, not an optional add-on." },
      ],
      capabilitiesEyebrow: "// what we build",
      capabilitiesTitle: "One team, many surfaces.",
      capabilities: [
        { tag: "WEB", title: "Websites & stores", desc: "Fast, SEO-ready sites and e-commerce that convert." },
        { tag: "MOBILE", title: "Mobile apps", desc: "iOS and Android products users return to." },
        { tag: "DESKTOP", title: "Desktop software", desc: "Windows tools for teams and enterprise workflows." },
        { tag: "PRODUCT", title: "Custom platforms", desc: "Dashboards, APIs, and products built to your spec." },
      ],
      exploreEyebrow: "// go deeper",
      exploreTitle: "More about First Data",
      exploreMore: "Read more",
      statsStrip: {
        eyebrow: "At a glance",
        items: [
          { value: "15", suffix: "+", label: "Years building", note: "dialup era to AI stack" },
          { value: "150", suffix: "+", label: "Projects shipped", note: "web, mobile, desktop" },
          { value: "80", suffix: "+", label: "Teams onboard", note: "startup to enterprise" },
          { value: "99.9", suffix: "%", label: "Uptime focus", note: "sites that stay online" },
        ],
      },
      timeline: {
        eyebrow: "// our journey",
        title: "Fifteen years, one constant: ship quality software.",
        items: [
          { era: "2009–2014", title: "Foundations", text: "Started with web and desktop projects for local businesses, learning delivery discipline before chasing scale." },
          { era: "2015–2019", title: "Mobile & platforms", text: "Expanded into iOS, Android, and integrated backends as clients needed products beyond the browser." },
          { era: "2020–2023", title: "Product engineering", text: "Built dashboards, APIs, and long-term retainers, support and iteration became core to every engagement." },
          { era: "2024–now", title: "AI-ready stack", text: "Modern Next.js, Laravel, and mobile stacks with SEO, performance, and AI features baked in from day one." },
        ],
      },
      visionMission: {
        eyebrow: "// direction",
        title: "Where we are headed, and why we build.",
        vision: {
          title: "Technology as durable advantage",
          text: "Digital systems that grow with your business, without rebuilding from scratch every year.",
          linkLabel: "Read our vision",
        },
        mission: {
          title: "Build, ship, and sustain",
          text: "Honest scoping, engineering discipline, and support long after version one ships.",
          linkLabel: "Read our mission",
        },
      },
      teamPreview: {
        eyebrow: "// the squad",
        title: "Cross-functional teams, not siloed departments.",
        subtitle: "Every project gets engineers, designers, and strategists aligned to your product goals.",
        roles: [
          { tag: "ENG", title: "Engineering", text: "Full-stack, mobile, and DevOps engineers who own architecture and delivery." },
          { tag: "DES", title: "Design", text: "UI/UX designers who prototype in Figma before a single line of code." },
          { tag: "PM", title: "Product", text: "Scope, milestones, and weekly updates so you always know where things stand." },
          { tag: "OPS", title: "Support", text: "Monitoring, patches, and feature sprints after launch, not just before it." },
        ],
        cta: "Meet the team",
      },
      offices: {
        eyebrow: "// where we work",
        title: "Offices across Iran, one delivery standard.",
        hint: "Remote-first collaboration with on-site meetings when your project needs them.",
        cities: [
          { name: "Tehran", label: "HQ, engineering & product", status: "[ONLINE]" },
          { name: "Shiraz", label: "Design & client success", status: "[ONLINE]" },
          { name: "Ahvaz", label: "Regional projects & support", status: "[ONLINE]" },
        ],
      },
      honorsPreview: {
        eyebrow: "// track record",
        title: "Milestones earned through delivery, not slides.",
        items: [
          { value: "150+", label: "Live projects", desc: "Websites, apps, and enterprise tools in production." },
          { value: "98%", label: "Repeat clients", desc: "Teams who come back for the next version." },
          { value: "30d", label: "Launch warranty", desc: "Post-launch support included on every project." },
        ],
        cta: "View achievements",
      },
      why: {
        eyebrow: "// why first data",
        title: "Built different from agencies and freelancers.",
        subtitle: "A dedicated engineering partner that ships on time and hands you the keys.",
        points: [
          { icon: "team", label: "Full-stack team", text: "Design, frontend, backend, mobile, DevOps, one contract, zero coordination overhead." },
          { icon: "calendar", label: "On-time delivery", text: "We scope carefully, plan realistically, and deliver on the date we commit to." },
          { icon: "key", label: "You own the code", text: "Full repository access from day one. No vendor lock-in, ever." },
          { icon: "message", label: "Transparent reporting", text: "Weekly progress updates in plain language, you are never left wondering." },
        ],
      },
      exploreCards: [
        { slug: "team", desc: "Engineers, designers, and strategists united by craft and accountability." },
        { slug: "partners", desc: "Technology and cloud alliances that extend our capabilities and your reach." },
        { slug: "honors", desc: "Projects shipped, client trust earned, and milestones we are proud of." },
        { slug: "vision", desc: "How we see technology as a durable business advantage." },
        { slug: "mission", desc: "What we commit to on every project, from kickoff to years of support." },
      ],
    },
    visionUi: {
      quoteLabel: "$ cat vision.txt",
      quote: "The future belongs to businesses whose digital systems move as fast as their ambitions.",
      openingEyebrow: "// why this matters",
      openingTitle: "Technology should still work for you tomorrow.",
      opening: [
        "Markets change, teams grow, and customer expectations rise. Software that cannot keep pace becomes a bottleneck, not an advantage. Our vision is to help organizations build digital foundations that adapt without constant reinvention.",
        "We have seen fifteen years of tools arrive and fade. What endures is thoughtful engineering, honest scoping, and systems designed for the people who use them every day.",
        "We want every client to leave stronger: more independent, more capable, and equipped with products they can evolve on their own terms.",
      ],
      beliefsEyebrow: "// what we believe",
      beliefsTitle: "Four beliefs that guide our work.",
      beliefs: [
        { label: "Digital independence", text: "You should own your code, data, and accounts. We never design dependency into a project." },
        { label: "Adaptability by design", text: "Architecture should absorb change, new features, new markets, without tearing everything down." },
        { label: "Craft over noise", text: "We choose proven tools and clean engineering over hype that looks good in a presentation but fails in production." },
        { label: "Partnership with clarity", text: "Trust is built through plain language, realistic timelines, and doing what we said we would do." },
      ],
      pillarsEyebrow: "// where we are headed",
      pillarsTitle: "Horizons we are actively building toward.",
      pillars: [
        { tag: "AI", title: "Responsible intelligence", text: "AI features that save time and respect privacy, embedded where they add real value." },
        { tag: "A11Y", title: "Access for everyone", text: "Products that work in Persian, English, RTL, and for users of all abilities." },
        { tag: "SCALE", title: "Real scalability", text: "Systems that perform at ten users and ten thousand, without emergency rewrites." },
        { tag: "REGION", title: "Regional excellence", text: "World-class delivery from Iran, for local businesses and international teams alike." },
      ],
      commitmentEyebrow: "// our promise",
      commitmentTitle: "What our vision means in practice.",
      commitments: [
        "Recommend technology based on your long-term needs, not our preferred stack.",
        "Document and hand over everything you need to operate without us, if you choose to.",
        "Design for maintainability so your next team, internal or external, can continue confidently.",
        "Measure success by your outcomes: uptime, conversion, efficiency, and team satisfaction.",
      ],
      closingEyebrow: "// in one line",
      closing: "We are building a company, and a portfolio of client products, that still matter a decade from now. That is the standard we hold ourselves to.",
      relatedLabel: "/aboutus/mission",
      relatedTitle: "Our Mission",
      relatedDesc: "How we turn this vision into delivery, support, and measurable results on every project.",
      relatedHref: "/aboutus/mission",
      backAbout: "About First Data",
      backAboutDesc: "Return to the main About Us page.",
    },
    missionUi: {
      quoteLabel: "$ cat mission.txt",
      quote: "We deliver projects we would be proud to put our name on, not contracts we rush to close.",
      openingEyebrow: "// our purpose",
      openingTitle: "Build software that earns trust, every sprint.",
      opening: [
        "Our mission is simple to state and demanding to execute: design, build, and sustain digital products that help your business grow with confidence.",
        "We work with startups finding their footing and established companies modernizing critical systems. In every case, we start by understanding the problem before proposing a solution.",
        "Delivery is not a handoff moment for us. Launch is the beginning of a relationship where your product keeps improving as your market evolves.",
      ],
      beliefsEyebrow: "// how we commit",
      beliefsTitle: "Principles we never compromise on.",
      beliefs: [
        { label: "Honest scoping", text: "We tell you what is feasible, what it costs, and what it takes, before you commit budget or reputation." },
        { label: "Engineering discipline", text: "Clean architecture, secure defaults, and code review are standard, not premium extras." },
        { label: "Accountability", text: "Deadlines we set are deadlines we meet. When reality shifts, we communicate early and adjust together." },
        { label: "Long-term care", text: "Support, monitoring, and iteration are part of professional delivery, not an afterthought." },
      ],
      pillarsEyebrow: "// how we deliver",
      pillarsTitle: "From first conversation to years of support.",
      pillars: [
        { tag: "01", title: "Discovery", text: "Listen deeply, define scope, and align on outcomes everyone can measure." },
        { tag: "02", title: "Design first", text: "Prototype and validate before development spend, so you approve with confidence." },
        { tag: "03", title: "Iterative build", text: "Two-week sprints with demos, feedback loops, and no surprises at the finish line." },
        { tag: "04", title: "Launch & beyond", text: "Deployment, monitoring, warranty, and ongoing development when you need it." },
      ],
      commitmentEyebrow: "// what you can expect",
      commitmentTitle: "Our commitments on every engagement.",
      commitments: [
        "A dedicated team that knows your product, not a rotating cast of strangers.",
        "Weekly progress in clear language, no jargon walls between you and your project.",
        "Full repository and credential access from day one, you own everything we build.",
        "Security, performance, and accessibility treated as requirements, not nice-to-haves.",
        "A 30-day post-launch warranty and a support path when you want us to stay involved.",
      ],
      closingEyebrow: "// in one line",
      closing: "We exist to turn your ideas into reliable software and to stand behind it long after the first release. That is our mission, and our reputation depends on it.",
      relatedLabel: "/aboutus/vision",
      relatedTitle: "Our Vision",
      relatedDesc: "The long-term direction that shapes how we choose tools, teams, and partnerships.",
      relatedHref: "/aboutus/vision",
      backAbout: "About First Data",
      backAboutDesc: "Return to the main About Us page.",
    }, hero: {
      eyebrow: "// web.mobile.desktop.seo, delivered.", slogan: "From the dialup era to the world of AI.", lead:
        "At First Data, we're passionate about building digital solutions, from simple websites and online stores to mobile apps, custom software, and our own software products.", tagline:
        "Whether you're just starting out or have been in business for years, we design and deliver the right solution for your needs and budget. From the initial idea through development, support, and updates, we're with you to build a quality, reliable product.", subcopy: "", ctaPrimary: "Start Your Project", ctaSecondary: "Request Free Consult", scroll: "scroll to explore", version: "first-data ~ v1.0.0", brand: "FIRST DATA", }, heroMap: {
      ariaLabel: "Dot-matrix map of Iran with office locations", windowTitle: "geo.iran, live nodes", hint: "hover a node ▸", statusLine: "nodes: tehran, shiraz, ahvaz, ping ok", cities: {
        tehran: "Tehran", shiraz: "Shiraz", ahvaz: "Ahvaz", }, }, trust: {
      eyebrow: "// not pitch decks, shipped products", items: [
        {
          id: "projects", value: 150, suffix: "+", label: "Delivered live", note: "web, mobile, desktop", }, {
          id: "clients", value: 80, suffix: "+", label: "Teams onboard", note: "startup → enterprise", }, {
          id: "uptime", value: 99.9, suffix: "%", label: "Stay online", note: "sites that rarely sleep", decimals: 1, }, {
          id: "experience", value: 15, suffix: "+", label: "Years building", note: "dialup era → AI stack", }, ], }, services: {
      "01": {
        tag: "WEB", title: "Web Design & Development", subtitle: "High-performance websites that convert visitors into customers.", bullets: [
          "Custom design, no templates, no shortcuts.", "Next.js, React, Laravel, built to scale.", "Mobile-first, SEO-ready from day one.", "Integrated CMS, update your content, zero friction.", "Core Web Vitals optimized, fast loads, higher rankings.", ], stack: "Next.js /// React /// Laravel /// Tailwind /// PostgreSQL", cta: "Request a Quote", }, "02": {
        tag: "ANDROID", title: "Android App Development", subtitle: "Native Android apps that users actually love and return to.", bullets: [
          "Kotlin-first, Jetpack Compose for modern UI.", "Published to Google Play, handled end-to-end.", "Offline-capable with Room & WorkManager.", "Push notifications, in-app purchases, analytics.", "Performance-profiled, smooth on every device.", ], stack: "Kotlin /// Jetpack Compose /// Room /// Firebase /// Play Store", cta: "Build My App", }, "03": {
        tag: "IOS", title: "iOS App Development", subtitle: "Premium iOS experiences, built to Apple's exacting standards.", bullets: [
          "Swift & SwiftUI, Apple-native, polished UX.", "App Store submission, we handle the entire process.", "iCloud sync, Sign in with Apple, Face ID integration.", "ARKit, HealthKit, CoreML, advanced iOS capabilities.", "App Store Optimization, visibility from launch day.", ], stack: "Swift /// SwiftUI /// Xcode /// CoreData /// App Store", cta: "Build My iOS App", }, "04": {
        tag: "DESKTOP", title: "Windows & Desktop Software", subtitle: "Professional desktop applications that live where your team works.", bullets: [
          "WPF, WinUI 3, Electron, the right tool for each job.", "ERP integrations, connect to your existing systems.", "Installer packages, auto-update, license management.", "Offline-first, works without constant internet.", "Enterprise deployment via Group Policy & SCCM.", ], stack: "C# /// WPF /// WinUI 3 /// Electron /// .NET", cta: "Discuss Requirements", }, "05": {
        tag: "SEO", title: "SEO & Performance Optimization", subtitle: "Rank higher. Load faster. Convert better. Measurable results.", bullets: [
          "Technical SEO audit, find and fix what's holding you back.", "Core Web Vitals, sub-2s load times guaranteed.", "On-page and schema markup for AI and classic search.", "Keyword strategy for your market, Persian and global.", "Monthly reporting, you see exactly where you stand.", ], stack: "Google Search Console /// Ahrefs /// Lighthouse /// Schema.org", cta: "Audit My Site", }, "06": {
        tag: "UI/UX", title: "UI/UX Design", subtitle: "Interfaces users navigate without thinking. Design that removes friction.", bullets: [
          "User research & wireframing, build the right thing first.", "High-fidelity Figma prototypes, click-through before you commit.", "Design systems, consistent UI at any scale.", "Accessibility (WCAG 2.1 AA), reach every user.", "A/B testing ready, designs built for optimization.", ], stack: "Figma /// Adobe XD /// Storybook /// Zeplin", cta: "Design My Product", }, "07": {
        tag: "SHOP", title: "E-Commerce & Online Stores", subtitle: "Online stores engineered to sell, not just to exist.", bullets: [
          "Custom storefronts, not a theme, a conversion machine.", "Payment gateways, Zarinpal, Stripe, and more.", "Inventory, orders, shipping, end-to-end management.", "SEO-optimized product pages for organic discovery.", "Scales from 10 to 100,000 SKUs without re-architecture.", ], stack: "Next.js /// WooCommerce /// Shopify /// Zarinpal /// Stripe", cta: "Build My Store", }, "08": {
        tag: "SUPPORT", title: "Support & Ongoing Development", subtitle: "Your digital product, maintained and evolved. Not just launched.", bullets: [
          "SLA-backed uptime monitoring, 24/7 incident response.", "Security patches, dependency updates, no technical debt.", "Feature sprints, continuous delivery on a retainer.", "Performance monitoring with actionable monthly reports.", "Dedicated engineer, knows your codebase inside out.", ], stack: "GitHub /// Sentry /// Datadog /// CloudFlare /// UptimeRobot", cta: "Get Support Plan", }, "09": {
        tag: "CONSULT", title: "Consulting & Project Analysis", subtitle: "Clarity before code, scope, risk, and ROI mapped before you commit.", bullets: [
          "Discovery workshops, align stakeholders on goals and constraints.", "Technical feasibility and architecture recommendations.", "Effort estimates, milestones, and phased delivery roadmaps.", "Competitive and market analysis for product positioning.", "Written brief you can take to any team, or hire us to build it.", ], stack: "Miro /// Notion /// Figma /// Jira /// Confluence", cta: "Book a Consultation", }, }, why: {
      eyebrow: "// why first data", title: "Built Different.", subtitle:
        "Not an agency. Not a freelancer. A dedicated engineering team that ships.", points: [
        {
          label: "Full-Stack Team", text: "Design, frontend, backend, mobile, DevOps, one contract, zero coordination overhead.", }, {
          label: "On-Time. No Excuses.", text: "We scope carefully, plan realistically, and deliver on the date we commit to.", }, {
          label: "You Own the Code", text: "Full repository access from day one. No vendor lock-in, ever.", }, {
          label: "Transparent Reporting", text: "Weekly progress updates. You're never left wondering what we're working on.", }, ], }, process: {
      eyebrow: "// how we work", title: "From Brief to Live, in Four Steps.", steps: [
        {
          num: "01", label: "Discovery", text: "We listen, ask the right questions, and define scope with precision.", }, {
          num: "02", label: "Design & Plan", text: "Prototypes and architecture docs reviewed and approved before a single line of code.", }, {
          num: "03", label: "Build & Review", text: "Iterative sprints with demos every two weeks. You steer, we build.", }, {
          num: "04", label: "Launch & Support", text: "Deployment, monitoring setup, and a 30-day post-launch warranty on every project.", }, ], }, testimonials: {
      eyebrow: "// client feedback", title: "Real Words. Real Results.", items: [
        {
          name: "Ali Hosseini", role: "CEO, Retail Chain", text: "First Data built our e-commerce platform in 6 weeks. Sales are up 40% month-over-month since launch.", }, {
          name: "Sara Mohammadi", role: "Product Director, FinTech Startup", text: "The iOS app they delivered scored 4.8 on App Store on day one. The team is exceptionally thorough.", }, {
          name: "Reza Karimi", role: "CTO, Manufacturing Co.", text: "Our Windows ERP integration was a nightmare before First Data. Now it's the smoothest part of our operation.", }, ], }, faq: {
      eyebrow: "// common questions", title: "Answered.", items: [
        {
          q: "How long does a web project take?", a: "A standard corporate website: 3,5 weeks. Complex platforms: 8,16 weeks. We give you an exact timeline during scoping.", }, {
          q: "Do you work with small businesses?", a: "We work best with businesses ready to invest in professional results, small or large. If you have a real project and a real budget, we want to hear from you.", }, {
          q: "What is your pricing model?", a: "Fixed-price for defined scopes; monthly retainer for ongoing development and support. We send a detailed proposal after the discovery call.", }, {
          q: "Who owns the code?", a: "You do. Always. We hand over the full repository, credentials, and documentation at project close.", }, {
          q: "Do you support Persian (Farsi) and RTL layouts?", a: "Natively. Every product we build supports both Persian/Arabic RTL and English LTR from the ground up.", }, ], }, finalCta: {
      eyebrow: "// ready to start", title: "Let's Build Something Real.", subtitle:
        "Tell us about your project. We respond within one business day.", ctaPrimary: "Start a Project", ctaSecondary: "Ask a Question", }, home: {
      services: {
        eyebrow: "Our services", title: "What can First Data do for you?", subtitle:
          "Pick the option that matches what you need. Each one opens a simple page with details, no technical jargon required.", hint: "Tap a box to learn more about that service.", moreLabel: "See how it works", allLink: "See all services", items: [
          {
            slug: "web-design", title: "Business website", desc: "A professional site so customers can find you, trust you, and contact you online.", }, {
            slug: "ecommerce", title: "Online store", desc: "Sell products on the internet with secure payments and easy order management.", }, {
            slug: "android", title: "Android app", desc: "An app for Android phones, for your customers or your internal team.", }, {
            slug: "ios", title: "iPhone app", desc: "An app for iPhone and iPad users, published on the App Store.", }, {
            slug: "ui-ux", title: "Design & ease of use", desc: "We make your site or app clear, beautiful, and easy for anyone to use.", }, {
            slug: "seo", title: "Google visibility", desc: "Help more people discover you when they search on Google.", }, {
            slug: "consulting", title: "Free guidance", desc: "Not sure where to start? We explain your options in plain language.", }, {
            slug: "support", title: "After-launch care", desc: "Updates, fixes, and improvements, we stay with you after go-live.", }, ], }, products: {
        eyebrow: "Our products", title: "Digital products we build for you", subtitle:
          "Not just a website, full platforms and tools that run your business online and on devices.", hint: "Tap a box to see what each product type includes.", moreLabel: "→ details", allLink: "See all products", items: [
          {
            slug: "web", title: "Web apps & portals", desc: "Online dashboards, customer portals, and browser-based tools your team uses every day.", }, {
            slug: "mobile", title: "Mobile apps", desc: "iPhone and Android apps for customers or staff, with updates and support included.", }, {
            slug: "windows", title: "Windows software", desc: "Desktop programs for office computers, fast, reliable, and easy to install.", }, {
            slug: "ai", title: "Artificial intelligence", desc: "Search, chatbots, and automation that save time, built safely into your product.", }, {
            slug: "platforms", title: "All-in-one platforms", desc: "Website, app, admin panel, and backend connected, one system, one login.", }, ], }, why: {
        eyebrow: "Why work with us", title: "A team you can rely on", subtitle:
          "You do not need to understand code or tech terms. We explain everything clearly and deliver on time.", points: [
          {
            icon: "team", label: "One team for everything", text: "Design, website, app, and support, all in one place. No chasing different vendors.", }, {
            icon: "calendar", label: "Clear deadlines", text: "We agree on a delivery date upfront and keep you updated every week.", }, {
            icon: "key", label: "You own your project", text: "All files and accounts belong to you. No hidden lock-in.", }, {
            icon: "message", label: "Plain-language updates", text: "Progress reports in simple words, so you always know what is happening.", }, ], }, stats: {
        eyebrow: "By the numbers", items: [
          {
            value: "150", suffix: "+", label: "Projects shipped", punchline: "Sites, apps & tools, not just slide decks", }, {
            value: "24", suffix: "h", label: "Typical first reply", punchline: "Often much faster than that ☕", }, {
            value: "98", suffix: "%", label: "Would hire us again", punchline: "We actually ask, no fake reviews", }, {
            value: "0", label: "Surprise invoices", punchline: "Price agreed upfront. Full stop.", }, {
            value: "100", suffix: "%", label: "You own everything", punchline: "Code, design & accounts, all yours", }, {
            value: "7", label: "Days to kick off", punchline: "From signed contract to first sprint", }, ], }, start: {
        eyebrow: "Ready when you are", title: "Tell us what you need", subtitle:
          "Describe your idea in your own words. We reply within one business day, consultation is free.", cta: "Contact us", responseNote: "Usually answered within 24 hours on business days.", }, terminalIntro: {
        title: "Play with our mini terminal", subtitle:
          "If you enjoy tech, type commands below. Otherwise, skip this, it is just for fun.", }, }, auth: {
      login: {
        eyebrow: "> auth /login...", title: "Sign In", subtitle: "Access your panel with email + password, or OTP via email or SMS.", tabEmail: "Email", tabOtp: "OTP", labelEmail: "Email", labelPassword: "Password", labelOtp: "Verification code", otpChannelEmail: "Email OTP", otpChannelSms: "SMS OTP", labelPhone: "Mobile number", phonePlaceholder: "09123456789", otpSentEmail: "Code sent to your email.", otpSentSms: "Code sent via SMS to your mobile.", submit: "Sign In", sendOtp: "Send Code", verifyOtp: "Verify & Sign In", changeContact: "← change contact", loading: "please wait...", toRegister: "No account? Create one →", errorGeneric: "Something went wrong. Try again.", forgotPassword: "Forgot password?", labelTotp: "Authenticator code", totpSubtitle: "Enter the 6-digit code from your authenticator app.", totpSubmit: "Verify & Sign In", totpBack: "← back to sign in", }, forgotPassword: {
        eyebrow: "> auth /forgot-password...", title: "Reset Password", subtitle: "We will send a verification code to your email or mobile.", tabEmail: "Email", tabSms: "SMS", labelEmail: "Email", labelPhone: "Mobile number", phonePlaceholder: "09123456789", submit: "Send reset code", loading: "please wait...", sentEmail: "If an account exists, a code was sent to your email.", sentSms: "If an account exists, a code was sent via SMS.", continueReset: "Enter code & new password →", changeContact: "← change contact", toLogin: "Back to sign in", errorGeneric: "Something went wrong. Try again.", }, resetPassword: {
        eyebrow: "> auth /reset-password...", title: "Choose New Password", subtitle: "Enter the code we sent and your new password.", labelEmail: "Email", labelPhone: "Mobile number", phonePlaceholder: "09123456789", labelCode: "Verification code", labelPassword: "New password", labelConfirm: "Confirm password", submit: "Update password", loading: "please wait...", passwordMismatch: "Passwords do not match.", resendCode: "Resend code", toLogin: "Back to sign in", errorGeneric: "Something went wrong. Try again.", }, register: {
        eyebrow: "> auth /register...", title: "Create Account", subtitle: "Register with email + password, or OTP via email or SMS.", tabEmail: "Email", tabOtp: "OTP", labelName: "Full name", labelEmail: "Email", labelPassword: "Password (min 8 chars)", labelConfirm: "Confirm password", labelOtp: "Verification code", otpChannelEmail: "Email OTP", otpChannelSms: "SMS OTP", labelPhone: "Mobile number", phonePlaceholder: "09123456789", otpSentEmail: "Code sent to your email.", otpSentSms: "Code sent via SMS to your mobile.", submit: "Create Account", sendOtp: "Send Code", verifyOtp: "Verify & Register", changeContact: "← edit details", loading: "please wait...", toLogin: "Already have an account? Sign in →", errorGeneric: "Something went wrong. Try again.", errorPasswordMatch: "Passwords do not match.", }, panel: {
        welcome: "Welcome back", signedInAs: "Signed in as", logout: "Sign Out", loggingOut: "Signing out...", noPasswordHint: "You signed up with OTP. Set a password in Account settings.", statusLabel: "Session status", statusValue: "OPERATIONAL [OK]", linkServices: "View services", linkPortfolio: "View portfolio", linkContact: "Contact support", }, }, errors: {
      pages: {
        notFound: {
          eyebrow: "> error 404, route not found", title: "Page Not Found", subtitle: "The page you’re looking for doesn’t exist or has moved. Pick a route below to continue.", art: `┌──────────────────────────────┐
│  4 0 4, NOT FOUND       │
│  ──────────────────────────  │
│  the requested route does    │
│  not exist on this server.   │
└──────────────────────────────┘`, prompt: "root@fd:~$ cd /", ctaHome: "back home", ctaContact: "contact us", }, forbidden: {
          eyebrow: "> error 403, permission denied", title: "Access Denied", subtitle: "You don’t have permission to view this resource. Contact support if you believe this is a mistake.", art: `┌──────────────────────────────┐
│  4 0 3, EACCES           │
│  ──────────────────────────  │
│  insufficient privileges for   │
│  the requested operation.    │
└──────────────────────────────┘`, prompt: "root@fd:~$ sudo ???", ctaHome: "back home", ctaContact: "contact support", }, maintenance: {
          eyebrow: "> error 503, service unavailable", title: "Under Maintenance", subtitle: "We’re deploying updates. The site will be back shortly. Thank you for your patience.", art: `┌──────────────────────────────┐
│  5 0 3, MAINTENANCE     │
│  ──────────────────────────  │
│  systems upgrading.          │
│  ETA: soon™                  │
└──────────────────────────────┘`, prompt: "root@fd:~$ systemctl status fd", ctaHome: "check homepage", ctaContact: "contact us", ctaRetry: "retry", }, sessionExpired: {
          eyebrow: "> error 401, session expired", title: "Session Expired", subtitle: "Your login session has ended. Sign in again to continue to the panel.", art: `┌──────────────────────────────┐
│  4 0 1, SESSION END      │
│  ──────────────────────────  │
│  token expired or invalid.   │
│  re-authenticate required.   │
└──────────────────────────────┘`, prompt: "auth@fd:~$ login --refresh", ctaHome: "homepage", ctaContact: "contact us", ctaLogin: "sign in again", }, offline: {
          eyebrow: "> error, network unreachable", title: "You’re Offline", subtitle: "No internet connection detected. Reconnect and retry, or browse cached pages when available.", art: `┌──────────────────────────────┐
│  NET, ERR,OFFLINE        │
│  ──────────────────────────  │
│  cannot reach firstdata.ir     │
│  check your connection.      │
└──────────────────────────────┘`, prompt: "root@fd:~$ ping firstdata.ir", ctaHome: "back home", ctaContact: "contact us", ctaRetry: "retry", }, server: {
          eyebrow: "> process halted unexpectedly", title: "Server hiccup", subtitle:
            "Something went wrong on our side. Retry the action or go back, we logged the incident.", prompt: "root@fd:~$ ./retry.sh --safe", ctaHome: "homepage", ctaContact: "contact us", ctaRetry: "try again", }, global: {
          eyebrow: "> kernel panic, root layout unreachable", title: "Something broke deep inside", subtitle:
            "The page shell crashed before we could recover. Reload or return home, your session data is safe.", prompt: "root@fd:~$ systemctl restart first-data", ctaHome: "homepage", ctaContact: "contact us", ctaRetry: "reload", }, }, auth: {
        INVALID_CREDENTIALS: "Invalid email or password.", INVALID_OTP: "Invalid or expired verification code.", ACCOUNT_NOT_FOUND: "No account found for this email.", ACCOUNT_NOT_FOUND_PHONE: "No account found for this mobile number.", EMAIL_ALREADY_EXISTS: "This email is already registered.", PHONE_ALREADY_EXISTS: "This mobile number is already registered.", RATE_LIMIT: "Too many requests. Try again later.", VALIDATION: "Please check your input and try again.", SERVER: "Something went wrong. Try again.", LOGOUT_FAILED: "Could not sign out. Try again.", SESSION_FAILED: "Could not verify your session.", OTP_SEND_FAILED: "Could not send verification code.", }, contact: {
        nameRequired: "Name is required.", emailRequired: "Email is required.", emailInvalid: "Enter a valid email address.", messageRequired: "Message is required.", messageMin: "Message must be at least 10 characters.", networkError: "Network error. Check your connection and try again.", }, projectRequest: {
        nameRequired: "Full name is required.", emailRequired: "Email is required.", emailInvalid: "Enter a valid email address.", phoneRequired: "Phone number is required.", phoneInvalid: "Enter a valid phone number.", projectTypeRequired: "Select at least one project type.", budgetRequired: "Select an approximate budget.", timelineRequired: "Select an expected timeline.", descriptionRequired: "Project description is required.", descriptionMin: "Description must be at least 10 characters.", networkError: "Network error. Check your connection and try again.", }, consultationRequest: {
        nameRequired: "Name is required.", phoneRequired: "Phone number is required.", phoneInvalid: "Enter a valid phone number.", contactMethodRequired: "Select a contact method.", emailRequired: "Email is required when email is your contact method.", emailInvalid: "Enter a valid email address.", contactTimeRequired: "Select the best time to contact you.", networkError: "Network error. Check your connection and try again.", }, collaborateRequest: {
        networkError: "Network error. Check your connection and try again.", hiring: {
          nameRequired: "Name is required.", resumeRequired: "Resume file is required.", urlInvalid: "Enter a valid URL starting with http:// or https://", skillsRequired: "Skills are required.", salaryRequired: "Expected salary is required.", workModeRequired: "Select a work mode.", }, freelancer: {
          nameRequired: "Name is required.", phoneRequired: "Phone number is required.", phoneInvalid: "Enter a valid phone number.", specialtyRequired: "Select at least one specialty.", portfolioRequired: "Portfolio/samples file is required.", }, }, inline: {
        offlineBanner: "You are offline, some features may not work.", offlinePage: "details", retry: "retry", chunkLoad: "A new version is available. Reload to update.", }, offlineUi: {
        windowTitle: "fd.net, connectivity", tabTitle: "bash, fd.net", codeLabel: "ERR,OFFLINE", statusNet: "Network", statusDns: "DNS", statusCache: "Cache", statusOffline: "OFFLINE", statusUnavailable: "UNAVAILABLE", statusAvailable: "AVAILABLE", terminalLines: [
          "$ ping firstdata.ir -c 4", "PING firstdata.ir (185.143.223.100): 56 data bytes", "Request timeout for icmp_seq 0", "Request timeout for icmp_seq 1", "Request timeout for icmp_seq 2", "Request timeout for icmp_seq 3", "--- firstdata.ir ping statistics ---", "4 packets transmitted, 0 received, 100% packet loss", ], checklistTitle: "While you wait", checklist: [
          "Check Wi‑Fi or mobile data is enabled", "Try another network or disable VPN", "Reload this page after reconnecting", ], onlineRestored: "Connection restored, you can retry now.", lastSync: "Last successful sync: unknown (offline)", }, network: {
        failed: "Connection failed. Check your network.", timeout: "Request timed out. Try again.", badGateway: "Server temporarily unavailable (502/504).", malformed: "Unexpected server response.", }, }, contact: {
      eyebrow: "// get in touch", title: "Contact First Data", subtitle:
        "Fill in the form or reach us directly. No sales pressure, just a conversation.", labelName: "Name", labelEmail: "Email", labelPhone: "Phone (optional)", labelService: "Service needed", labelMessage: "Tell us about your project", labelSubmit: "Send Message", submitting: "Sending...", serviceOptions: [
        "Web Design & Development", "Android App", "iOS App", "Windows Software", "SEO & Performance", "UI/UX Design", "E-Commerce", "Support & Maintenance", "Other", ], success: "> Message sent. We'll respond within 1 business day.", directEmail: "info@firstdata.ir", directPhone: "+98 933 127 4039", directAddress: "Shiraz, Sarbaz Blvd, Isargaran St, Alley 3", orDirect: "or reach us directly:", }, projectRequest: {
      sectionBasic: "Basic information", sectionType: "Project type", sectionBudget: "Approximate budget", sectionTimeline: "Expected timeline", sectionDescription: "Project description", sectionFiles: "Attachments", labelName: "Full name", labelEmail: "Email", labelPhone: "Phone number", labelCompany: "Company name", labelCompanyOptional: "Optional", labelDescription: "Describe your goals, features, and any constraints…", labelUpload: "Upload file", removeFile: "Remove file", filesHint: "Wireframe, PDF, sample site, logo, or brand assets (max 5 files, 10 MB each).", labelSubmit: "Submit request", submitting: "Sending…", success: "> Request received. We'll review it and respond within one business day.", sendAnother: "Submit another request", projectTypes: {
        web: "Website design", ecommerce: "Online store", android: "Android app", ios: "iOS app", windows: "Windows software", seo: "SEO", support: "Support", custom: "Custom product", }, budgets: {
        under_30m: "Under 30M", "30_70m": "30M – 70M", "70_150m": "70M – 150M", over_150m: "Over 150M", unknown: "Not sure yet", }, timelines: {
        urgent: "Urgent", one_month: "One month", two_three_months: "Two to three months", flexible: "Flexible", }, }, consultationRequest: {
      sectionContactMethod: "Preferred contact method", sectionContactTime: "Best time to contact", labelName: "Name", labelPhone: "Phone", labelEmail: "Email", labelEmailOptional: "Optional (required if email is your contact method)", labelSubmit: "Request consultation", submitting: "Sending…", success: "> Consultation request received. We'll contact you at your preferred time.", sendAnother: "Submit another request", contactMethods: {
        call: "Phone call", whatsapp: "WhatsApp", telegram: "Telegram", email: "Email", }, contactTimes: {
        morning: "Morning", noon: "Noon", afternoon: "Afternoon", }, }, collaborateRequest: {
      branchToggleLabel: "Application type", branches: {
        hiring: "Hiring", freelancer: "Project collaboration", }, labelSubmit: "Submit application", submitting: "Sending…", success: "> Application received. We'll review your profile and get back to you.", sendAnother: "Submit another application", hiring: {
        sectionBasic: "Basic information", sectionResume: "Resume", sectionLinks: "Links", sectionDetails: "Skills & compensation", sectionWorkMode: "Work mode", labelName: "Name", labelGithub: "GitHub", labelLinkedin: "LinkedIn", labelPortfolioUrl: "Portfolio / samples (URL)", labelSkills: "Skills", labelSalary: "Expected salary", labelUploadResume: "Upload resume", resumeHint: "PDF or DOC preferred (max 10 MB).", workModes: {
          onsite: "On-site", remote: "Remote", }, }, freelancer: {
        sectionBasic: "Basic information", sectionSpecialty: "Specialty", sectionPortfolio: "Portfolio / samples", sectionResume: "Resume (optional)", labelName: "Name", labelPhone: "Phone", labelUploadPortfolio: "Upload portfolio / samples", labelUploadResume: "Upload resume", portfolioHint: "Work samples, PDF portfolio, or archive (max 10 MB).", resumeHint: "Optional — PDF or DOC (max 10 MB).", specialties: {
          ui_designer: "UI Designer", react_dev: "React Developer", flutter: "Flutter", python: "Python", seo: "SEO", content: "Content creation", }, }, }, footer: {
      tagline: "// engineered to ship. built to last.", rights: "// First Data, 2026. all rights reserved.", copyrightBrand: "First Data", copyrightSuffix: "All rights reserved.", changelogAria: "Open release changelog", changelogTitle: "Release changelog", changelogClose: "Close", linkTerms: "Terms", linkServices: "Services", linkContact: "Contact", stack: "Next.js /// React /// TypeScript /// Tailwind", brand: ">FIRST DATA", social: {
        instagram: "Instagram", linkedin: "LinkedIn", facebook: "Facebook", telegram: "Telegram", }, }, terms: {
      eyebrow: "// legal", title: "Terms of use", subtitle:
        "Rules for using the First Data website, our content, and the software version published on this domain.", rules: [
        {
          title: "Acceptance", body: "By browsing firstdata.ir you agree to these terms. If you do not agree, please stop using the site.", }, {
          title: "Content & intellectual property", body: "Text, visuals, code samples, and branding on this site belong to First Data unless stated otherwise. You may not copy or republish them without written permission.", }, {
          title: "Contact & submissions", body: "Information you send through our forms must be accurate. We use it only to respond to your request and improve our services, in line with applicable privacy laws.", }, {
          title: "Versioning & changelog", body: "The footer shows the current site version. Click the version number to open the release changelog. We update the changelog whenever we ship meaningful improvements.", }, {
          title: "Availability", body: "We aim for high uptime but do not guarantee uninterrupted access. Maintenance or updates may briefly affect the site.", }, {
          title: "Changes", body: "We may revise these terms or release new site versions. Continued use after an update means you accept the current terms and changelog.", }, ], changelogTitle: "Release history", changelogIntro: "Every published version and its user-visible changes are listed below.", versionNote: "Current version is shown in the site footer. Click it anytime to reopen this list.", }, consent: {
      message: "We use analytics cookies (Google Analytics) to improve the site. Accept or decline, your choice.", accept: "Accept", reject: "Decline", }, pwa: {
      installTitle: "Install First Data", installBody: "Add the app to your home screen for faster access and offline support.", installAction: "Install app", installDismiss: "Not now", installSuccess: "App installed, welcome aboard.", pushTitle: "Enable notifications", pushBody: "Get updates about releases, blog posts, and site status.", pushAction: "Enable", pushDismiss: "No thanks", pushSuccess: "Notifications enabled.", pushDenied: "Notifications blocked in browser settings.", pushUnsupported: "Push notifications are not supported on this device.", installedBadge: "PWA, installed", }, preloader: {
      corner: "SYS,INIT v1.0.0", welcome: "> WELCOME TO FIRST DATA", deploying: "DEPLOYING", bottom: "FIRSTDATA.IR", lines: [
        { text: "> mounting runtime.............. [ OK ]", tone: "ok", gap: 1200 }, { text: "> loading service modules [1/8..8/8].. [ OK ]", tone: "ok", gap: 100 }, { text: "> negotiating TLS handshake.....", tone: "ok", gap: 100 }, { text: "> [ ERROR ]", tone: "error", gap: 300 }, { text: "> [ ERROR ]", tone: "error", gap: 100 }, { text: "> [ ERROR ]", tone: "error", gap: 100 }, { text: "> [ ERROR ]", tone: "error", gap: 100 }, { text: "> [ ERROR ]", tone: "error", gap: 100 }, { text: "> [FIRST,DATA]: detected 11 faults. on your system.", tone: "accent", gap: 300 }, { text: "> [FIRST,DATA]: calibrating delivery engine.....", tone: "accent", gap: 100 }, { text: "> [FIRST,DATA]: configuring web + mobile + desktop layers.....", tone: "accent", gap: 100 }, { text: "> [FIRST,DATA]: standby...", tone: "wait", gap: 100 }, { text: "> [FIRST,DATA]: solution compiled. shipping.....", tone: "success", gap: 100 }, { text: "> 0 errors  0 warnings  [ SUCCESS ]", tone: "success", gap: 1000 }, { text: "> all systems nominal. status: READY", tone: "success", gap: 120 }, ], }, navPreloader: {
      prompt: "root@fd:~$", loading: (path) => `> loading ${path}...`, steps: [
        "▸ resolving route …", "▸ fetching RSC payload …", "▸ rendering page …", ], }, terminal: {
      title: "First Data Terminal v1.0.0", hint: "Type 'help' for available commands.", prompt: "fd@first-data:~$ ", tabTitle: "first-data ~ interactive", clearCmd: "clear", whoamiCmd: "whoami", placeholder: "type a command...", notFound: (cmd) => `command not found: ${cmd}. Type 'help'.`, whoamiLines: (d) => [
        "identity scan:", `  ip:        ${d.ip}`, `  os:        ${d.os}`, `  browser:   ${d.browser}`, `  device:    ${d.device}`, `  screen:    ${d.screen}`, `  viewport:  ${d.viewport}`, `  language:  ${d.language}`, `  timezone:  ${d.timezone}`, `  cores:     ${d.cores}`, "[ scan complete ]", ], commands: {
        help: [
          "Available commands:", "  help     , show this list", "  services , list our 8 services", "  stat     , runtime statistics", "  render   , run first,data.runtime", "  whoami   , scan your device + ip", "  whoareyou, about First Data", "  version  , runtime version", "  clear    , clear terminal", ], services: [
          "First Data, services loaded:", "  01  Web Design & Development", "  02  Android App Development", "  03  iOS App Development", "  04  Windows & Desktop Software", "  05  SEO & Performance Optimization", "  06  UI/UX Design", "  07  E-Commerce & Online Stores", "  08  Support & Ongoing Development", "  status: OPERATIONAL [OK]", ], stat: [
          "first,data.runtime statistics:", "  client:     businesses of all sizes", "  services:   8", "  projects:   150+", "  uptime:     99.9% SLA", "  contrast:   21:1 [WCAG AAA]", "  stack:      every language & framework", "  status:     OPERATIONAL [OK]", ], render: [
          "initializing first,data.runtime...", "loading service,stack [1/8..8/8]", "mounting delivery,engine ....... [OK]", "calibrating quality,layer ....... [OK]", "build status: SHIPPED [OK]", "runtime: OPERATIONAL", ], whoareyou: [
          "First Data, who we are:", "  company:   First Data", "  tagline:   We Build. You Grow.", "  mission:   engineer digital products that drive", "             real business results.", "  services:  web, android, ios, desktop, seo, ux", "  contact:   info@firstdata.ir", "  phone:     +98 933 127 4039", "  status:    OPERATIONAL [OK]", ], version: [
          "first,data.runtime v1.0.0", "runtime: Next.js / React 18", "build: production [static]", "contact: info@firstdata.ir", ], }, }, marquee: [
      "Web Design", "Android", "iOS", "Windows", "SEO", "UI/UX", "E-Commerce", "Support", "React", "Next.js", "Swift", "Kotlin", "Laravel", "Node.js", "TypeScript", "Figma", ], }, fa: {
    nav: {
      home: "خانه", aboutus: "درباره ما", aboutTeam: "تیم ما", aboutPartners: "شرکا کلیدی", aboutHonors: "افتخارات", aboutVision: "چشم‌انداز", aboutMission: "ماموریت", product: "محصولات", productWeb: "وب", productMobile: "موبایل", productWindows: "ویندوز", productAi: "هوش مصنوعی", productPlatforms: "پلتفرم‌های یکپارچه", services: "خدمات", serviceWeb: "طراحی وب‌سایت", serviceUiUx: "طراحی UI و UX", serviceEcommerce: "فروشگاه اینترنتی", serviceAndroid: "اپلیکیشن اندروید", serviceIos: "اپلیکیشن iOS", serviceSeo: "سئو و بهینه‌سازی", serviceConsulting: "مشاوره و تحلیل پروژه", serviceSupport: "پشتیبانی و توسعه", portfolio: "نمونه‌کارها", portfolioWebsites: "وب‌سایت‌ها", portfolioEcommerce: "فروشگاه اینترنتی", portfolioMobile: "اپلیکیشن موبایل", portfolioDesktop: "نرم‌افزار دسکتاپ", portfolioOther: "دیگر پروژه‌ها", blog: "وبلاگ", contactus: "تماس", contactRequest: "ثبت درخواست پروژه", contactConsultation: "دریافت مشاوره رایگان", contactCollaborate: "همکاری با ما", panel: "پنل کاربری", login: "ورود", contact: "تماس با ما", menuTitle: "منوی سایت", themeLight: "روز", themeDark: "شب", language: "زبان", }, pages: {
      aboutus: {
        eyebrow: "> بارگذاری /aboutus...", title: "درباره FirstData", subtitle: "۱۵ سال است که نرم‌افزار می‌سازیم؛ هنوز هم با همان اشتیاق، اما با تجربه‌ای بیشتر.", lines: [
          "بیش از ۱۵۰ پروژه زنده در وب، موبایل، دسکتاپ و پلتفرم‌های اختصاصی.",
          "تیم‌های چندتخصصی با رهبری ارشد و گزارش‌دهی شفاف هفتگی.",
          "مالکیت کامل کد، بدون وابستگی به فروشنده، پشتیبانی پس از هر لانچ.",
        ], }, aboutTeam: {
        eyebrow: "> بارگذاری /aboutus/team...", title: "تیم ما", subtitle: "مهندسان، طراحان و استراتژیست‌هایی که با تخصص و مسئولیت‌پذیری کار می‌کنند.", lines: [
          "تیم‌های چندتخصصی هم‌راستا با اهداف محصول شما, نه واحدهای جدا از هم.", "تحویل با رهبری ارشد و ارتباط شفاف در هر مرحله از پروژه.", ], }, aboutPartners: {
        eyebrow: "> بارگذاری /aboutus/partners...", title: "شرکا کلیدی", subtitle: "همکاری‌های معتبر که توانایی ما و دامنه دسترسی شما را گسترش می‌دهند.", lines: [
          "شرکای فناوری، ابری و صنعتی با ارزیابی دقیق برای پایداری و مقیاس.", "یکپارچه‌سازی ابزارهای برتر بدون قفل‌کردن شما در پیچیدگی غیرضروری.", ], }, aboutHonors: {
        eyebrow: "> بارگذاری /aboutus/honors...", title: "افتخارات", subtitle: "دستاوردهایی که با تحویل مداوم و اعتماد مشتریان به دست آمده‌اند.", lines: [
          "بیش از ۱۵۰ پروژه در وب، موبایل و نرم‌افزار سازمانی.", "شناخته‌شده در عملکرد، دسترس‌پذیری و تعالی پشتیبانی بلندمدت.", ], },       aboutVision: {
        eyebrow: "> بارگذاری /aboutus/vision...", title: "چشم‌انداز ما", subtitle: "باور داریم فناوری باید مزیت پایدار کسب‌وکار شما باشد، نه هزینه‌ای که هر سال از نو شروع شود.", lines: [
          "سیستم‌های دیجیتالی که همراه رشد شما جلو می‌روند، نه علیه آن.", "استقلال، شفافیت و کیفیتی که سال‌ها بعد از لانچ هم ارزشمند بماند.", "آینده‌ای که تیم شما سریع‌تر حرکت کند چون نرم‌افزارتان عقب نمی‌ماند.", ], }, aboutMission: {
        eyebrow: "> بارگذاری /aboutus/mission...", title: "ماموریت ما", subtitle: "می‌سازیم، تحویل می‌دهیم و نگهداری می‌کنیم تا رشد کسب‌وکار شما قابل اندازه‌گیری، پایدار و قابل اتکا باشد.", lines: [
          "هر پروژه با صداقت در محدوده، با انضباط مهندسی و با پشتیبانی پس از راه‌اندازی.", "ارتباط شفاف، تحویل به‌موقع و کدی که کاملاً در اختیار شماست.", "همکاری‌ای که فراتر از نسخه اول ادامه پیدا می‌کند.", ], }, contactRequest: {
        eyebrow: "> بارگذاری /contactus/request...", title: "ثبت درخواست پروژه", subtitle: "نیاز خود را بگویید, در یک روز کاری بررسی می‌کنیم و مسیر پیشنهادی می‌دهیم.", lines: [
          "اهداف، زمان‌بندی و محدودیت‌ها را شفاف بنویسید تا برآورد واقع‌بینانه داشته باشید.", "هر درخواست توسط مهندس ارشد بررسی می‌شود، نه ربات فروش.", ], }, contactConsultation: {
        eyebrow: "> بارگذاری /contactus/consultation...", title: "دریافت مشاوره رایگان", subtitle: "جلسه‌ای متمرکز برای روشن‌کردن محصول، تکنولوژی و گام بعدی, بدون تعهد.", lines: [
          "مناسب وقتی ایده دارید ولی قبل از بودجه‌گذاری به راهنمایی تخصصی نیاز دارید.", "کمک می‌کنیم اولویت‌های ضروری را از امکانات اختیاری جدا کنید.", ], }, contactCollaborate: {
        eyebrow: "> بارگذاری /contactus/collaborate...", title: "همکاری با ما", subtitle: "برای آژانس‌ها، استودیوها و کسب‌وکارهایی که به دنبال شریک مهندسی بلندمدت هستند.", lines: [
          "تحویل white-label، تیم اختصاصی یا هم‌ساخت, با قرارداد شفاف.", "با فرآیند، ابزار و ریتم ارتباطی شما هماهنگ می‌شویم.", ], }, product: {
        eyebrow: "> بارگذاری /product...", title: "محصولات دیجیتال", subtitle: "پلتفرم‌ها و ابزارهایی مهندسی‌شده برای مقیاس.", lines: [
          "CMS سفارشی، داشبورد، API و سیستم‌های یکپارچه کسب‌وکار.", "هر محصول برای عملکرد، امنیت و نگهداری پایدار ساخته می‌شود.", ], }, productWeb: {
        eyebrow: "> بارگذاری /product/web...", title: "وب", subtitle: "محصولات مبتنی بر مرورگر، پورتال و پلتفرم SaaS.", lines: [
          "وب‌اپ پیش‌رونده، پنل مدیریت و پورتال مشتری.", "ساخته‌شده با استک‌های مدرن برای سرعت، دسترس‌پذیری و سئو.", ], }, productMobile: {
        eyebrow: "> بارگذاری /product/mobile...", title: "موبایل", subtitle: "محصولات iOS و اندروید برای تیم‌های میدانی و مصرف‌کنندگان.", lines: [
          "اپ نیتیو و چندسکویی با گردش کار آفلاین‌اول.", "انتشار در استور، آنالیتیکس و اعلان push از ابتدا.", ], }, productWindows: {
        eyebrow: "> بارگذاری /product/windows...", title: "ویندوز", subtitle: "نرم‌افزار دسکتاپ برای محیط ویندوز و IT سازمانی.", lines: [
          "ابزار خط کسب‌وکار، نصب‌کننده و خط استقرار MSI.", "یکپارچگی عمیق با سیستم‌عامل و مدل به‌روزرسانی و لایسنس امن.", ], }, productAi: {
        eyebrow: "> بارگذاری /product/ai...", title: "هوش مصنوعی", subtitle: "قابلیت‌های هوش مصنوعی در محصولات و گردش کار شما.", lines: [
          "یکپارچه‌سازی LLM، جستجوی هوشمند و پشتیبانی تصمیم خودکار.", "طراحی آگاه از حریم خصوصی با گزینه استقرار on-premise و ابری.", ], }, productPlatforms: {
        eyebrow: "> بارگذاری /product/platforms...", title: "پلتفرم‌های یکپارچه", subtitle: "سیستم‌های یکپارچه که وب، موبایل، دسکتاپ و بک‌اند را به هم وصل می‌کنند.", lines: [
          "ورود یکپارچه، API مشترک و همگام‌سازی داده در همه کانال‌ها.", "معماری ماژولار که با رشد سازمان شما گسترش می‌یابد.", ], }, portfolio: {
        eyebrow: "> بارگذاری /portfolio...", title: "نمونه‌کارها", subtitle: "پروژه‌های منتخب در وب، موبایل و نرم‌افزار سازمانی.", lines: [
          "فروشگاه آنلاین، اپ موبایل، یکپارچه‌سازی ERP و وب‌سایت‌های سئومحور.", "مطالعات موردی و آمار با درخواست در دسترس است.", ], }, portfolioWebsites: {
        eyebrow: "> بارگذاری /portfolio/websites...", title: "وب‌سایت‌ها", subtitle: "سایت‌های شرکتی، لندینگ و پلتفرم محتوا با تمرکز بر عملکرد.", lines: [
          "طراحی واکنش‌گرا، سرعت بارگذاری بالا و معماری آماده سئو از روز اول.", "از معرفی برند تا سیستم‌های چندزبانه انتشار محتوا.", ], }, portfolioEcommerce: {
        eyebrow: "> بارگذاری /portfolio/ecommerce...", title: "فروشگاه اینترنتی", subtitle: "تجربه خرید آنلاین که بازدیدکننده را به مشتری وفادار تبدیل می‌کند.", lines: [
          "درگاه پرداخت، همگام‌سازی موجودی و فرآیند تسویه بهینه‌شده برای تبدیل.", "فروشگاه B2C و پورتال سفارش B2B در صنایع مختلف.", ], }, portfolioMobile: {
        eyebrow: "> بارگذاری /portfolio/mobile-apps...", title: "اپلیکیشن موبایل", subtitle: "اپلیکیشن‌های نیتیو و چندسکویی برای iOS و اندروید.", lines: [
          "اپ مصرفی، ابزار میدانی و اپ همراه برای پلتفرم‌های وب.", "اعلان push، پشتیبانی آفلاین و انتشار در استورها.", ], }, portfolioDesktop: {
        eyebrow: "> بارگذاری /portfolio/desktop...", title: "نرم‌افزار دسکتاپ", subtitle: "اپلیکیشن دسکتاپ ویندوز و چندسکویی برای فرآیندهای کسب‌وکار.", lines: [
          "کلاینت ERP، ابزار داخلی و داشبوردهای داده‌محور با عملکرد محلی.", "استقرار امن، به‌روزرسانی خودکار و پشتیبانی لایسنس سازمانی.", ], }, portfolioOther: {
        eyebrow: "> بارگذاری /portfolio/other...", title: "دیگر پروژه‌ها", subtitle: "یکپارچه‌سازی، API، اتوماسیون و محصولات دیجیتال سفارشی.", lines: [
          "میان‌افزار اختصاصی، اتصال به سرویس‌های ثالث و اتوماسیون گردش کار.", "هر پروژه متناسب با زیرساخت، تیم و اهداف رشد شما تعریف می‌شود.", ], }, blog: {
        eyebrow: "> بارگذاری /blog...", title: "وبلاگ", subtitle: "مهندسی، طراحی، سئو، محصول، موبایل و هوش مصنوعی، یادداشت‌های عملی تیم ما.", lines: [
          "راهنماها و چک‌لیست‌های بلند از پروژه‌هایی که تحویل می‌دهیم، وب، موبایل، سئو و محصول.", "بر اساس موضوع فیلتر کنید یا مقاله ویژه این هفته را باز کنید.", ], }, panel: {
        eyebrow: "> احراز هویت /panel...", title: "پنل کاربری", subtitle: "داشبورد مشتری, وضعیت پروژه، فایل‌ها و تیکت پشتیبانی.", lines: [
          "وارد شوید تا نقاط عطف را ببینید، تحویل‌ها را دانلود کنید و با تیم در ارتباط باشید.", "دسترسی پنل پس از شروع پروژه فعال می‌شود.", ], }, }, blogUi: {
      filterLabel: "فیلتر بر اساس دسته", filterAll: "همه", readMore: "مطالعه مقاله", readFull: "خواندن کامل مقاله", minRead: "دقیقه مطالعه", noPosts: "هنوز پستی در این دسته نیست.", relatedTitle: "مقالات مرتبط", backToBlog: "بازگشت به وبلاگ", featuredLabel: "ویژه", articlesLabel: "مقاله نمایش‌داده‌شده", categoriesLabel: "موضوع", totalLabel: "کل مقالات", rssLinkEn: "RSS انگلیسی", rssLinkFa: "RSS فارسی", shareLabel: "اشتراک‌گذاری", copyLink: "کپی لینک", copiedLink: "کپی شد!", prevPost: "قبلی", nextPost: "بعدی", postNavLabel: "ناوبری مقالات", writtenBy: "نویسنده", tableOfContents: "فهرست این صفحه", allArticlesLabel: "همه مقالات", categories: {
        web: "وب", design: "UI/UX", seo: "سئو", mobile: "موبایل", product: "محصول", ai: "هوش مصنوعی", }, }, aboutUi: {
      manifesto: "ابزارها تغییر می‌کنند، اصول مهندسی نه!",
      storyEyebrow: "// داستان ما",
      storyTitle: "نرم‌افزاری که با اصول ساخته می‌شود، نه با هیاهو.",
      paragraphs: [
        "در FirstData، توسعه نرم‌افزار فقط نوشتن کد نیست؛ پیدا کردن راه‌حل مناسب برای هر مسئله است. از وب‌سایت‌های معرفی و فروشگاه‌های اینترنتی گرفته تا اپلیکیشن‌های موبایل، نرم‌افزارهای دسکتاپ و محصولات اختصاصی، هر پروژه را با همان دقت و استانداردی توسعه می‌دهیم که برای محصولات خودمان به کار می‌بریم.",
        "در این سال‌ها فناوری تغییر کرده، ابزارها عوض شده‌اند و ما هم همراه آن‌ها رشد کرده‌ایم. به همین دلیل از فناوری‌های به‌روز استفاده می‌کنیم، اما تصمیم‌هایمان را بر اساس تجربه می‌گیریم، نه موج‌های زودگذر.",
        "بعد از تحویل پروژه هم کنار مشتری می‌مانیم؛ چون یک محصول خوب، با انتشار نسخه اول تمام نمی‌شود.",
      ],
      pillarsEyebrow: "// نحوه کار ما",
      pillarsTitle: "اصولی که از مد فناوری جلوتر می‌مانند.",
      pillars: [
        { label: "اول راه‌حل", text: "هر پروژه از مسئله، محدوده و نتیجه قابل‌سنجش شروع می‌شود، نه از یک فریم‌ورک از پیش انتخاب‌شده." },
        { label: "تجربه بر موج", text: "ابزارهایی را انتخاب می‌کنیم که در پروداکشن دوام می‌آورند، نه دموهایی که فقط در ارائه جذاب‌اند." },
        { label: "بعد از لانچ", text: "پشتیبانی، تکرار و پایش بخشی از تحویل است، نه گزینه اختیاری." },
      ],
      capabilitiesEyebrow: "// چه می‌سازیم",
      capabilitiesTitle: "یک تیم، سطوح مختلف محصول.",
      capabilities: [
        { tag: "WEB", title: "وب و فروشگاه", desc: "سایت‌های سریع، سئوپذیر و فروشگاه‌هایی که تبدیل می‌کنند." },
        { tag: "MOBILE", title: "اپلیکیشن موبایل", desc: "محصولات iOS و اندروید که کاربر برمی‌گردد." },
        { tag: "DESKTOP", title: "نرم‌افزار دسکتاپ", desc: "ابزار ویندوز برای تیم‌ها و گردش کار سازمانی." },
        { tag: "PRODUCT", title: "پلتفرم اختصاصی", desc: "داشبورد، API و محصولاتی که دقیقاً مطابق نیاز شما ساخته می‌شوند." },
      ],
      exploreEyebrow: "// بیشتر بدانید",
      exploreTitle: "بخش‌های دیگر درباره ما",
      exploreMore: "مطالعه",
      statsStrip: {
        eyebrow: "در یک نگاه",
        items: [
          { value: "۱۵", suffix: "+", label: "سال ساخت", note: "از Dialup تا AI" },
          { value: "۱۵۰", suffix: "+", label: "پروژه تحویل‌شده", note: "وب, موبایل, دسکتاپ" },
          { value: "۸۰", suffix: "+", label: "تیم همراه", note: "استارتاپ تا سازمان" },
          { value: "۹۹.۹", suffix: "٪", label: "تمرکز آپ‌تایم", note: "سایت و سرویس پایدار" },
        ],
      },
      timeline: {
        eyebrow: "// مسیر ما",
        title: "پانزده سال، یک ثبات: تحویل نرم‌افزار باکیفیت.",
        items: [
          { era: "۱۳۸۸–۱۳۹۳", title: "شروع و پایه‌گذاری", text: "با پروژه‌های وب و دسکتاپ برای کسب‌وکارهای محلی شروع کردیم و قبل از مقیاس، انضباط تحویل را یاد گرفتیم." },
          { era: "۱۳۹۴–۱۳۹۸", title: "موبایل و پلتفرم", text: "با نیاز مشتریان به محصول فراتر از مرورگر، وارد iOS، اندروید و بک‌اند یکپارچه شدیم." },
          { era: "۱۳۹۹–۱۴۰۲", title: "مهندسی محصول", text: "داشبورد، API و قراردادهای بلندمدت ساختند, پشتیبانی و تکرار بخش اصلی هر همکاری شد." },
          { era: "۱۴۰۳–اکنون", title: "استک آماده AI", text: "Next.js، Laravel و موبایل مدرن با سئو، عملکرد و قابلیت‌های هوش مصنوعی از روز اول." },
        ],
      },
      visionMission: {
        eyebrow: "// جهت‌گیری",
        title: "به کجا می‌رویم و چرا می‌سازیم.",
        vision: {
          title: "فناوری به‌عنوان مزیت پایدار",
          text: "سیستم دیجیتالی که با کسب‌وکار شما رشد کند, بدون بازسازی کامل هر سال.",
          linkLabel: "خواندن چشم‌انداز",
        },
        mission: {
          title: "ساخت، تحویل و نگهداری",
          text: "تعریف صادقانه محدوده، انضباط مهندسی و پشتیبانی فراتر از نسخه اول.",
          linkLabel: "خواندن ماموریت",
        },
      },
      teamPreview: {
        eyebrow: "// تیم",
        title: "تیم‌های چندتخصصی, نه واحدهای جدا.",
        subtitle: "هر پروژه مهندس، طراح و استراتژیست دارد که با اهداف محصول شما هم‌راستا کار می‌کند.",
        roles: [
          { tag: "ENG", title: "مهندسی", text: "فول‌استک، موبایل و DevOps که معماری و تحویل را مالک می‌شوند." },
          { tag: "DES", title: "طراحی", text: "طراحان UI/UX که قبل از کد، در Figma پروتوتایپ می‌سازند." },
          { tag: "PM", title: "محصول", text: "محدوده، نقاط عطف و آپدیت هفتگی تا همیشه بدانید کجا ایستاده‌اید." },
          { tag: "OPS", title: "پشتیبانی", text: "مانیتورینگ، وصله و فیچر بعد از لانچ, نه فقط قبل از آن." },
        ],
        cta: "آشنایی با تیم",
      },
      offices: {
        eyebrow: "// محل کار",
        title: "دفاتر در ایران, یک استاندارد تحویل.",
        hint: "همکاری remote-first با جلسات حضوری وقتی پروژه شما نیاز دارد.",
        cities: [
          { name: "تهران", label: "دفتر مرکزی, مهندسی و محصول", status: "[ONLINE]" },
          { name: "شیراز", label: "طراحی و موفقیت مشتری", status: "[ONLINE]" },
          { name: "اهواز", label: "پروژه‌های منطقه‌ای و پشتیبانی", status: "[ONLINE]" },
        ],
      },
      honorsPreview: {
        eyebrow: "// سابقه",
        title: "دستاوردهایی که با تحویل به دست آمده, نه اسلاید.",
        items: [
          { value: "۱۵۰+", label: "پروژه زنده", desc: "وب‌سایت، اپ و ابزار سازمانی در پروداکشن." },
          { value: "۹۸٪", label: "همکاری مجدد", desc: "تیم‌هایی که برای نسخه بعد برمی‌گردند." },
          { value: "۳۰ روز", label: "ضمانت لانچ", desc: "پشتیبانی پس از راه‌اندازی در هر پروژه." },
        ],
        cta: "مشاهده افتخارات",
      },
      why: {
        eyebrow: "// چرا FirstData",
        title: "متفاوت از آژانس و فریلنسر.",
        subtitle: "شریک مهندسی اختصاصی که سر موعد تحویل می‌دهد و کلید پروژه را به شما می‌دهد.",
        points: [
          { icon: "team", label: "تیم فول‌استک", text: "طراحی، فرانت، بک‌اند، موبایل و DevOps, یک قرارداد، صفر هزینه هماهنگی." },
          { icon: "calendar", label: "تحویل به‌موقع", text: "محدوده را دقیق تعریف می‌کنیم، واقع‌بینانه برنامه‌ریزی می‌کنیم و سر موعد تحویل می‌دهیم." },
          { icon: "key", label: "کد از آن شماست", text: "دسترسی کامل به ریپو از روز اول. هیچ وابستگی به فروشنده‌ای در کار نیست." },
          { icon: "message", label: "گزارش شفاف", text: "آپدیت هفتگی با زبان ساده, هرگز در تاریکی نمی‌مانید." },
        ],
      },
      exploreCards: [
        { slug: "team", desc: "مهندسان، طراحان و استراتژیست‌ها با تخصص و مسئولیت‌پذیری." },
        { slug: "partners", desc: "همکاری‌های فناوری و ابری که توانایی ما و دسترسی شما را گسترش می‌دهند." },
        { slug: "honors", desc: "پروژه‌های تحویل‌شده، اعتماد مشتریان و نقاط عطفی که به آن افتخار می‌کنیم." },
        { slug: "vision", desc: "نگاه ما به فناوری به‌عنوان مزیت پایدار کسب‌وکار." },
        { slug: "mission", desc: "تعهد ما در هر پروژه, از شروع تا سال‌ها پشتیبانی." },
      ],
    },
    visionUi: {
      quoteLabel: "$ cat vision.txt",
      quote: "آینده از آن کسب‌وکارهایی است که سیستم دیجیتالشان هم‌قد جاه‌طلبی‌هایشان حرکت می‌کند.",
      openingEyebrow: "// چرا اهمیت دارد",
      openingTitle: "فناوری باید فردا هم برای شما کار کند.",
      opening: [
        "بازار عوض می‌شود، تیم بزرگ می‌شود و انتظار مشتری بالاتر می‌رود. نرم‌افزاری که نتواند هم‌گام شود، تبدیل به گلوگاه می‌شود، نه مزیت. چشم‌انداز ما کمک به ساخت زیرساخت دیجیتالی است که بدون بازسازی دائمی سازگار بماند.",
        "پانزده سال ابزار دیده‌ایم که آمدند و رفتند. آنچه می‌ماند مهندسی دقیق، تعریف صادقانه محدوده و سیستمی است که برای انسان‌هایی طراحی شده که هر روز با آن کار می‌کنند.",
        "می‌خواهیم هر مشتری قوی‌تر خارج شود: مستقل‌تر، توانمندتر و با محصولی که بتواند روی شرایط خودش آن را توسعه دهد.",
      ],
      beliefsEyebrow: "// باورهای ما",
      beliefsTitle: "چهار باوری که کار ما را هدایت می‌کند.",
      beliefs: [
        { label: "استقلال دیجیتال", text: "کد، داده و حساب‌ها باید مال شما باشد. وابستگی را عمداً در هیچ پروژه‌ای طراحی نمی‌کنیم." },
        { label: "سازگاری در طراحی", text: "معماری باید تغییر را بپذیرد, فیچر جدید، بازار جدید, بدون ویرانی کامل." },
        { label: "اصول بر هیاهو", text: "ابزارهای آزموده و مهندسی تمیز را بر موج‌های زودگذری که در ارائه خوب و در پروداکشن شکست می‌خورند ترجیح می‌دهیم." },
        { label: "همکاری شفاف", text: "اعتماد با زبان روشن، زمان‌بندی واقع‌بینانه و انجام کاری که گفته‌ایم ساخته می‌شود." },
      ],
      pillarsEyebrow: "// افق پیش رو",
      pillarsTitle: "جهت‌هایی که فعالانه به سمت آن حرکت می‌کنیم.",
      pillars: [
        { tag: "AI", title: "هوش مسئولانه", text: "قابلیت‌های AI که وقت ذخیره می‌کنند و حریم خصوصی را رعایت می‌کنند, جایی که واقعاً ارزش دارند." },
        { tag: "A11Y", title: "دسترسی برای همه", text: "محصولاتی که به فارسی، انگلیسی، RTL و برای کاربران با نیازهای مختلف درست کار کنند." },
        { tag: "SCALE", title: "مقیاس واقعی", text: "سیستم‌هایی که در ده کاربر و ده‌هزار کاربر عملکرد داشته باشند, بدون بازنویسی اضطراری." },
        { tag: "REGION", title: "تعالی منطقه‌ای", text: "تحویل در سطح جهانی از ایران, برای کسب‌وکارهای داخلی و تیم‌های بین‌المللی." },
      ],
      commitmentEyebrow: "// تعهد عملی",
      commitmentTitle: "چشم‌انداز ما در عمل یعنی چه.",
      commitments: [
        "فناوری را بر اساس نیاز بلندمدت شما پیشنهاد می‌دهیم, نه استک مورد علاقه خودمان.",
        "همه چیز لازم برای اداره مستقل را مستند و تحویل می‌دهیم, اگر بخواهید بدون ما ادامه دهید.",
        "برای نگهداری طراحی می‌کنیم تا تیم بعدی شما, داخلی یا خارجی, با اطمینان ادامه دهد.",
        "موفقیت را با نتیجه شما می‌سنجیم: آپ‌تایم، تبدیل، بهره‌وری و رضایت تیم.",
      ],
      closingEyebrow: "// یک جمله",
      closing: "شرکت و مجموعه محصولات مشتریانی می‌سازیم که یک دهه بعد هم اهمیت داشته باشند. این معیاری است که خودمان را با آن می‌سنجیم.",
      relatedLabel: "/aboutus/mission",
      relatedTitle: "ماموریت ما",
      relatedDesc: "چگونه این چشم‌انداز را به تحویل، پشتیبانی و نتیجه قابل اندازه‌گیری در هر پروژه تبدیل می‌کنیم.",
      relatedHref: "/aboutus/mission",
      backAbout: "درباره FirstData",
      backAboutDesc: "بازگشت به صفحه اصلی درباره ما.",
    },
    missionUi: {
      quoteLabel: "$ cat mission.txt",
      quote: "پروژه‌ای تحویل می‌دهیم که گفتنش برایمان افتخار باشد, نه قراردادی که عجله کنیم تمامش کنیم.",
      openingEyebrow: "// هدف ما",
      openingTitle: "نرم‌افزاری بسازیم که هر اسپرینت اعتماد بسازد.",
      opening: [
        "ماموریت ما ساده است که بگوییم و سخت که اجرا کنیم: طراحی، ساخت و نگهداری محصولات دیجیتالی که رشد کسب‌وکار شما را با اطمینان ممکن می‌کند.",
        "با استارتاپ‌هایی کار می‌کنیم که تازه راه افتاده‌اند و شرکت‌هایی که سیستم‌های حیاتی‌شان را نوسازی می‌کنند. در هر دو حالت، اول مسئله را می‌فهمیم، بعد راه‌حل پیشنهاد می‌دهیم.",
        "تحویل برای ما پایان کار نیست. لانچ آغاز رابطه‌ای است که محصول شما هم‌زمان با بازار بهتر می‌شود.",
      ],
      beliefsEyebrow: "// تعهد ما",
      beliefsTitle: "اصولی که هرگز از آن کوتاه نمی‌آییم.",
      beliefs: [
        { label: "تعریف صادقانه محدوده", text: "قبل از تعهد بودجه یا اعتبار، می‌گوییم چه شدنی است، چه هزینه دارد و چقدر زمان می‌برد." },
        { label: "انضباط مهندسی", text: "معماری تمیز، امنیت پیش‌فرض و بازبینی کد استاندارد است, نه گزینه ویژه." },
        { label: "مسئولیت‌پذیری", text: "موعدی که می‌دهیم موعدی است که تحویل می‌دهیم. اگر واقعیت عوض شد، زود می‌گوییم و با هم تنظیم می‌کنیم." },
        { label: "مراقبت بلندمدت", text: "پشتیبانی، پایش و تکرار بخشی از تحویل حرفه‌ای است, نه فکر بعدی." },
      ],
      pillarsEyebrow: "// نحوه تحویل",
      pillarsTitle: "از اولین گفتگو تا سال‌ها همراهی.",
      pillars: [
        { tag: "۰۱", title: "کشف", text: "گوش دادن عمیق، تعریف محدوده و هم‌راستایی روی نتایج قابل اندازه‌گیری." },
        { tag: "۰۲", title: "طراحی اول", text: "پروتوتایپ و اعتبارسنجی قبل از هزینه توسعه, تا با اطمینان تأیید کنید." },
        { tag: "۰۳", title: "ساخت تکرارشونده", text: "اسپرینت دو هفته‌ای با دمو، بازخورد و بدون غافلگیری در خط پایان." },
        { tag: "۰۴", title: "لانچ و بعدش", text: "استقرار، مانیتورینگ، ضمانت و توسعه مداوم وقتی نیاز دارید." },
      ],
      commitmentEyebrow: "// آنچه می‌توانید انتظار داشته باشید",
      commitmentTitle: "تعهد ما در هر همکاری.",
      commitments: [
        "تیمی اختصاصی که محصول شما را می‌شناسد, نه نیرویی که هر هفته عوض می‌شود.",
        "گزارش هفتگی با زبان روشن, بدون دیوار اصطلاحات فنی بین شما و پروژه.",
        "دسترسی کامل به ریپو و اعتبارنامه از روز اول, همه چیز مال شماست.",
        "امنیت، عملکرد و دسترس‌پذیری به‌عنوان الزام, نه «خوب است داشته باشیم».",
        "ضمانت ۳۰ روزه پس از لانچ و مسیر پشتیبانی وقتی بخواهید کنار بمانیم.",
      ],
      closingEyebrow: "// یک جمله",
      closing: "وجود داریم تا ایده‌های شما را به نرم‌افزار قابل اتکا تبدیل کنیم و مدت‌ها بعد از اولین انتشار پشت آن بایستیم. این ماموریت ماست و شهرت ما به آن وابسته است.",
      relatedLabel: "/aboutus/vision",
      relatedTitle: "چشم‌انداز ما",
      relatedDesc: "جهت بلندمدتی که انتخاب ابزار، تیم و همکاری‌ها را شکل می‌دهد.",
      relatedHref: "/aboutus/vision",
      backAbout: "درباره FirstData",
      backAboutDesc: "بازگشت به صفحه اصلی درباره ما.",
    }, hero: {
      eyebrow: "// وب.موبایل.دسکتاپ.سئو, تحویل‌شده.", slogan: "از روزهای Dialup تا دنیای AI", lead:
        "در FirstData به ساخت راهکارهای دیجیتال علاقه‌مندیم؛ از وب‌سایت‌های ساده و فروشگاه‌های اینترنتی گرفته تا اپلیکیشن‌های موبایل، نرم‌افزارهای اختصاصی و محصولات نرم‌افزاری خودمان.", tagline:
        "فرقی نمی‌کند در ابتدای مسیر باشید یا سال‌ها از کسب‌وکارتان گذشته باشد؛ ما متناسب با نیاز و بودجه شما بهترین راهکار را طراحی و اجرا می‌کنیم. از ایده اولیه تا توسعه، پشتیبانی و به‌روزرسانی، کنار شما هستیم تا محصولی باکیفیت و قابل اعتماد داشته باشید.", subcopy: "", ctaPrimary: "شروع پروژه", ctaSecondary: "مشاوره رایگان", scroll: "برای کاوش اسکرول کنید", version: "اولین‌دیتا ~ نسخه ۱.۰.۰", brand: "اولین دیتا", }, heroMap: {
      ariaLabel: "نقشه نقطه‌ای ایران با موقعیت دفاتر", windowTitle: "geo.iran, نودهای فعال", hint: "روی نقطه بروید ▸", statusLine: "نودها: تهران, شیراز, اهواز, ping ok", cities: {
        tehran: "تهران", shiraz: "شیراز", ahvaz: "اهواز", }, }, trust: {
      eyebrow: "// نه پاورپوینت, محصول واقعی", items: [
        {
          id: "projects", value: 150, suffix: "+", label: "تحویل زنده", note: "وب, موبایل, دسکتاپ", }, {
          id: "clients", value: 80, suffix: "+", label: "تیم همراه", note: "استارتاپ تا سازمان", }, {
          id: "uptime", value: 99.9, suffix: "٪", label: "همیشه آنلاین", note: "سایت و سرویس خاموش نمی‌شود", decimals: 1, }, {
          id: "experience", value: 15, suffix: "+", label: "سال ساخت", note: "از Dialup تا AI", }, ], }, services: {
      "01": {
        tag: "وب", title: "طراحی و توسعه وب‌سایت", subtitle: "وب‌سایت‌های پرسرعت که بازدیدکننده را به مشتری تبدیل می‌کنند.", bullets: [
          "طراحی اختصاصی, بدون قالب، بدون میانبر.", "Next.js، React، Laravel, ساخته‌شده برای مقیاس.", "موبایل‌فرست، آماده‌ی سئو از روز اول.", "CMS یکپارچه, محتوای خود را بدون دردسر آپدیت کنید.", "بهینه‌شده برای Core Web Vitals, بارگذاری سریع، رتبه بالاتر.", ], stack: "Next.js /// React /// Laravel /// Tailwind /// PostgreSQL", cta: "درخواست قیمت", }, "02": {
        tag: "اندروید", title: "توسعه اپلیکیشن اندروید", subtitle: "اپ‌های اندرویدی که کاربران واقعاً عاشقشان می‌شوند.", bullets: [
          "Kotlin و Jetpack Compose برای رابط کاربری مدرن.", "انتشار در Google Play, تمام مراحل زیر نظر ما.", "قابلیت آفلاین با Room و WorkManager.", "نوتیفیکیشن، خرید درون‌برنامه‌ای، آنالیتیکس.", "بهینه‌سازی عملکرد, روان روی هر دستگاهی.", ], stack: "Kotlin /// Jetpack Compose /// Room /// Firebase /// Play Store", cta: "اپم را بسازید", }, "03": {
        tag: "iOS", title: "توسعه اپلیکیشن iOS", subtitle: "تجربه‌های iOS درجه‌یک, ساخته‌شده بر اساس معیارهای دقیق اپل.", bullets: [
          "Swift و SwiftUI, بومی اپل، تجربه کاربری صیقلی.", "انتشار در App Store, تمام فرایند بر عهده ما.", "همگام‌سازی iCloud، Sign in with Apple، Face ID.", "ARKit، HealthKit، CoreML, قابلیت‌های پیشرفته iOS.", "بهینه‌سازی App Store, دیده‌شدن از روز اول.", ], stack: "Swift /// SwiftUI /// Xcode /// CoreData /// App Store", cta: "اپ iOS بسازید", }, "04": {
        tag: "دسکتاپ", title: "نرم‌افزار ویندوز و دسکتاپ", subtitle: "نرم‌افزارهای حرفه‌ای دسکتاپ که در محل کار تیم شما قرار می‌گیرند.", bullets: [
          "WPF، WinUI 3، Electron, ابزار درست برای هر کار.", "یکپارچه‌سازی با ERP, اتصال به سیستم‌های موجود.", "پکیج نصب، آپدیت خودکار، مدیریت لایسنس.", "آفلاین‌فرست, بدون نیاز به اینترنت مداوم.", "استقرار سازمانی از طریق Group Policy و SCCM.", ], stack: "C# /// WPF /// WinUI 3 /// Electron /// .NET", cta: "بررسی نیازمندی‌ها", }, "05": {
        tag: "سئو", title: "سئو و بهینه‌سازی عملکرد", subtitle: "رتبه بالاتر. بارگذاری سریع‌تر. تبدیل بهتر. نتایج قابل اندازه‌گیری.", bullets: [
          "آدیت سئوی فنی, مشکلات پنهان را پیدا و رفع می‌کنیم.", "بهینه‌سازی Core Web Vitals, بارگذاری زیر ۲ ثانیه.", "اسکیمای Schema برای سئوی کلاسیک و هوش مصنوعی.", "استراتژی کلیدواژه برای بازار شما, فارسی و جهانی.", "گزارش ماهانه, دقیقاً می‌دانید کجا ایستاده‌اید.", ], stack: "Google Search Console /// Ahrefs /// Lighthouse /// Schema.org", cta: "آدیت سایتم", }, "06": {
        tag: "UI/UX", title: "طراحی UI/UX", subtitle: "رابط‌هایی که کاربران بدون فکر در آن‌ها حرکت می‌کنند. طراحی که اصطکاک را حذف می‌کند.", bullets: [
          "تحقیق کاربری و وایرفریم, اول چیز درست را بسازید.", "پروتوتایپ Figma با دقت بالا, قبل از تعهد کلیک کنید.", "سیستم طراحی, UI یکنواخت در هر مقیاسی.", "دسترسی‌پذیری (WCAG 2.1 AA), به همه کاربران برسید.", "آماده برای A/B Testing, طراحی‌شده برای بهینه‌سازی.", ], stack: "Figma /// Adobe XD /// Storybook /// Zeplin", cta: "طراحی محصولم", }, "07": {
        tag: "فروشگاه", title: "فروشگاه اینترنتی و تجارت الکترونیک", subtitle: "فروشگاه‌های آنلاین که برای فروش طراحی شده‌اند, نه فقط برای وجودداشتن.", bullets: [
          "فرانت‌اند اختصاصی, نه یک قالب، یک ماشین تبدیل.", "درگاه‌های پرداخت, زرین‌پال، Stripe و بیشتر.", "موجودی، سفارش، ارسال, مدیریت از ابتدا تا انتها.", "صفحات محصول بهینه‌شده برای سئو.", "از ۱۰ تا ۱۰۰٬۰۰۰ محصول بدون بازطراحی.", ], stack: "Next.js /// WooCommerce /// Shopify /// زرین‌پال /// Stripe", cta: "فروشگاهم را بسازید", }, "08": {
        tag: "پشتیبانی", title: "پشتیبانی و توسعه مداوم", subtitle: "محصول دیجیتال شما، نگهداری و توسعه‌یافته. نه فقط لانچ‌شده.", bullets: [
          "مانیتورینگ آپ‌تایم با SLA, پاسخ ۲۴/۷ به حوادث.", "وصله‌های امنیتی، آپدیت وابستگی‌ها, بدون بدهی فنی.", "اسپرینت‌های فیچر, تحویل مداوم با قرارداد ماهانه.", "مانیتورینگ عملکرد با گزارش ماهانه قابل اقدام.", "مهندس اختصاصی, کدبیس شما را از درون می‌شناسد.", ], stack: "GitHub /// Sentry /// Datadog /// CloudFlare /// UptimeRobot", cta: "پلن پشتیبانی", }, "09": {
        tag: "مشاوره", title: "مشاوره و تحلیل پروژه", subtitle: "شفافیت قبل از کد, دامنه، ریسک و بازگشت سرمایه قبل از تعهد.", bullets: [
          "کارگاه کشف نیاز, هم‌راستایی ذی‌نفعان روی اهداف و محدودیت‌ها.", "امکان‌سنجی فنی و پیشنهاد معماری.", "برآورد تلاش، نقاط عطف و نقشه راه تحویل مرحله‌ای.", "تحلیل رقابتی و بازار برای جایگاه‌یابی محصول.", "سند جامع قابل ارائه به هر تیمی, یا سپردن ساخت به ما.", ], stack: "Miro /// Notion /// Figma /// Jira /// Confluence", cta: "رزرو جلسه مشاوره", }, }, why: {
      eyebrow: "// چرا اولین دیتا", title: "متفاوت ساخته‌شده.", subtitle:
        "نه یک آژانس. نه یک فریلنسر. یک تیم مهندسی اختصاصی که تحویل می‌دهد.", points: [
        {
          label: "تیم فول‌استک", text: "طراحی، فرانت، بک‌اند، موبایل، DevOps, یک قرارداد، صفر هزینه هماهنگی.", }, {
          label: "به‌موقع. بدون بهانه.", text: "محدوده را دقیق تعریف می‌کنیم، واقعاً برنامه‌ریزی می‌کنیم و سر موعد تحویل می‌دهیم.", }, {
          label: "کد از آن شماست", text: "دسترسی کامل به ریپو از روز اول. هیچ وابستگی به فروشنده‌ای در کار نیست.", }, {
          label: "گزارش‌دهی شفاف", text: "آپدیت هفتگی پیشرفت. هرگز در تاریکی نمی‌مانید.", }, ], }, process: {
      eyebrow: "// نحوه کار ما", title: "از بریف تا لانچ, در چهار مرحله.", steps: [
        {
          num: "۰۱", label: "کشف", text: "گوش می‌دهیم، سوال‌های درست می‌پرسیم و محدوده را با دقت تعریف می‌کنیم.", }, {
          num: "۰۲", label: "طراحی و برنامه‌ریزی", text: "پروتوتایپ و سند معماری قبل از نوشتن هر خطی از کد بررسی و تأیید می‌شوند.", }, {
          num: "۰۳", label: "ساخت و بررسی", text: "اسپرینت‌های تکرارشونده با دمو هر دو هفته. شما هدایت می‌کنید، ما می‌سازیم.", }, {
          num: "۰۴", label: "لانچ و پشتیبانی", text: "استقرار، راه‌اندازی مانیتورینگ و ضمانت ۳۰ روزه پس از لانچ برای هر پروژه.", }, ], }, testimonials: {
      eyebrow: "// بازخورد مشتریان", title: "حرف‌های واقعی. نتایج واقعی.", items: [
        {
          name: "علی حسینی", role: "مدیرعامل، زنجیره خرده‌فروشی", text: "اولین دیتا پلتفرم تجارت الکترونیکی ما را در ۶ هفته ساخت. فروش از لانچ ماه‌به‌ماه ۴۰٪ رشد داشته.", }, {
          name: "سارا محمدی", role: "مدیر محصول، استارتاپ فینتک", text: "اپ iOS که تحویل دادند در روز اول امتیاز ۴.۸ در App Store گرفت. تیم استثنایی است.", }, {
          name: "رضا کریمی", role: "مدیر فناوری، شرکت تولیدی", text: "یکپارچه‌سازی ERP ویندوزی ما قبل از اولین دیتا کابوس بود. الان روان‌ترین بخش عملیات ماست.", }, ], }, faq: {
      eyebrow: "// سوالات متداول", title: "پاسخ داده‌شده.", items: [
        {
          q: "یک پروژه وب چقدر طول می‌کشد؟", a: "یک وب‌سایت شرکتی استاندارد: ۳ تا ۵ هفته. پلتفرم‌های پیچیده: ۸ تا ۱۶ هفته. در جلسه اسکوپ زمان دقیق را اعلام می‌کنیم.", }, {
          q: "با کسب‌وکارهای کوچک هم کار می‌کنید؟", a: "با کسب‌وکارهایی که آماده سرمایه‌گذاری در نتایج حرفه‌ای هستند کار می‌کنیم, کوچک یا بزرگ. اگر پروژه واقعی و بودجه واقعی دارید، می‌خواهیم بشنویم.", }, {
          q: "مدل قیمت‌گذاری چیست؟", a: "قیمت ثابت برای محدوده‌های تعریف‌شده؛ رتینر ماهانه برای توسعه و پشتیبانی مداوم. بعد از جلسه کشف پیشنهاد دقیق ارسال می‌کنیم.", }, {
          q: "کد متعلق به کیست؟", a: "به شما. همیشه. ریپو کامل، اعتبارنامه‌ها و مستندات را در پایان پروژه تحویل می‌دهیم.", }, {
          q: "آیا از فارسی و RTL پشتیبانی می‌کنید؟", a: "به صورت بومی. هر محصولی که می‌سازیم از ابتدا از فارسی/عربی RTL و انگلیسی LTR پشتیبانی می‌کند.", }, ], }, finalCta: {
      eyebrow: "// آماده‌اید؟", title: "بیایید چیزی واقعی بسازیم.", subtitle:
        "درباره پروژه‌تان بگویید. در یک روز کاری پاسخ می‌دهیم.", ctaPrimary: "شروع پروژه", ctaSecondary: "سوال بپرسید", }, home: {
      services: {
        eyebrow: "خدمات ما", title: "اولین دیتا چه کارهایی برای شما انجام می‌دهد؟", subtitle:
          "هر کارت یک خدمت است. روی آن بزنید تا توضیح ساده و قابل‌فهم ببینید, بدون اصطلاحات فنی.", hint: "روی هر باکس بزنید تا جزئیات همان خدمت را ببینید.", moreLabel: "ببین چطور کار می‌کنه", allLink: "مشاهده همه خدمات", items: [
          {
            slug: "web-design", title: "ساخت وب‌سایت", desc: "یک سایت حرفه‌ای تا مشتریان شما را آنلاین پیدا کنند و با شما تماس بگیرند.", }, {
            slug: "ecommerce", title: "فروشگاه اینترنتی", desc: "فروش محصول در اینترنت با پرداخت امن و مدیریت آسان سفارش‌ها.", }, {
            slug: "android", title: "اپلیکیشن اندروید", desc: "برنامه موبایل برای گوشی‌های اندروید, برای مشتری یا کارکنان شما.", }, {
            slug: "ios", title: "اپلیکیشن آیفون", desc: "برنامه برای کاربران آیفون و iPad، با انتشار در App Store.", }, {
            slug: "ui-ux", title: "طراحی و سادگی استفاده", desc: "سایت یا اپ شما را زیبا، مرتب و برای همه قابل‌استفاده می‌کنیم.", }, {
            slug: "seo", title: "دیده شدن در گوگل", desc: "وقتی مردم در گوگل جستجو می‌کنند، راحت‌تر شما را پیدا کنند.", }, {
            slug: "consulting", title: "مشاوره رایگان", desc: "نمی‌دانید از کجا شروع کنید؟ گزینه‌ها را به زبان ساده توضیح می‌دهیم.", }, {
            slug: "support", title: "پشتیبانی بعد از تحویل", desc: "بعد از راه‌اندازی هم کنار شما می‌مانیم, به‌روزرسانی و رفع مشکل.", }, ], }, products: {
        eyebrow: "محصولات ما", title: "محصولات دیجیتالی که برای شما می‌سازیم", subtitle:
          "فراتر از یک سایت ساده, پلتفرم و ابزار کامل برای مدیریت کسب‌وکار آنلاین و روی دستگاه‌ها.", hint: "روی هر باکس بزنید تا ببینید هر نوع محصول شامل چه چیزهایی است.", moreLabel: "→ جزئیات", allLink: "مشاهده همه محصولات", items: [
          {
            slug: "web", title: "وب‌اپ و پورتال", desc: "پنل مدیریت، پورتال مشتری و ابزار آنلاینی که تیم شما هر روز از آن استفاده می‌کند.", }, {
            slug: "mobile", title: "اپلیکیشن موبایل", desc: "برنامه برای آیفون و اندروید, برای مشتری یا کارکنان، با به‌روزرسانی و پشتیبانی.", }, {
            slug: "windows", title: "نرم‌افزار ویندوز", desc: "برنامه دسکتاپ برای کامپیوترهای اداری, سریع، پایدار و نصب آسان.", }, {
            slug: "ai", title: "هوش مصنوعی", desc: "جستجو، چت‌بات و خودکارسازی برای صرفه‌جویی در وقت, با طراحی امن داخل محصول شما.", }, {
            slug: "platforms", title: "پلتفرم یکپارچه", desc: "وب‌سایت، اپ، پنل مدیریت و سرور به هم وصل, یک سیستم، یک ورود.", }, ], }, why: {
        eyebrow: "چرا اولین دیتا", title: "تیمی که می‌توانید روی آن حساب کنید", subtitle:
          "لازم نیست برنامه‌نویسی بلد باشید. همه چیز را ساده توضیح می‌دهیم و سر وقت تحویل می‌دهیم.", points: [
          {
            icon: "team", label: "همه کارها یک‌جا", text: "طراحی، سایت، اپ و پشتیبانی, با یک تیم، بدون دنبال کردن چند پیمانکار.", }, {
            icon: "calendar", label: "زمان تحویل مشخص", text: "از اول تاریخ تحویل را توافق می‌کنیم و هر هفته وضعیت را به شما می‌گوییم.", }, {
            icon: "key", label: "مالک پروژه خودتانید", text: "فایل‌ها و حساب‌ها برای شماست. قفل یا وابستگی پنهان وجود ندارد.", }, {
            icon: "message", label: "گزارش به زبان ساده", text: "پیشرفت کار را با کلمات روشن می‌گوییم, همیشه می‌دانید چه خبر است.", }, ], }, stats: {
        eyebrow: "چند عدد برای کنجکاوها", items: [
          {
            value: "150", suffix: "+", label: "پروژه تحویل‌شده", punchline: "سایت، اپ و ابزار واقعی, نه فقط پاورپوینت", }, {
            value: "24", suffix: "h", label: "اولین پاسخ معمول", punchline: "اغلب خیلی زودتر از این ☕", }, {
            value: "98", suffix: "%", label: "دوباره همکاری می‌کنند", punchline: "واقعاً می‌پرسیم, نظر ساختگی نداریم", }, {
            value: "0", label: "فاکتور غافلگیرکننده", punchline: "قیمت از اول مشخص. تمام.", }, {
            value: "100", suffix: "%", label: "مالکیت با شماست", punchline: "کد، طراحی و اکانت‌ها, همه مال شما", }, {
            value: "7", label: "روز تا شروع کار", punchline: "از امضای قرارداد تا اولین جلسه اجرا", }, ], }, start: {
        eyebrow: "هر وقت آماده بودید", title: "نیازتان را برایمان بنویسید", subtitle:
          "ایده‌تان را با زبان خودتان بگویید. در یک روز کاری پاسخ می‌دهیم, مشاوره رایگان است.", cta: "تماس با ما", responseNote: "معمولاً در روزهای کاری ظرف ۲۴ ساعت پاسخ داده می‌شود.", }, terminalIntro: {
        title: "ترمینال کوچک ما", subtitle:
          "اگر به فناوری علاقه دارید، می‌توانید دستور تایپ کنید. اگر نه، رد شوید,!! فقط برای سرگرمی است. 😂", }, }, auth: {
      login: {
        eyebrow: "> auth /login...", title: "ورود", subtitle: "با ایمیل و رمز عبور، یا OTP از طریق ایمیل یا پیامک وارد پنل شوید.", tabEmail: "ایمیل", tabOtp: "OTP", labelEmail: "ایمیل", labelPassword: "رمز عبور", labelOtp: "کد تأیید", otpChannelEmail: "OTP ایمیل", otpChannelSms: "OTP پیامک", labelPhone: "شماره موبایل", phonePlaceholder: "09123456789", otpSentEmail: "کد به ایمیل شما ارسال شد.", otpSentSms: "کد از طریق پیامک به موبایل شما ارسال شد.", submit: "ورود", sendOtp: "ارسال کد", verifyOtp: "تأیید و ورود", changeContact: "← تغییر اطلاعات تماس", loading: "لطفاً صبر کنید...", toRegister: "حساب ندارید؟ ثبت‌نام →", errorGeneric: "خطایی رخ داد. دوباره تلاش کنید.", forgotPassword: "رمز را فراموش کردید؟", labelTotp: "کد Authenticator", totpSubtitle: "کد ۶ رقمی اپ Authenticator را وارد کنید.", totpSubmit: "تأیید و ورود", totpBack: "← بازگشت به ورود", }, forgotPassword: {
        eyebrow: "> auth /forgot-password...", title: "بازیابی رمز", subtitle: "کد تأیید به ایمیل یا موبایل شما ارسال می‌شود.", tabEmail: "ایمیل", tabSms: "پیامک", labelEmail: "ایمیل", labelPhone: "شماره موبایل", phonePlaceholder: "09123456789", submit: "ارسال کد بازیابی", loading: "لطفاً صبر کنید...", sentEmail: "در صورت وجود حساب، کد به ایمیل ارسال شد.", sentSms: "در صورت وجود حساب، کد از طریق پیامک ارسال شد.", continueReset: "ورود کد و رمز جدید →", changeContact: "← تغییر اطلاعات تماس", toLogin: "بازگشت به ورود", errorGeneric: "خطایی رخ داد. دوباره تلاش کنید.", }, resetPassword: {
        eyebrow: "> auth /reset-password...", title: "رمز جدید", subtitle: "کد ارسال‌شده و رمز جدید را وارد کنید.", labelEmail: "ایمیل", labelPhone: "شماره موبایل", phonePlaceholder: "09123456789", labelCode: "کد تأیید", labelPassword: "رمز جدید", labelConfirm: "تکرار رمز", submit: "به‌روزرسانی رمز", loading: "لطفاً صبر کنید...", passwordMismatch: "رمزها یکسان نیستند.", resendCode: "ارسال مجدد کد", toLogin: "بازگشت به ورود", errorGeneric: "خطایی رخ داد. دوباره تلاش کنید.", }, register: {
        eyebrow: "> auth /register...", title: "ثبت‌نام", subtitle: "با ایمیل و رمز عبور، یا OTP از طریق ایمیل یا پیامک ثبت‌نام کنید.", tabEmail: "ایمیل", tabOtp: "OTP", labelName: "نام کامل", labelEmail: "ایمیل", labelPassword: "رمز عبور (حداقل ۸ کاراکتر)", labelConfirm: "تکرار رمز عبور", labelOtp: "کد تأیید", otpChannelEmail: "OTP ایمیل", otpChannelSms: "OTP پیامک", labelPhone: "شماره موبایل", phonePlaceholder: "09123456789", otpSentEmail: "کد به ایمیل شما ارسال شد.", otpSentSms: "کد از طریق پیامک به موبایل شما ارسال شد.", submit: "ایجاد حساب", sendOtp: "ارسال کد", verifyOtp: "تأیید و ثبت‌نام", changeContact: "← ویرایش اطلاعات", loading: "لطفاً صبر کنید...", toLogin: "حساب دارید؟ ورود →", errorGeneric: "خطایی رخ داد. دوباره تلاش کنید.", errorPasswordMatch: "رمز عبور و تکرار آن یکسان نیست.", }, panel: {
        welcome: "خوش آمدید", signedInAs: "وارد شده به عنوان", logout: "خروج", loggingOut: "در حال خروج...", noPasswordHint: "با OTP ثبت‌نام کردید. در تنظیمات حساب می‌توانید رمز تعیین کنید.", statusLabel: "وضعیت نشست", statusValue: "OPERATIONAL [OK]", linkServices: "مشاهده خدمات", linkPortfolio: "مشاهده نمونه‌کارها", linkContact: "تماس با پشتیبانی", }, }, errors: {
      pages: {
        notFound: {
          eyebrow: "> خطای ۴۰۴, مسیر پیدا نشد", title: "صفحه پیدا نشد", subtitle: "صفحه‌ای که دنبالش بودید وجود ندارد یا جابه‌جا شده. از مسیرهای زیر ادامه بدهید.", art: `┌──────────────────────────────┐
│  ۴ ۰ ۴, NOT FOUND       │
│  ──────────────────────────  │
│  مسیر درخواستی روی این       │
│  سرور وجود ندارد.            │
└──────────────────────────────┘`, prompt: "root@fd:~$ cd /", ctaHome: "بازگشت به خانه", ctaContact: "تماس با ما", }, forbidden: {
          eyebrow: "> خطای ۴۰۳, دسترسی ممنوع", title: "دسترسی مجاز نیست", subtitle: "اجازه مشاهده این بخش را ندارید. اگر فکر می‌کنید اشتباه است با پشتیبانی تماس بگیرید.", art: `┌──────────────────────────────┐
│  ۴ ۰ ۳, EACCES           │
│  ──────────────────────────  │
│  سطح دسترسی کافی نیست.       │
└──────────────────────────────┘`, prompt: "root@fd:~$ sudo ???", ctaHome: "بازگشت به خانه", ctaContact: "تماس با پشتیبانی", }, maintenance: {
          eyebrow: "> خطای ۵۰۳, در دسترس نیست", title: "در حال نگهداری", subtitle: "در حال به‌روزرسانی سیستم هستیم. به‌زودی برمی‌گردیم.", art: `┌──────────────────────────────┐
│  ۵ ۰ ۳, MAINTENANCE     │
│  ──────────────────────────  │
│  سیستم در حال ارتقاست.       │
└──────────────────────────────┘`, prompt: "root@fd:~$ systemctl status fd", ctaHome: "صفحه اصلی", ctaContact: "تماس با ما", ctaRetry: "تلاش دوباره", }, sessionExpired: {
          eyebrow: "> خطای ۴۰۱, نشست منقضی شد", title: "نشست منقضی شده", subtitle: "ورود شما منقضی شده. برای ادامه دوباره وارد شوید.", art: `┌──────────────────────────────┐
│  ۴ ۰ ۱, SESSION END      │
│  ──────────────────────────  │
│  توکن نامعتبر یا منقضی.      │
└──────────────────────────────┘`, prompt: "auth@fd:~$ login --refresh", ctaHome: "صفحه اصلی", ctaContact: "تماس با ما", ctaLogin: "ورود مجدد", }, offline: {
          eyebrow: "> خطا, شبکه در دسترس نیست", title: "آفلاین هستید", subtitle: "اتصال اینترنت برقرار نیست. بعد از اتصال دوباره تلاش کنید.", art: `┌──────────────────────────────┐
│  NET, ERR,OFFLINE        │
│  ──────────────────────────  │
│  firstdata.ir در دسترس نیست  │
└──────────────────────────────┘`, prompt: "root@fd:~$ ping firstdata.ir", ctaHome: "بازگشت به خانه", ctaContact: "تماس با ما", ctaRetry: "تلاش دوباره", }, server: {
          eyebrow: "> پردازه غیرمنتظره متوقف شد", title: "مشکل موقت سرور", subtitle:
            "خطایی از سمت ما رخ داد. دوباره تلاش کنید یا برگردید, جزئیات ثبت شده است.", prompt: "root@fd:~$ ./retry.sh --safe", ctaHome: "صفحه اصلی", ctaContact: "تماس با ما", ctaRetry: "تلاش دوباره", }, global: {
          eyebrow: "> خطای بحرانی, layout از دسترس خارج شد", title: "یک خطای عمیق رخ داد", subtitle:
            "پوسته صفحه قبل از بازیابی از کار افتاد. رفرش کنید یا به خانه برگردید, داده‌های شما امن است.", prompt: "root@fd:~$ systemctl restart first-data", ctaHome: "صفحه اصلی", ctaContact: "تماس با ما", ctaRetry: "بارگذاری مجدد", }, }, auth: {
        INVALID_CREDENTIALS: "ایمیل یا رمز عبور اشتباه است.", INVALID_OTP: "کد تأیید نامعتبر یا منقضی شده.", ACCOUNT_NOT_FOUND: "حسابی با این ایمیل یافت نشد.", ACCOUNT_NOT_FOUND_PHONE: "حسابی با این شماره موبایل یافت نشد.", EMAIL_ALREADY_EXISTS: "این ایمیل قبلاً ثبت شده.", PHONE_ALREADY_EXISTS: "این شماره موبایل قبلاً ثبت شده.", RATE_LIMIT: "درخواست‌های زیاد. بعداً تلاش کنید.", VALIDATION: "ورودی را بررسی کنید.", SERVER: "خطایی رخ داد. دوباره تلاش کنید.", LOGOUT_FAILED: "خروج انجام نشد.", SESSION_FAILED: "بررسی نشست ناموفق بود.", OTP_SEND_FAILED: "ارسال کد تأیید ناموفق بود.", }, contact: {
        nameRequired: "نام الزامی است.", emailRequired: "ایمیل الزامی است.", emailInvalid: "ایمیل معتبر وارد کنید.", messageRequired: "پیام الزامی است.", messageMin: "پیام باید حداقل ۱۰ کاراکتر باشد.", networkError: "خطای شبکه. اتصال را بررسی کنید.", }, projectRequest: {
        nameRequired: "نام و نام خانوادگی الزامی است.", emailRequired: "ایمیل الزامی است.", emailInvalid: "ایمیل معتبر وارد کنید.", phoneRequired: "شماره تماس الزامی است.", phoneInvalid: "شماره تماس معتبر وارد کنید.", projectTypeRequired: "حداقل یک نوع پروژه را انتخاب کنید.", budgetRequired: "بودجه تقریبی را انتخاب کنید.", timelineRequired: "زمان مورد انتظار را انتخاب کنید.", descriptionRequired: "توضیحات پروژه الزامی است.", descriptionMin: "توضیحات باید حداقل ۱۰ کاراکتر باشد.", networkError: "خطای شبکه. اتصال را بررسی کنید.", }, consultationRequest: {
        nameRequired: "نام الزامی است.", phoneRequired: "شماره تماس الزامی است.", phoneInvalid: "شماره تماس معتبر وارد کنید.", contactMethodRequired: "روش ارتباط را انتخاب کنید.", emailRequired: "وقتی روش ارتباط ایمیل است، وارد کردن ایمیل الزامی است.", emailInvalid: "ایمیل معتبر وارد کنید.", contactTimeRequired: "بهترین زمان تماس را انتخاب کنید.", networkError: "خطای شبکه. اتصال را بررسی کنید.", }, collaborateRequest: {
        networkError: "خطای شبکه. اتصال را بررسی کنید.", hiring: {
          nameRequired: "نام الزامی است.", resumeRequired: "فایل رزومه الزامی است.", urlInvalid: "آدرس معتبر با http:// یا https:// وارد کنید", skillsRequired: "مهارت‌ها الزامی است.", salaryRequired: "حقوق مورد انتظار الزامی است.", workModeRequired: "نحوه همکاری را انتخاب کنید.", }, freelancer: {
          nameRequired: "نام الزامی است.", phoneRequired: "شماره تماس الزامی است.", phoneInvalid: "شماره تماس معتبر وارد کنید.", specialtyRequired: "حداقل یک تخصص را انتخاب کنید.", portfolioRequired: "فایل نمونه‌کار الزامی است.", }, }, inline: {
        offlineBanner: "آفلاین هستید, برخی قابلیت‌ها کار نمی‌کنند.", offlinePage: "جزئیات", retry: "تلاش دوباره", chunkLoad: "نسخه جدید موجود است. برای به‌روزرسانی رفرش کنید.", }, offlineUi: {
        windowTitle: "fd.net, اتصال", tabTitle: "bash, fd.net", codeLabel: "ERR,OFFLINE", statusNet: "شبکه", statusDns: "DNS", statusCache: "کش", statusOffline: "آفلاین", statusUnavailable: "ناموجود", statusAvailable: "موجود", terminalLines: [
          "$ ping firstdata.ir -c 4", "PING firstdata.ir (185.143.223.100): 56 data bytes", "Request timeout for icmp_seq 0", "Request timeout for icmp_seq 1", "Request timeout for icmp_seq 2", "Request timeout for icmp_seq 3", "--- firstdata.ir ping statistics ---", "4 packets transmitted, 0 received, 100% packet loss", ], checklistTitle: "تا زمان اتصال", checklist: [
          "اتصال Wi‑Fi یا داده موبایل را بررسی کنید", "شبکه دیگر امتحان کنید یا VPN را خاموش کنید", "بعد از اتصال، این صفحه را دوباره بارگذاری کنید", ], onlineRestored: "اتصال برقرار شد, می‌توانید دوباره تلاش کنید.", lastSync: "آخرین همگام‌سازی موفق: نامشخص (آفلاین)", }, network: {
        failed: "اتصال برقرار نشد.", timeout: "زمان درخواست تمام شد.", badGateway: "سرور موقتاً در دسترس نیست.", malformed: "پاسخ سرور نامعتبر بود.", }, }, contact: {
      eyebrow: "// تماس", title: "تماس با اولین دیتا", subtitle:
        "فرم را پر کنید یا مستقیماً با ما در ارتباط باشید. بدون فروش اجباری، فقط یک مکالمه.", labelName: "نام", labelEmail: "ایمیل", labelPhone: "تلفن (اختیاری)", labelService: "خدمات مورد نیاز", labelMessage: "درباره پروژه‌تان بگویید", labelSubmit: "ارسال پیام", submitting: "در حال ارسال...", serviceOptions: [
        "طراحی و توسعه وب‌سایت", "اپلیکیشن اندروید", "اپلیکیشن iOS", "نرم‌افزار ویندوز", "سئو و بهینه‌سازی", "طراحی UI/UX", "فروشگاه اینترنتی", "پشتیبانی و نگهداری", "سایر", ], success: "> پیام ارسال شد. در یک روز کاری پاسخ می‌دهیم.", directEmail: "info@firstdata.ir", directPhone: "‎+۹۸ ۹۳۳ ۱۲۷ ۴۰۳۹", directAddress: "شیراز - بلوار سرباز - خیابان ایثارگران کوچه ۳", orDirect: "یا مستقیماً با ما تماس بگیرید:", }, projectRequest: {
      sectionBasic: "اطلاعات اولیه", sectionType: "نوع پروژه", sectionBudget: "بودجه تقریبی", sectionTimeline: "زمان مورد انتظار", sectionDescription: "توضیحات پروژه", sectionFiles: "فایل", labelName: "نام و نام خانوادگی", labelEmail: "ایمیل", labelPhone: "شماره تماس", labelCompany: "نام شرکت", labelCompanyOptional: "اختیاری", labelDescription: "اهداف، امکانات و محدودیت‌های پروژه را بنویسید…", labelUpload: "آپلود", removeFile: "حذف فایل", filesHint: "وایرفریم، PDF، نمونه سایت، لوگو یا فایل برند (حداکثر ۵ فایل، هر کدام ۱۰ مگابایت).", labelSubmit: "ارسال درخواست", submitting: "در حال ارسال…", success: "> درخواست شما ثبت شد. ظرف یک روز کاری بررسی و پاسخ می‌دهیم.", sendAnother: "ارسال درخواست دیگر", projectTypes: {
        web: "طراحی وب‌سایت", ecommerce: "فروشگاه اینترنتی", android: "اپلیکیشن اندروید", ios: "اپلیکیشن iOS", windows: "نرم‌افزار ویندوز", seo: "سئو", support: "پشتیبانی", custom: "محصول اختصاصی", }, budgets: {
        under_30m: "کمتر از ۳۰ میلیون", "30_70m": "۳۰ تا ۷۰ میلیون", "70_150m": "۷۰ تا ۱۵۰ میلیون", over_150m: "بیشتر", unknown: "هنوز مشخص نیست", }, timelines: {
        urgent: "فوری", one_month: "یک ماه", two_three_months: "دو تا سه ماه", flexible: "منعطف", }, }, consultationRequest: {
      sectionContactMethod: "روش ارتباط", sectionContactTime: "بهترین زمان تماس", labelName: "نام", labelPhone: "تلفن", labelEmail: "ایمیل", labelEmailOptional: "اختیاری (اگر روش ارتباط ایمیل است، الزامی)", labelSubmit: "درخواست مشاوره", submitting: "در حال ارسال…", success: "> درخواست مشاوره ثبت شد. در زمان انتخابی با شما تماس می‌گیریم.", sendAnother: "درخواست مشاوره دیگر", contactMethods: {
        call: "تماس", whatsapp: "واتساپ", telegram: "تلگرام", email: "ایمیل", }, contactTimes: {
        morning: "صبح", noon: "ظهر", afternoon: "عصر", }, }, collaborateRequest: {
      branchToggleLabel: "نوع درخواست", branches: {
        hiring: "استخدام", freelancer: "همکاری پروژه‌ای", }, labelSubmit: "ارسال درخواست", submitting: "در حال ارسال…", success: "> درخواست شما ثبت شد. پروفایل شما بررسی و نتیجه اعلام می‌شود.", sendAnother: "ارسال درخواست دیگر", hiring: {
        sectionBasic: "اطلاعات اولیه", sectionResume: "رزومه", sectionLinks: "لینک‌ها", sectionDetails: "مهارت و حقوق", sectionWorkMode: "نحوه همکاری", labelName: "نام", labelGithub: "گیت‌هاب", labelLinkedin: "لینکدین", labelPortfolioUrl: "نمونه کار (لینک)", labelSkills: "مهارت‌ها", labelSalary: "حقوق مورد انتظار", labelUploadResume: "آپلود رزومه", resumeHint: "ترجیحاً PDF یا DOC (حداکثر ۱۰ مگابایت).", workModes: {
          onsite: "حضوری", remote: "دورکار", }, }, freelancer: {
        sectionBasic: "اطلاعات اولیه", sectionSpecialty: "تخصص", sectionPortfolio: "نمونه کار", sectionResume: "رزومه (اختیاری)", labelName: "نام", labelPhone: "شماره تماس", labelUploadPortfolio: "آپلود نمونه کار", labelUploadResume: "آپلود رزومه", portfolioHint: "نمونه کار، PDF یا فایل فشرده (حداکثر ۱۰ مگابایت).", resumeHint: "اختیاری — PDF یا DOC (حداکثر ۱۰ مگابایت).", specialties: {
          ui_designer: "طراح UI", react_dev: "برنامه‌نویس React", flutter: "Flutter", python: "Python", seo: "سئو", content: "تولید محتوا", }, }, }, footer: {
      tagline: "// مهندسی‌شده برای تحویل. ساخته‌شده برای ماندگاری.", rights: "// اولین دیتا, ۱۴۰۵. تمام حقوق محفوظ است.", copyrightBrand: "اولین دیتا", copyrightSuffix: "تمام حقوق محفوظ است.", changelogAria: "باز کردن فهرست تغییرات نسخه", changelogTitle: "فهرست تغییرات", changelogClose: "بستن", linkTerms: "قوانین", linkServices: "خدمات", linkContact: "تماس", stack: "Next.js /// React /// TypeScript /// Tailwind", brand: ">اولین دیتا", social: {
        instagram: "اینستاگرام", linkedin: "لینکدین", facebook: "فیس‌بوک", telegram: "تلگرام", }, }, terms: {
      eyebrow: "// قوانین", title: "شرایط استفاده", subtitle:
        "قوانین استفاده از وب‌سایت اولین دیتا، محتوای منتشرشده و نسخه نرم‌افزاری که روی این دامنه نمایش داده می‌شود.", rules: [
        {
          title: "پذیرش شرایط", body: "با بازدید از firstdata.ir این قوانین را می‌پذیرید. در صورت عدم موافقت، لطفاً از ادامه استفاده خودداری کنید.", }, {
          title: "محتوا و مالکیت فکری", body: "متن، تصاویر، نمونه کد و برندینگ این سایت متعلق به اولین دیتا است مگر خلاف آن ذکر شده باشد. بدون مجوز کتبی حق بازنشر یا کپی ندارید.", }, {
          title: "تماس و ارسال اطلاعات", body: "اطلاعاتی که از طریق فرم‌ها ارسال می‌کنید باید صحیح باشد. ما آن را فقط برای پاسخ به درخواست و بهبود خدمات، مطابق قوانین حریم خصوصی، استفاده می‌کنیم.", }, {
          title: "نسخه و changelog", body: "نسخه فعلی سایت در فوتر نمایش داده می‌شود. با کلیک روی شماره نسخه، فهرست تغییرات هر انتشار باز می‌شود. پس از هر به‌روزرسانی معنادار، این فهرست به‌روز می‌شود.", }, {
          title: "دسترسی به سایت", body: "تلاش می‌کنیم سایت پایدار باشد، اما دسترسی بدون وقفه تضمین نمی‌شود. نگهداری یا به‌روزرسانی ممکن است به‌طور موقت دسترسی را محدود کند.", }, {
          title: "تغییر قوانین", body: "ممکن است این قوانین یا نسخه سایت را تغییر دهیم. ادامه استفاده پس از به‌روزرسانی به‌منزله پذیرش قوانین و changelog جاری است.", }, ], changelogTitle: "تاریخچه نسخه‌ها", changelogIntro: "هر نسخه منتشرشده و تغییرات قابل مشاهده آن در اینجا فهرست شده است.", versionNote: "نسخه فعلی در فوتر سایت نمایش داده می‌شود. هر زمان می‌توانید روی آن کلیک کنید تا این فهرست دوباره باز شود.", }, consent: {
      message: "برای بهبود سایت از کوکی‌های تحلیلی (Google Analytics) استفاده می‌کنیم. پذیرش یا رد, انتخاب با شماست.", accept: "پذیرش", reject: "رد", }, pwa: {
      installTitle: "نصب اولین دیتا", installBody: "اپ را به صفحه اصلی اضافه کنید, دسترسی سریع‌تر و پشتیبانی آفلاین.", installAction: "نصب اپ", installDismiss: "فعلاً نه", installSuccess: "اپ نصب شد, خوش آمدید.", pushTitle: "فعال‌سازی اعلان‌ها", pushBody: "از انتشار نسخه‌ها، مقالات وبلاگ و وضعیت سایت باخبر شوید.", pushAction: "فعال‌سازی", pushDismiss: "نه، ممنون", pushSuccess: "اعلان‌ها فعال شد.", pushDenied: "اعلان‌ها در تنظیمات مرورگر مسدود شده‌اند.", pushUnsupported: "اعلان push روی این دستگاه پشتیبانی نمی‌شود.", installedBadge: "PWA, نصب‌شده", }, preloader: {
      corner: "SYS,INIT v1.0.0", welcome: "به اولین دیتا خوش آمدید", deploying: "در حال استقرار", bottom: "FIRSTDATA.IR", lines: [
        { text: "> در حال نصب رانتایم.............. [ موفق ]", tone: "ok", gap: 1200 }, { text: "> بارگذاری ماژول‌های خدمات [۱/۸..۸/۸].. [ موفق ]", tone: "ok", gap: 100 }, { text: "> مذاکرهٔ دست‌دادن TLS.....", tone: "ok", gap: 100 }, { text: "> [ خطا ]", tone: "error", gap: 300 }, { text: "> [ خطا ]", tone: "error", gap: 100 }, { text: "> [ خطا ]", tone: "error", gap: 100 }, { text: "> [ خطا ]", tone: "error", gap: 100 }, { text: "> [ خطا ]", tone: "error", gap: 100 }, { text: "> [اولین‌دیتا]: ۱۱ خطا در سیستم شما شناسایی شد.", tone: "accent", gap: 300 }, { text: "> [اولین‌دیتا]: تنظیم موتور تحویل.....", tone: "accent", gap: 100 }, { text: "> [اولین‌دیتا]: پیکربندی لایه‌های وب + موبایل + دسکتاپ.....", tone: "accent", gap: 100 }, { text: "> [اولین‌دیتا]: آماده‌باش...", tone: "wait", gap: 100 }, { text: "> [اولین‌دیتا]: راه‌حل کامپایل شد. در حال ارسال.....", tone: "success", gap: 100 }, { text: "> ۰ خطا  ۰ هشدار  [ موفق ]", tone: "success", gap: 1000 }, { text: "> همهٔ سیستم‌ها عادی. وضعیت: آماده", tone: "success", gap: 120 }, ], }, navPreloader: {
      prompt: "root@fd:~$", loading: (path) => `> بارگذاری ${path}...`, steps: [
        "▸ resolve مسیر …", "▸ fetch محتوا …", "▸ render صفحه …", ], }, terminal: {
      title: "ترمینال اولین دیتا نسخه ۱.۰.۰", hint: "برای دیدن فرمان‌ها «راهنما» را تایپ کنید.", prompt: "اولین‌دیتا:~$ ", tabTitle: "اولین‌دیتا ~ تعاملی", clearCmd: "پاک", whoamiCmd: "من‌کیستم", placeholder: "یک فرمان تایپ کنید...", notFound: (cmd) => `فرمان یافت نشد: ${cmd}. «راهنما» را تایپ کنید.`, whoamiLines: (d) => [
        "اسکن هویت:", `  آی‌پی:        ${d.ip}`, `  سیستم‌عامل:   ${d.os}`, `  مرورگر:       ${d.browser}`, `  دستگاه:       ${d.device}`, `  صفحه:         ${d.screen}`, `  ویوپورت:      ${d.viewport}`, `  زبان:         ${d.language}`, `  منطقهٔ زمانی:  ${d.timezone}`, `  هسته‌ها:       ${d.cores}`, "[ اسکن کامل شد ]", ], commands: {
        "راهنما": [
          "فرمان‌های موجود:", "  راهنما   , نمایش این فهرست", "  خدمات    , فهرست هر ۸ خدمت", "  آمار     , آمار رانتایم", "  رندر     , اجرای اولین‌دیتا.رانتایم", "  من‌کیستم , اسکن دستگاه + آی‌پی شما", "  شماکیستید, دربارهٔ اولین دیتا", "  نسخه     , نسخهٔ رانتایم", "  پاک      , پاک‌کردن ترمینال", ], "خدمات": [
          "اولین دیتا, خدمات بارگذاری‌شده:", "  ۰۱  طراحی و توسعه وب‌سایت", "  ۰۲  توسعه اپلیکیشن اندروید", "  ۰۳  توسعه اپلیکیشن iOS", "  ۰۴  نرم‌افزار ویندوز و دسکتاپ", "  ۰۵  سئو و بهینه‌سازی عملکرد", "  ۰۶  طراحی UI/UX", "  ۰۷  فروشگاه اینترنتی و تجارت الکترونیک", "  ۰۸  پشتیبانی و توسعه مداوم", "  وضعیت: عملیاتی [موفق]", ], "آمار": [
          "آمار اولین‌دیتا.رانتایم:", "  مشتری:     کسب‌وکارهای متنوع", "  خدمات:     ۸", "  پروژه‌ها:   ۱۵۰+", "  آپ‌تایم:    ۹۹.۹٪ SLA", "  کنتراست:   ۲۱:۱ [WCAG AAA]", "  پشته:      هر زبان و فریم‌ورک", "  وضعیت:     عملیاتی [موفق]", ], "رندر": [
          "در حال راه‌اندازی اولین‌دیتا.رانتایم...", "بارگذاری پشتهٔ خدمات [۱/۸..۸/۸]", "سوارکردن موتور تحویل ....... [موفق]", "کالیبراسیون لایهٔ کیفیت ....... [موفق]", "وضعیت ساخت: ارسال‌شده [موفق]", "رانتایم: عملیاتی", ], "شماکیستید": [
          "اولین دیتا, ما که هستیم:", "  شرکت:     اولین دیتا", "  شعار:     ما می‌سازیم. شما رشد می‌کنید.", "  مأموریت:  ساختن محصولات دیجیتال که", "            نتایج واقعی کسب‌وکاری ایجاد کنند.", "  خدمات:    وب، اندروید، iOS، دسکتاپ، سئو، UX", "  تماس:     info@firstdata.ir", "  تلفن:     ‎+۹۸ ۹۳۳ ۱۲۷ ۴۰۳۹", "  وضعیت:    عملیاتی [موفق]", ], "نسخه": [
          "اولین‌دیتا.رانتایم نسخه ۱.۰.۰", "رانتایم: Next.js / React 18", "ساخت: تولید [استاتیک]", "تماس: info@firstdata.ir", ], }, }, marquee: [
      "طراحی وب", "اندروید", "iOS", "ویندوز", "سئو", "UI/UX", "فروشگاه", "پشتیبانی", "ری‌اکت", "نکست‌جی‌اس", "سوئیفت", "کاتلین", "لاراول", "نود", "تایپ‌اسکریپت", "فیگما", ], }, };

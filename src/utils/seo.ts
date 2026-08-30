export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

export const PAGE_SEO_DATA: Record<string, PageSEO> = {
  home: {
    title: 'SANKET | AI-Driven Social Media Analytics Framework - SIH 2026 #26152',
    description: 'SANKET (Social Analytics & Network Knowledge Extraction Technology) is an AI framework prototype developed for SIH 2026 Problem Statement #26152 (NTRO) for continuous multi-platform ingestion, Indic NLP sentiment inference, demographic profiling, and network topology analysis.',
    keywords: 'SANKET, SIH 2026, Problem Statement 26152, NTRO, social media analytics, sentiment analysis, Hinglish NLP, network topology, threat detection, DPDP Act 2023, cyber intelligence',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDadJtV_zVpm8MRWZAIs1UOLFdjQCDAQfXRzhHtDzN8gpHiRkmatv1i7_HXPFM_sH0cZewR4n5bBDqLbC6gNHlMFhdO8XRGQ20Ivexl-YDGaUv5SKVH5i7IO0SKr7kzL90Ri090fsWKedfz9lObDeqTpt4Aap6z0V-Dx9EK9Tqyqiyitg7Z-aITUi0DWU7MIM42pz4QMO-KBXC_REroPSsrIVGDvwjA9vv44q0wIAfXYgqU3ZmISH7z_Q'
  },
  about: {
    title: 'Problem Statement #26152 Dossier | SANKET - SIH 2026',
    description: 'Comprehensive specification of SIH 2026 Problem Statement #26152 for NTRO: AI-driven multi-modal social media analytics, transformer NLP pipelines, and DPDP Act 2023 compliance.',
    keywords: 'SIH 2026, NTRO Problem Statement 26152, Five-Component Framework, Data Collection, Sentiment Inference, Demographics, Trend Forecasting, Link Analysis',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmTmgYlDlvlXpzjlGUGrhDjU1phsLY9XCUdsV3oy6QRzMnj-SY_JXp9hE7Ehlju8mAHwBQLJL9t3dG3wSlrwXowqzKPiaOXZSyeHIaHJnEjliLXxWG4wchNJw955fbpwa0asOnF-ANo9dAlG-19G7wGCMcdfL41uoqCfQVkDNzpRjFu7HGcUue3s75VHXMdt4rJHqGAqfuTWwPUdjXjW5yY4ze5ASTdLFrvP-_WqFAIpDQwCjRL9ZBPVsWm3qvV5LGv_w'
  },
  dashboards: {
    title: 'Operations Center & Intelligence Dashboards | SANKET',
    description: 'Live analytics command console featuring multi-dimensional sentiment analysis, Indic Hinglish sarcasm detection, demographic cohorts, trend forecasting, and force-directed network graphing.',
    keywords: 'SANKET Dashboard, IndicRoBERTa, Sarcasm Detection, Demographic Profiling, Viral Trends, Force Graph, Betweenness Centrality, Botnet Detection',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDadJtV_zVpm8MRWZAIs1UOLFdjQCDAQfXRzhHtDzN8gpHiRkmatv1i7_HXPFM_sH0cZewR4n5bBDqLbC6gNHlMFhdO8XRGQ20Ivexl-YDGaUv5SKVH5i7IO0SKr7kzL90Ri090fsWKedfz9lObDeqTpt4Aap6z0V-Dx9EK9Tqyqiyitg7Z-aITUi0DWU7MIM42pz4QMO-KBXC_REroPSsrIVGDvwjA9vv44q0wIAfXYgqU3ZmISH7z_Q'
  },
  architecture: {
    title: 'System Architecture & Distributed Pipeline | SANKET',
    description: 'Five-tier pipeline architecture: multi-platform ingestion APIs, Celery transformer workers, PostgreSQL with pgvector, FastAPI gateway, and responsive React console.',
    keywords: 'System Architecture, FastAPI, PostgreSQL pgvector, Celery Workers, Multi-Platform Ingestion, Distributed Streaming, Data Flow',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDadJtV_zVpm8MRWZAIs1UOLFdjQCDAQfXRzhHtDzN8gpHiRkmatv1i7_HXPFM_sH0cZewR4n5bBDqLbC6gNHlMFhdO8XRGQ20Ivexl-YDGaUv5SKVH5i7IO0SKr7kzL90Ri090fsWKedfz9lObDeqTpt4Aap6z0V-Dx9EK9Tqyqiyitg7Z-aITUi0DWU7MIM42pz4QMO-KBXC_REroPSsrIVGDvwjA9vv44q0wIAfXYgqU3ZmISH7z_Q'
  },
  reports: {
    title: 'Situation Reports & Analytic Dossiers (SITREP) | SANKET',
    description: 'Generate, preview, and export automated Situation Reports (SITREPs) with cryptographic verification and compliance audit certificates.',
    keywords: 'SITREP, Analytic Report, SIH 2026, Situation Report, Narrative Assessment',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUOganULH4yr2KV_rB63OGkh2A8zBTOkiTcNLo0ZAm40PHRe5ueS0_s3mC7ZJO_6eqFdP7ZQW_hoCqHaHC1PYpa2-EVwO0ZMyCCmq4-11vZNVtH4rFh4KT0J__T97Vth6WTiMkdiU166hOxO06hTv_jAj6oWkKdjzz6qcwpyuxhXzaAoyJzDe6i_hnE8TPYAvnGydFgwuu8cutGX4vcdxAFjprIMvGlFGDt9rAQjugDHvKanfBlIjdQ_5EyGQ4t7SjJXI'
  },
  knowledge: {
    title: 'Knowledge Hub & Model Cards | SANKET',
    description: 'Research documentation, Indic transformer model cards (sanket-indic-roberta-v3), graph centrality algorithms, and Smart India Hackathon 2026 evaluation criteria.',
    keywords: 'Knowledge Hub, Model Card, IndicRoBERTa, NetworkX, Evaluation Criteria, NLP Research',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFNVU64LZftn07wriZj1h6IS98I6itrIRBvfw0nD3qhRVhXx_MCFawJHwE_y18SVuR5q1zRf5n_GB3GW7dyxIMxsh2P4mjcq6enCUWy5dcyS165YXzFS4GFRZtY8yCGE7LdIctmWJYNlN6q9ioH7k3dKBMZg9J0gRsVQTSGPJGMYTAbFfMP0_tqS96mYnr-n86JqRV8gWsj04ifm8cxTqjDeVo9hb-iabNsvK2IbzI6MXCgrFjSi52-w'
  },
  resources: {
    title: 'Governance, DPDP Act 2023 & API Documentation | SANKET',
    description: 'Regulatory privacy frameworks, Differential Privacy guidelines (ISO 27701), data dictionary, and REST/WebSocket integration specifications.',
    keywords: 'DPDP Act 2023, ISO 27701, Differential Privacy, REST API, WebSocket Documentation, Data Dictionary, Compliance',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUOganULH4yr2KV_rB63OGkh2A8zBTOkiTcNLo0ZAm40PHRe5ueS0_s3mC7ZJO_6eqFdP7ZQW_hoCqHaHC1PYpa2-EVwO0ZMyCCmq4-11vZNVtH4rFh4KT0J__T97Vth6WTiMkdiU166hOxO06hTv_jAj6oWkKdjzz6qcwpyuxhXzaAoyJzDe6i_hnE8TPYAvnGydFgwuu8cutGX4vcdxAFjprIMvGlFGDt9rAQjugDHvKanfBlIjdQ_5EyGQ4t7SjJXI'
  },
  contact: {
    title: 'Contact & Hackathon Help Desk | SANKET',
    description: 'Directory for Smart India Hackathon 2026 queries and SANKET prototype project information.',
    keywords: 'Contact, SIH 2026, AICTE, Help Desk, Problem Statement 26152',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUOganULH4yr2KV_rB63OGkh2A8zBTOkiTcNLo0ZAm40PHRe5ueS0_s3mC7ZJO_6eqFdP7ZQW_hoCqHaHC1PYpa2-EVwO0ZMyCCmq4-11vZNVtH4rFh4KT0J__T97Vth6WTiMkdiU166hOxO06hTv_jAj6oWkKdjzz6qcwpyuxhXzaAoyJzDe6i_hnE8TPYAvnGydFgwuu8cutGX4vcdxAFjprIMvGlFGDt9rAQjugDHvKanfBlIjdQ_5EyGQ4t7SjJXI'
  },
  login: {
    title: 'Analyst Console Login | SANKET',
    description: 'Demo login portal for SANKET social media analytics prototype.',
    keywords: 'Login, Authentication, Demo Access, SANKET, Smart India Hackathon',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUOganULH4yr2KV_rB63OGkh2A8zBTOkiTcNLo0ZAm40PHRe5ueS0_s3mC7ZJO_6eqFdP7ZQW_hoCqHaHC1PYpa2-EVwO0ZMyCCmq4-11vZNVtH4rFh4KT0J__T97Vth6WTiMkdiU166hOxO06hTv_jAj6oWkKdjzz6qcwpyuxhXzaAoyJzDe6i_hnE8TPYAvnGydFgwuu8cutGX4vcdxAFjprIMvGlFGDt9rAQjugDHvKanfBlIjdQ_5EyGQ4t7SjJXI'
  }
};

export function updatePageSEO(pageId: string, subTab?: string) {
  const effectiveKey = (pageId === 'about' && subTab && PAGE_SEO_DATA[subTab]) ? subTab : pageId;
  const seo = PAGE_SEO_DATA[effectiveKey] || PAGE_SEO_DATA.about || PAGE_SEO_DATA.home;

  // Title
  document.title = seo.title;

  // Helper to set or create meta tag
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // Meta description and keywords
  setMeta('description', seo.description);
  setMeta('keywords', seo.keywords);

  // Open Graph
  setMeta('og:title', seo.title, true);
  setMeta('og:description', seo.description, true);
  setMeta('og:type', 'website', true);
  if (seo.ogImage) {
    setMeta('og:image', seo.ogImage, true);
  }

  // Twitter
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', seo.title);
  setMeta('twitter:description', seo.description);
  if (seo.ogImage) {
    setMeta('twitter:image', seo.ogImage);
  }
}

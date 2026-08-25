export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

export const PAGE_SEO_DATA: Record<string, PageSEO> = {
  home: {
    title: 'SANKET | AI-Driven Social Media Analytics & Intelligence Framework - NTRO SIH 2026',
    description: 'SANKET (Social Analytics & Network Knowledge Extraction Technology) is an AI framework developed for NTRO and SIH 2026 Problem Statement #26152 for continuous multi-platform ingestion, Indic NLP sentiment inference, demographic profiling, and network topology analysis.',
    keywords: 'SANKET, NTRO, SIH 2026, Problem Statement 26152, social media analytics, sentiment analysis, Hinglish NLP, network topology, threat detection, DPDP Act 2023, cyber intelligence',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDadJtV_zVpm8MRWZAIs1UOLFdjQCDAQfXRzhHtDzN8gpHiRkmatv1i7_HXPFM_sH0cZewR4n5bBDqLbC6gNHlMFhdO8XRGQ20Ivexl-YDGaUv5SKVH5i7IO0SKr7kzL90Ri090fsWKedfz9lObDeqTpt4Aap6z0V-Dx9EK9Tqyqiyitg7Z-aITUi0DWU7MIM42pz4QMO-KBXC_REroPSsrIVGDvwjA9vv44q0wIAfXYgqU3ZmISH7z_Q'
  },
  about: {
    title: 'Problem Statement #26152 Dossier | SANKET - NTRO SIH 2026',
    description: 'Comprehensive specification of SIH 2026 Problem Statement #26152 for NTRO: Sovereign AI-driven multi-modal social media analytics, transformer NLP pipelines, and DPDP Act 2023 compliance.',
    keywords: 'SIH 2026, NTRO Problem Statement 26152, Five-Component Framework, Data Collection, Sentiment Inference, Demographics, Trend Forecasting, Link Analysis',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmTmgYlDlvlXpzjlGUGrhDjU1phsLY9XCUdsV3oy6QRzMnj-SY_JXp9hE7Ehlju8mAHwBQLJL9t3dG3wSlrwXowqzKPiaOXZSyeHIaHJnEjliLXxWG4wchNJw955fbpwa0asOnF-ANo9dAlG-19G7wGCMcdfL41uoqCfQVkDNzpRjFu7HGcUue3s75VHXMdt4rJHqGAqfuTWwPUdjXjW5yY4ze5ASTdLFrvP-_WqFAIpDQwCjRL9ZBPVsWm3qvV5LGv_w'
  },
  dashboards: {
    title: 'Operations Center & Intelligence Dashboards | SANKET',
    description: 'Live analytics command console featuring multi-dimensional sentiment analysis, Indic Hinglish sarcasm detection, demographic cohorts, trend velocity forecasting, and force-directed network graphing.',
    keywords: 'SANKET Dashboard, IndicRoBERTa, Sarcasm Detection, Demographic Profiling, Viral Velocity, Force Graph, Betweenness Centrality, Botnet Detection',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDadJtV_zVpm8MRWZAIs1UOLFdjQCDAQfXRzhHtDzN8gpHiRkmatv1i7_HXPFM_sH0cZewR4n5bBDqLbC6gNHlMFhdO8XRGQ20Ivexl-YDGaUv5SKVH5i7IO0SKr7kzL90Ri090fsWKedfz9lObDeqTpt4Aap6z0V-Dx9EK9Tqyqiyitg7Z-aITUi0DWU7MIM42pz4QMO-KBXC_REroPSsrIVGDvwjA9vv44q0wIAfXYgqU3ZmISH7z_Q'
  },
  architecture: {
    title: 'System Architecture & Distributed Pipeline | SANKET',
    description: 'Five-tier production pipeline architecture: multi-platform ingestion APIs, Celery transformer workers, PostgreSQL with pgvector, FastAPI gateway, and responsive React console.',
    keywords: 'System Architecture, FastAPI, PostgreSQL pgvector, Celery Workers, Multi-Platform Ingestion, Distributed Streaming, Data Flow',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDadJtV_zVpm8MRWZAIs1UOLFdjQCDAQfXRzhHtDzN8gpHiRkmatv1i7_HXPFM_sH0cZewR4n5bBDqLbC6gNHlMFhdO8XRGQ20Ivexl-YDGaUv5SKVH5i7IO0SKr7kzL90Ri090fsWKedfz9lObDeqTpt4Aap6z0V-Dx9EK9Tqyqiyitg7Z-aITUi0DWU7MIM42pz4QMO-KBXC_REroPSsrIVGDvwjA9vv44q0wIAfXYgqU3ZmISH7z_Q'
  },
  reports: {
    title: 'Situation Reports & Strategic Dossiers (SITREP) | SANKET',
    description: 'Generate, preview, and dispatch automated Situation Reports (SITREPs) with cryptographic sovereign signing and compliance audit certificates for decision-makers.',
    keywords: 'SITREP, Intelligence Report, NTRO Directorate, Cryptographic Signing, Situation Report, Threat Assessment, Security Clearance',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUOganULH4yr2KV_rB63OGkh2A8zBTOkiTcNLo0ZAm40PHRe5ueS0_s3mC7ZJO_6eqFdP7ZQW_hoCqHaHC1PYpa2-EVwO0ZMyCCmq4-11vZNVtH4rFh4KT0J__T97Vth6WTiMkdiU166hOxO06hTv_jAj6oWkKdjzz6qcwpyuxhXzaAoyJzDe6i_hnE8TPYAvnGydFgwuu8cutGX4vcdxAFjprIMvGlFGDt9rAQjugDHvKanfBlIjdQ_5EyGQ4t7SjJXI'
  },
  knowledge: {
    title: 'Knowledge Hub & Model Cards | SANKET',
    description: 'Research documentation, Indic transformer model cards (sanket-indic-roberta-v3), graph centrality algorithms, and Smart India Hackathon 2026 evaluation criteria.',
    keywords: 'Knowledge Hub, Model Card, IndicRoBERTa, NetworkX, Rust Bindings, Evaluation Criteria, NLP Research',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFNVU64LZftn07wriZj1h6IS98I6itrIRBvfw0nD3qhRVhXx_MCFawJHwE_y18SVuR5q1zRf5n_GB3GW7dyxIMxsh2P4mjcq6enCUWy5dcyS165YXzFS4GFRZtY8yCGE7LdIctmWJYNlN6q9ioH7k3dKBMZg9J0gRsVQTSGPJGMYTAbFfMP0_tqS96mYnr-n86JqRV8gWsj04ifm8cxTqjDeVo9hb-iabNsvK2IbzI6MXCgrFjSi52-w'
  },
  resources: {
    title: 'Governance, DPDP Act 2023 & API Documentation | SANKET',
    description: 'Regulatory privacy frameworks, Differential Privacy guidelines (ISO 27701), data dictionary, and REST/WebSocket integration specifications.',
    keywords: 'DPDP Act 2023, ISO 27701, Differential Privacy, REST API, WebSocket Documentation, Data Dictionary, Compliance',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCinHWq_c24Urs-5wtiDmpW6QM0AqSsPSiF6-k8A9-bnngpJ5Ij-kfZ01TX0ftthiytehw_i6ZHy685KqBX57g8IKklqDhWg9LmBtarO_PDZghBrHRcCAYV9tZZO95qUHlWH2MI9tD_5mK2MJefWUnKEDgDgLUQwibkHTmlUL69baEsiFupyuVnm2Pf2mL2F9F7BurUsFO8_8Lz4d89BLP-c12YLWy1TEnCk1TnbmLFgz_iuS9Yx4_CmA'
  },
  contact: {
    title: 'Contact & Nodal Help Desk | SANKET',
    description: 'Institutional contact directory for NTRO Cyber Directorate and Smart India Hackathon 2026 Nodal Officers.',
    keywords: 'Contact, NTRO Cyber Cell, SIH 2026 Nodal Cell, AICTE, Help Desk, Technical Support',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCinHWq_c24Urs-5wtiDmpW6QM0AqSsPSiF6-k8A9-bnngpJ5Ij-kfZ01TX0ftthiytehw_i6ZHy685KqBX57g8IKklqDhWg9LmBtarO_PDZghBrHRcCAYV9tZZO95qUHlWH2MI9tD_5mK2MJefWUnKEDgDgLUQwibkHTmlUL69baEsiFupyuVnm2Pf2mL2F9F7BurUsFO8_8Lz4d89BLP-c12YLWy1TEnCk1TnbmLFgz_iuS9Yx4_CmA'
  },
  login: {
    title: 'Authorized Personnel Login | SANKET',
    description: 'Restricted sovereign access portal for authorized intelligence officers under the Information Technology Act, 2000.',
    keywords: 'Login, Authentication, Restricted Government Access, Official Secrets Act, Information Technology Act, Cyber Analyst',
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbeo3KCg537jnVXhpvhDw7mRU_Z3vgtH5gJZemghB4Ih3WmGCPAKEkAt2X_NeYoxRNisX33XO7pSD-EcQOYiH3hU3NLmvWwHx84b_kURmzvSkfK4q7tw3FIJqPQOjbQpcze35RPI4dDGgVZCRHzp8WjUvXZcTwnsz9zMk9EgvqB1DlWm_1ItiEX4gLM7Pwva0nMwL2GcefFmA3JoL4TW99OuIMTnUxy9aZO_JmoMXqZpzkAg5wdyxIJQ'
  }
};

export function updatePageSEO(pageId: string) {
  const seo = PAGE_SEO_DATA[pageId] || PAGE_SEO_DATA.home;

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

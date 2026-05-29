export interface ProjectSection {
  title: string;
  body: string;
  deliverables: string[];
}

export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  tags: string[];
  year: string;
  image: string;
  wide: boolean;
  tagline: string;
  heroImage: string;
  section1Image: string;
  bandImage: string;
  section2Image: string;
  quote: string;
  meta: ProjectMeta[];
  section1: ProjectSection;
  section2: ProjectSection;
}

export const PROJECTS: ProjectDetail[] = [
  {
    id: 1,
    title: 'BBA Mastro',
    category: 'Dev',
    tags: ['Angular 17', 'Node.js', 'SaaS ERP'],
    year: '2024',
    image: 'assets/images/projects/bba-s1.png',
    wide: true,
    tagline: 'Global Operating System for Warehouse, Shipping & Logistics Infrastructure.',
    heroImage: 'assets/images/projects/bba-hero.png',
    section1Image: 'assets/images/projects/bba-s1.png',
    bandImage: 'assets/images/projects/bba-band.png',
    section2Image: 'assets/images/projects/bba-s2.png',
    quote: '"Simplifying the intricate world of logistics with innovative solutions."',
    meta: [
      { label: 'Client', value: 'BBA Mastro' },
      { label: 'Location', value: 'Melbourne, AU' },
      { label: 'Role', value: 'Lead Developer' },
      { label: 'Year', value: '2024' },
    ],
    section1: {
      title: 'Platform Architecture & Open Ecosystem',
      body: 'Built the digital backbone for BBA Mastro\'s all-in-one logistics platform — a low-to-no-code, open-architecture system serving Freight Carriers, 3PLs, and International Freight Resellers. The platform integrates with ERP software, WMS, major shopping carts, and carrier networks, while handling currency conversions, duties, and taxes pre-postage.',
      deliverables: ['Open Architecture API', 'ERP & WMS Integrations', 'Multi-Carrier Connector', 'Currency & Duty Engine'],
    },
    section2: {
      title: 'Ecommerce Integrations & Live Tracking',
      body: 'Delivered seamless integrations with Shopify, BigCommerce, WooCommerce, Magento, and NetSuite — automatically importing orders and providing real-time shipping rates. The patent-pending Break Bulk Technology (BBA) and live tracking system give merchants end-to-end visibility with automated notifications at every shipment milestone.',
      deliverables: ['Shopify & BigCommerce Apps', 'Real-time Rate Engine', 'Live Tracking & Notifications', 'Mobile Applications'],
    },
  },
  {
    id: 2,
    title: 'Horizon Platform',
    category: 'Dev',
    tags: ['WebGL', 'Three.js'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80',
    wide: false,
    tagline: 'A real-time data visualisation platform powered by WebGL and Three.js.',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1800&q=90',
    section1Image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=85',
    bandImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1800&q=90',
    section2Image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85',
    quote: '"Turning raw data into something you can feel as well as see."',
    meta: [
      { label: 'Client', value: 'Horizon Labs' },
      { label: 'Year', value: '2024' },
      { label: 'Role', value: 'Lead Developer' },
      { label: 'Stack', value: 'Three.js · GLSL' },
    ],
    section1: {
      title: 'Architecture & Rendering Pipeline',
      body: 'Built a custom WebGL rendering pipeline on Three.js that processes 50k+ data points at 60fps. Custom GLSL shaders handle instanced geometry and GPU-side colour mapping, keeping the main thread free.',
      deliverables: ['Custom Renderer', 'GLSL Shaders', 'Data Pipeline', 'Worker Thread Offloading'],
    },
    section2: {
      title: 'Interaction & Performance',
      body: 'Camera orbit, raycasting-based tooltips, and animated state transitions were engineered for precision. Lighthouse performance score of 98 — achieved through aggressive geometry instancing and draw call batching.',
      deliverables: ['Camera Controls', 'Tooltip System', 'State Animations', 'Performance Audit'],
    },
  },
  {
    id: 3,
    title: 'Vortex Motion',
    category: 'Motion',
    tags: ['After Effects', 'GSAP'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80',
    wide: false,
    tagline: 'A showreel of motion-graphics work spanning broadcast and interactive web.',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1800&q=90',
    section1Image: 'https://images.unsplash.com/photo-1614851099511-773084f6911d?w=1200&q=85',
    bandImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=90',
    section2Image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&q=85',
    quote: '"Motion is the bridge between intention and emotion."',
    meta: [
      { label: 'Medium', value: 'AE · GSAP · Canvas' },
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'Motion Designer' },
      { label: 'Deliverables', value: '12 Pieces' },
    ],
    section1: {
      title: 'Broadcast Motion Graphics',
      body: "Developed a set of broadcast-ready motion packages for two streaming platforms. Work included lower-thirds, stings, and full title card sequences — each adhering to the brand's editorial guidelines while pushing the envelope creatively.",
      deliverables: ['Title Sequences', 'Lower-thirds', 'Brand Stings', 'After Effects Templates'],
    },
    section2: {
      title: 'Interactive Web Animation',
      body: "Translated broadcast motion language into GSAP-powered scroll animations for the client's marketing site. Custom easing curves were derived from the AE motion data to preserve timing fidelity across mediums.",
      deliverables: ['GSAP Animation Rig', 'Scroll Sequences', 'Easing Library', 'Lottie Exports'],
    },
  },
  {
    id: 4,
    title: 'Pulse Dashboard',
    category: 'Dev',
    tags: ['Angular', 'D3.js'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
    wide: false,
    tagline: 'An analytics dashboard turning complex metrics into clear, actionable insight.',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=90',
    section1Image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85',
    bandImage: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1800&q=90',
    section2Image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85',
    quote: '"Good data visualisation removes the distance between the analyst and the insight."',
    meta: [
      { label: 'Client', value: 'Pulse Analytics' },
      { label: 'Year', value: '2024' },
      { label: 'Stack', value: 'Angular · D3.js' },
      { label: 'Duration', value: '12 Weeks' },
    ],
    section1: {
      title: 'Data Architecture & D3 Charts',
      body: 'Designed a modular charting system on top of D3.js v7 — reusable Angular components wrapping force graphs, heatmaps, and time-series charts. Each chart supports live streaming data via WebSocket with smooth enter/update/exit transitions.',
      deliverables: ['D3 Component Library', 'WebSocket Data Layer', 'Chart Transitions', 'Dark Mode System'],
    },
    section2: {
      title: 'UX & Performance Engineering',
      body: 'Implemented virtual scrolling for dataset tables, lazy-loaded route chunks, and an optimistic update pattern that keeps the UI responsive under heavy write load. First Contentful Paint under 1.1s on cold load.',
      deliverables: ['Virtual Scroll Tables', 'Route-level Code Splitting', 'Optimistic Updates', 'Performance Budget'],
    },
  },
  {
    id: 5,
    title: 'Arcadia Brand',
    category: 'Design',
    tags: ['Branding', 'Typography'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80',
    wide: false,
    tagline: 'A luxury lifestyle brand built around the concept of deliberate slowness.',
    heroImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1800&q=90',
    section1Image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&q=85',
    bandImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1800&q=90',
    section2Image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=85',
    quote: '"Luxury is not about excess — it is about intention."',
    meta: [
      { label: 'Client', value: 'Arcadia Co.' },
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'Brand Director' },
      { label: 'Scope', value: 'Full Identity' },
    ],
    section1: {
      title: 'Identity & Typographic System',
      body: "Commissioned a bespoke typeface pairing — a fine-stroked display serif for headings and a low-contrast grotesque for body — that embodied the brand's tension between heritage and modernity. The logomark is a minimal monogram derived from negative space.",
      deliverables: ['Logomark & Wordmark', 'Type Pairing System', 'Colour System', 'Stationery Suite'],
    },
    section2: {
      title: 'Packaging & Spatial Identity',
      body: 'Extended the identity into physical touchpoints: unboxing experience, tissue paper patterns, embossed gift cards, and retail display fixtures. Spatial guidelines covered in-store lighting temperature and shelf spacing ratios.',
      deliverables: ['Packaging Design', 'Retail Guidelines', 'Environmental Graphics', 'Photography Art Direction'],
    },
  },
  {
    id: 6,
    title: 'Spatial Audio Vis',
    category: 'Dev',
    tags: ['Web Audio API', 'Canvas'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=80',
    wide: true,
    tagline: 'An immersive audio visualiser that renders sound as three-dimensional space.',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1800&q=90',
    section1Image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=85',
    bandImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1800&q=90',
    section2Image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=85',
    quote: '"What if you could see sound the way you hear it — filling the room, shaping the air?"',
    meta: [
      { label: 'Type', value: 'Personal Project' },
      { label: 'Year', value: '2024' },
      { label: 'Stack', value: 'Web Audio · Canvas 2D' },
      { label: 'Status', value: 'Open Source' },
    ],
    section1: {
      title: 'Web Audio API & FFT Analysis',
      body: "Built a real-time frequency analyser using the Web Audio API's AnalyserNode. A custom FFT smoothing algorithm with configurable decay prevents the common strobe-like flickering, creating fluid, wave-like frequency bands.",
      deliverables: ['Audio Engine', 'FFT Smoothing Algorithm', 'Microphone & File Input', 'MIDI Clock Sync'],
    },
    section2: {
      title: '3D Canvas Rendering',
      body: 'Frequency data drives a 3D Canvas 2D renderer — projection matrix, depth sorting, and per-particle colour calculated each frame without a GPU dependency. Runs at 60fps on mid-range devices via object pooling and typed arrays.',
      deliverables: ['Software 3D Renderer', 'Particle System', 'Object Pooling', 'Preset System'],
    },
  },
  {
    id: 7,
    title: 'Developland',
    category: 'Dev',
    tags: ['Angular 20', '.NET', 'SQL Server'],
    year: '2024',
    image: 'assets/images/projects/dev-card.jpg',
    wide: false,
    tagline: 'Transforming vacant urban spaces into thriving commercial and residential communities.',
    heroImage: 'assets/images/projects/dev-hero.jpg',
    section1Image: 'assets/images/projects/dev-s1.jpg',
    bandImage: 'assets/images/projects/dev-band.jpg',
    section2Image: 'assets/images/projects/dev-s2.jpg',
    quote: '"Urban regeneration is not just about buildings — it is about building communities."',
    meta: [
      { label: 'Client', value: 'Developland' },
      { label: 'Location', value: 'London, UK' },
      { label: 'Role', value: 'Lead Designer' },
      { label: 'Year', value: '2024' },
    ],
    section1: {
      title: 'Brand Identity & Digital Presence',
      body: 'Developed a complete digital identity for Developland — a London-based property development and investment company focused on urban regeneration. The design language reflects their mission of transforming neglected spaces into vibrant commercial and residential schemes, from the 24,000 sq ft Stamford Works creative hub in Dalston to the 25-unit Richardson Mews luxury apartments in Highgate.',
      deliverables: ['Brand Identity System', 'Website Design', 'Development Portfolio Pages', 'Photography Art Direction'],
    },
    section2: {
      title: 'Project Showcase & Lead Generation',
      body: 'Designed a high-converting development showcase platform that presents each property scheme — commercial workspaces, HMO conversions, and residential apartments — with full planning detail, location context, and investment narrative. The register-your-interest flow and enquiry system drive qualified investor and tenant leads directly from the site.',
      deliverables: ['Development Showcase System', 'Register Interest Flow', 'Investment Landing Pages', 'Interactive Location Maps'],
    },
  },
  {
    id: 8,
    title: 'eWand ERP',
    category: 'Dev',
    tags: ['Angular 17', '.NET', 'SQL Server'],
    year: '2024',
    image: 'assets/images/projects/ewand-card.jpg',
    wide: true,
    tagline: 'All-in-One eCommerce ERP — Inventory, POS, Shopify & Multi-Location Management.',
    heroImage: 'assets/images/projects/ewand-hero.jpg',
    section1Image: 'assets/images/projects/ewand-s1.jpg',
    bandImage: 'assets/images/projects/ewand-band.jpg',
    section2Image: 'assets/images/projects/ewand-s2.jpg',
    quote: '"One platform. Complete business control — from procurement to point of sale."',
    meta: [
      { label: 'Client', value: 'Bizsoft Solutions' },
      { label: 'Stack', value: 'Angular 17 · .NET · SQL Server' },
      { label: 'Role', value: 'Full-Stack Developer' },
      { label: 'ORM', value: 'Dapper · ADO.NET' },
    ],
    section1: {
      title: 'ERP Core — Inventory, Procurement & POS',
      body: 'Built the full-stack backbone of eWand using Angular 17 on the frontend and .NET with SQL Server on the backend, using Dapper and ADO.NET for high-performance data access. The system consolidates inventory management, purchase approval workflows, multi-location warehouse operations, barcode/QR tracking, and a real-time POS module with cash tracking and returns — all in a single unified platform serving 90+ global clients.',
      deliverables: ['Inventory & Warehouse Module', 'POS with Cash Reconciliation', 'Purchase Approval Workflows', 'Barcode & QR Code Engine'],
    },
    section2: {
      title: 'Shopify Integration & Fulfilment Automation',
      body: 'Delivered seamless Shopify ERP integration with automatic order import, real-time stock synchronisation, and courier automation with label printing. A product matrix engine handles complex variant management across sizes, colours, and SKUs. Custom reporting dashboards and role-based access control round out the platform for enterprise-grade deployments.',
      deliverables: ['Shopify Order Sync', 'Courier & Label Automation', 'Product Matrix Management', 'Custom Reporting Engine'],
    },
  },
  {
    id: 9,
    title: 'Matrix Dashboard',
    category: 'Dev',
    tags: ['Angular', '.NET', 'SQL Server'],
    year: '2024',
    image: 'assets/images/projects/matrix-card.jpg',
    wide: false,
    tagline: '10 years of business intelligence — KPIs, trends, and operational data in one view.',
    heroImage: 'assets/images/projects/matrix-hero.jpg',
    section1Image: 'assets/images/projects/matrix-s1.jpg',
    bandImage: 'assets/images/projects/matrix-band.jpg',
    section2Image: 'assets/images/projects/matrix-s2.jpg',
    quote: '"Ten years of data, one dashboard — every decision backed by evidence."',
    meta: [
      { label: 'Stack', value: 'Angular · .NET · SQL Server' },
      { label: 'Data Range', value: '10 Years' },
      { label: 'Role', value: 'Full-Stack Developer' },
      { label: 'Year', value: '2024' },
    ],
    section1: {
      title: 'Data Architecture & 10-Year Historical Store',
      body: 'Engineered a high-performance .NET + SQL Server data pipeline that aggregates, normalises, and indexes a decade of business records into a queryable analytical store. Optimised SQL procedures and indexed views ensure sub-second query response even across multi-million-row datasets, with scheduled ETL jobs keeping the dashboard live.',
      deliverables: ['SQL Server Analytical Store', 'Optimised Stored Procedures', 'ETL Pipeline', 'Indexed Views for Speed'],
    },
    section2: {
      title: 'Angular Dashboard — Charts, KPIs & Drill-downs',
      body: 'Built an Angular frontend with rich interactive charts — bar, line, area, and pie visualisations covering sales trends, operational KPIs, and period-over-period comparisons. Date range pickers, department filters, and drill-down navigation let users slice a full decade of data instantly, with exportable reports in PDF and Excel.',
      deliverables: ['Interactive Chart Suite', 'KPI Scorecard Widgets', 'Period Comparison Views', 'PDF & Excel Export'],
    },
  },
];

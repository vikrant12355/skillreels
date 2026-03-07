export interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
    bio: string;
    skills: string[];
    interests: string[];
    followers: number;
    following: number;
    reelsCount: number;
}

export interface Reel {
    id: string;
    creatorId: string;
    creatorName: string;
    creatorAvatar: string;
    creatorUsername: string;
    videoUrl: string;
    thumbnailColor: string;
    title: string;
    description: string;
    skillTags: string[];
    industryTags: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: number;
    transcript: string;
    likes: number;
    views: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    isSaved: boolean;
    aiSummary: {
        keyInsights: string[];
        takeaway: string;
        recommendedSkills: string[];
    };
    createdAt: string;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    reelId?: string;
}

export interface Conversation {
    id: string;
    user: User;
    lastMessage: string;
    timestamp: string;
    unread: number;
    messages: Message[];
}

export interface SkillNode {
    name: string;
    level: number;
    children?: SkillNode[];
}

export interface TrendingSkill {
    name: string;
    growth: string;
    icon: string;
    color: string;
}

export interface Industry {
    name: string;
    growth: string;
    description: string;
    icon: string;
    color: string;
}

// ─── Users ───────────────────────────────────────────────
export const USERS: User[] = [
    {
        id: 'u1',
        name: 'Sarah Chen',
        username: 'sarahchen_ai',
        avatar: 'https://i.pravatar.cc/150?img=1',
        bio: 'AI Researcher & Educator | Demystifying AI for everyone',
        skills: ['AI', 'Machine Learning', 'Python', 'TensorFlow'],
        interests: ['AI', 'Startups', 'Education'],
        followers: 12400,
        following: 340,
        reelsCount: 87,
    },
    {
        id: 'u2',
        name: 'Marcus Johnson',
        username: 'marcus_devops',
        avatar: 'https://i.pravatar.cc/150?img=3',
        bio: 'Cloud Architect @ AWS | DevOps Evangelist',
        skills: ['Cloud Computing', 'AWS', 'Kubernetes', 'DevOps'],
        interests: ['Cloud', 'Infrastructure', 'Automation'],
        followers: 8900,
        following: 210,
        reelsCount: 54,
    },
    {
        id: 'u3',
        name: 'Priya Sharma',
        username: 'priya_cyber',
        avatar: 'https://i.pravatar.cc/150?img=5',
        bio: 'Cybersecurity Expert | Ethical Hacker | Speaker',
        skills: ['Cybersecurity', 'Penetration Testing', 'OSINT'],
        interests: ['Security', 'Privacy', 'Open Source'],
        followers: 15600,
        following: 180,
        reelsCount: 112,
    },
    {
        id: 'u4',
        name: 'Alex Rivera',
        username: 'alex_robotics',
        avatar: 'https://i.pravatar.cc/150?img=8',
        bio: 'Robotics Engineer | Building the future of automation',
        skills: ['Robotics', 'ROS', 'Computer Vision', 'C++'],
        interests: ['Robotics', 'AI', 'Hardware'],
        followers: 6700,
        following: 290,
        reelsCount: 43,
    },
    {
        id: 'u5',
        name: 'Elena Kowalski',
        username: 'elena_startup',
        avatar: 'https://i.pravatar.cc/150?img=9',
        bio: 'Serial Entrepreneur | 3x Founder | Y Combinator',
        skills: ['Entrepreneurship', 'Product Management', 'Growth'],
        interests: ['Startups', 'VC', 'Product'],
        followers: 22000,
        following: 450,
        reelsCount: 156,
    },
    {
        id: 'u6',
        name: 'David Park',
        username: 'david_blockchain',
        avatar: 'https://i.pravatar.cc/150?img=11',
        bio: 'Web3 Developer | Smart Contract Auditor',
        skills: ['Blockchain', 'Solidity', 'Web3', 'DeFi'],
        interests: ['Crypto', 'DeFi', 'Web3'],
        followers: 9300,
        following: 165,
        reelsCount: 68,
    },
    {
        id: 'u7',
        name: 'Nina Williams',
        username: 'nina_data',
        avatar: 'https://i.pravatar.cc/150?img=16',
        bio: 'Data Scientist @ Google | Making data beautiful',
        skills: ['Data Science', 'Python', 'SQL', 'Visualization'],
        interests: ['Data', 'AI', 'Analytics'],
        followers: 11200,
        following: 230,
        reelsCount: 79,
    },
    {
        id: 'u8',
        name: 'James Mitchell',
        username: 'james_fullstack',
        avatar: 'https://i.pravatar.cc/150?img=12',
        bio: 'Full-Stack Dev | React & Node.js | Open Source Contributor',
        skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
        interests: ['Web Dev', 'Open Source', 'Design'],
        followers: 7800,
        following: 310,
        reelsCount: 91,
    },
];

export const CURRENT_USER: User = {
    id: 'current',
    name: 'You',
    username: 'learner_pro',
    avatar: 'https://i.pravatar.cc/150?img=32',
    bio: 'Lifelong learner | Building the future',
    skills: ['JavaScript', 'React', 'AI Basics'],
    interests: ['AI', 'Startups', 'Web Dev'],
    followers: 342,
    following: 128,
    reelsCount: 5,
};

// ─── Reels ───────────────────────────────────────────────
const GRADIENT_COLORS = [
    '#1a1a2e', '#16213e', '#0f3460', '#1b1b2f',
    '#162447', '#1f4068', '#1a1a40', '#270082',
    '#1B1464', '#0C2461', '#0a3d62', '#0c2461',
];

export const REELS: Reel[] = [
    {
        id: 'r1',
        creatorId: 'u1',
        creatorName: 'Sarah Chen',
        creatorAvatar: 'https://i.pravatar.cc/150?img=1',
        creatorUsername: 'sarahchen_ai',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[0],
        title: 'Top 5 AI Tools Engineers Must Learn in 2026',
        description: 'The AI landscape is evolving rapidly. Here are the 5 tools every engineer needs to master this year to stay ahead.',
        skillTags: ['AI', 'Machine Learning', 'LLM Engineering'],
        industryTags: ['Technology', 'AI Infrastructure'],
        difficulty: 'Beginner',
        duration: 30,
        transcript: 'The AI tooling landscape has shifted dramatically in 2026. First, AI agent frameworks like LangGraph and CrewAI have become essential. Second, vector databases like Pinecone and Weaviate are now standard infrastructure. Third, prompt engineering tools have matured into full IDE experiences. Fourth, AI-powered code assistants have moved beyond autocomplete into full autonomous development. And fifth, multi-modal AI platforms let you build applications that understand text, images, video, and audio simultaneously.',
        likes: 4520,
        views: 28000,
        comments: 312,
        shares: 890,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'AI agent frameworks (LangGraph, CrewAI) are now essential tools',
                'Vector databases have become standard infrastructure',
                'Multi-modal AI platforms enable text, image, video, and audio understanding',
            ],
            takeaway: 'Learning AI agent frameworks and multi-modal tools will be the highest-ROI skill investment this year.',
            recommendedSkills: ['LangChain', 'Vector Databases', 'Multi-Modal AI', 'Prompt Engineering'],
        },
        createdAt: '2026-03-05',
    },
    {
        id: 'r2',
        creatorId: 'u5',
        creatorName: 'Elena Kowalski',
        creatorAvatar: 'https://i.pravatar.cc/150?img=9',
        creatorUsername: 'elena_startup',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[1],
        title: 'Industries That Will Boom in the Next Decade',
        description: 'These 5 industries are projected to grow 10x in the next 10 years. Position yourself early.',
        skillTags: ['Business Strategy', 'Market Analysis', 'Entrepreneurship'],
        industryTags: ['Startups', 'Venture Capital'],
        difficulty: 'Beginner',
        duration: 45,
        transcript: 'If you want to position yourself for the next decade, watch these five industries closely. Climate tech is exploding with over $50 billion in annual investment. AI infrastructure companies building the picks and shovels of the AI revolution. Robotics and autonomous systems are finally reaching commercial viability. Biotech and longevity science are seeing breakthroughs in gene therapy and aging research. And space technology is moving from exploration to commercialization with companies like SpaceX and Rocket Lab leading the charge.',
        likes: 8900,
        views: 52000,
        comments: 567,
        shares: 2100,
        isLiked: true,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'Climate tech sees over $50B annual investment and growing',
                'AI infrastructure (picks & shovels) is the safest bet in AI',
                'Space tech is transitioning from exploration to commercialization',
            ],
            takeaway: 'Position yourself in climate tech or AI infrastructure for maximum career growth.',
            recommendedSkills: ['Climate Tech', 'AI Infrastructure', 'Space Systems', 'Biotech'],
        },
        createdAt: '2026-03-04',
    },
    {
        id: 'r3',
        creatorId: 'u4',
        creatorName: 'Alex Rivera',
        creatorAvatar: 'https://i.pravatar.cc/150?img=8',
        creatorUsername: 'alex_robotics',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[2],
        title: 'Why Robotics Engineers Will Dominate the Next Job Market',
        description: 'The demand for robotics engineers is about to explode. Here\'s why and how to prepare.',
        skillTags: ['Robotics', 'Computer Vision', 'ROS'],
        industryTags: ['Robotics', 'Manufacturing'],
        difficulty: 'Intermediate',
        duration: 35,
        transcript: 'Robotics is no longer a niche field. With Amazon deploying over 750,000 robots in warehouses, Tesla pushing humanoid robots, and surgical robots becoming standard in hospitals, the demand for robotics engineers has never been higher. The key skills you need are ROS2 for robot operating systems, computer vision for perception, reinforcement learning for decision-making, and embedded systems programming. The average robotics engineer salary has jumped to $180K and the field is growing at 25% annually.',
        likes: 3200,
        views: 19000,
        comments: 210,
        shares: 650,
        isLiked: false,
        isSaved: true,
        aiSummary: {
            keyInsights: [
                'Amazon deploys 750K+ robots; Tesla pushing humanoid robotics',
                'Key skills: ROS2, computer vision, reinforcement learning, embedded systems',
                'Average robotics engineer salary: $180K, field growing 25% annually',
            ],
            takeaway: 'Start learning ROS2 and computer vision now to enter the high-demand robotics field.',
            recommendedSkills: ['ROS2', 'Computer Vision', 'Reinforcement Learning', 'Embedded Systems'],
        },
        createdAt: '2026-03-03',
    },
    {
        id: 'r4',
        creatorId: 'u1',
        creatorName: 'Sarah Chen',
        creatorAvatar: 'https://i.pravatar.cc/150?img=1',
        creatorUsername: 'sarahchen_ai',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[3],
        title: '3 Skills Every Developer Must Learn After ChatGPT',
        description: 'ChatGPT changed everything. These 3 skills will separate the AI-native developers from the rest.',
        skillTags: ['AI', 'Prompt Engineering', 'LLM Engineering'],
        industryTags: ['Technology', 'Software Engineering'],
        difficulty: 'Beginner',
        duration: 28,
        transcript: 'ChatGPT fundamentally changed what it means to be a developer. Here are the three skills that matter most now. First, prompt engineering—not just writing prompts but designing prompt architectures and evaluation systems. Second, AI-native architecture—building systems that have AI at the core, not bolted-on. Think AI-first data pipelines, intelligent APIs, and autonomous workflows. Third, AI safety and alignment—understanding how to build AI systems that are reliable, fair, and secure. These three skills will define the next generation of senior engineers.',
        likes: 6100,
        views: 41000,
        comments: 423,
        shares: 1500,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'Prompt engineering is evolving into prompt architecture design',
                'AI-native architecture puts AI at the core, not as an add-on',
                'AI safety and alignment skills will define senior engineers',
            ],
            takeaway: 'Master AI-native architecture to build systems with AI at the core, not as an afterthought.',
            recommendedSkills: ['Prompt Architecture', 'AI-Native Design', 'AI Safety', 'LLM Ops'],
        },
        createdAt: '2026-03-02',
    },
    {
        id: 'r5',
        creatorId: 'u3',
        creatorName: 'Priya Sharma',
        creatorAvatar: 'https://i.pravatar.cc/150?img=5',
        creatorUsername: 'priya_cyber',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[4],
        title: 'Cybersecurity in 2026: The Threats Nobody Talks About',
        description: 'AI-powered attacks are here. These are the emerging cybersecurity threats you need to know.',
        skillTags: ['Cybersecurity', 'AI Security', 'Threat Intelligence'],
        industryTags: ['Cybersecurity', 'Enterprise'],
        difficulty: 'Advanced',
        duration: 40,
        transcript: 'Cybersecurity in 2026 looks completely different. AI-powered phishing attacks are now virtually indistinguishable from real emails. Deepfake-based social engineering can clone anyone\'s voice in seconds. Supply chain attacks have become more sophisticated with AI finding zero-days automatically. Quantum computing threats are no longer theoretical. And autonomous hacking agents can probe systems 24/7 without human oversight. The defense? AI-powered security operations, zero-trust architecture, and cryptographic agility.',
        likes: 5400,
        views: 33000,
        comments: 289,
        shares: 1200,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'AI-powered phishing is now virtually indistinguishable from real communications',
                'Autonomous hacking agents can probe systems 24/7 without human oversight',
                'Defense requires AI-powered security ops and zero-trust architecture',
            ],
            takeaway: 'Learn AI-powered security operations and zero-trust architecture to stay relevant.',
            recommendedSkills: ['AI Security', 'Zero-Trust Architecture', 'Threat Intelligence', 'Quantum-Safe Crypto'],
        },
        createdAt: '2026-03-01',
    },
    {
        id: 'r6',
        creatorId: 'u2',
        creatorName: 'Marcus Johnson',
        creatorAvatar: 'https://i.pravatar.cc/150?img=3',
        creatorUsername: 'marcus_devops',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[5],
        title: 'Cloud Architecture Patterns for AI Workloads',
        description: 'Running AI in production needs specific cloud patterns. Here\'s your infrastructure playbook.',
        skillTags: ['Cloud Computing', 'MLOps', 'Infrastructure'],
        industryTags: ['Cloud', 'AI Infrastructure'],
        difficulty: 'Advanced',
        duration: 50,
        transcript: 'Running AI workloads in production is fundamentally different from traditional web services. You need GPU orchestration with auto-scaling, model serving with A/B testing capabilities, feature stores for real-time inference, vector databases for RAG architectures, and robust model monitoring for drift detection. The key cloud patterns are serverless GPU inference, multi-region model deployment, and cost-optimized training pipelines using spot instances.',
        likes: 2800,
        views: 15000,
        comments: 156,
        shares: 420,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'AI workloads need GPU orchestration with auto-scaling',
                'Feature stores enable real-time inference at scale',
                'Cost-optimized training uses spot instances and serverless GPU',
            ],
            takeaway: 'Master GPU orchestration and MLOps to become a high-value cloud architect.',
            recommendedSkills: ['MLOps', 'GPU Orchestration', 'Kubernetes', 'Model Serving'],
        },
        createdAt: '2026-02-28',
    },
    {
        id: 'r7',
        creatorId: 'u7',
        creatorName: 'Nina Williams',
        creatorAvatar: 'https://i.pravatar.cc/150?img=16',
        creatorUsername: 'nina_data',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[6],
        title: 'Data Science is Dead. Long Live Data Engineering.',
        description: 'The role of data scientist has evolved. Here\'s what the new data professional looks like.',
        skillTags: ['Data Engineering', 'Data Science', 'Analytics'],
        industryTags: ['Technology', 'Data'],
        difficulty: 'Intermediate',
        duration: 35,
        transcript: 'The traditional data scientist role is being disrupted. AI can now do most of the exploratory analysis, model building, and even feature engineering that data scientists used to do. What\'s emerging is the AI-augmented data engineer—someone who designs data architectures, builds real-time pipelines, manages data quality at scale, and orchestrates AI systems. The skills that matter now are data pipeline orchestration, real-time streaming, data contracts, and understanding how to feed high-quality data to AI systems.',
        likes: 7200,
        views: 45000,
        comments: 534,
        shares: 1800,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'AI is automating traditional data science tasks like EDA and model building',
                'The new role is AI-augmented data engineer focused on architecture',
                'Key skills: pipeline orchestration, real-time streaming, data contracts',
            ],
            takeaway: 'Transition from pure data science to data engineering with AI orchestration skills.',
            recommendedSkills: ['Data Pipeline Orchestration', 'Apache Kafka', 'dbt', 'Data Contracts'],
        },
        createdAt: '2026-02-27',
    },
    {
        id: 'r8',
        creatorId: 'u8',
        creatorName: 'James Mitchell',
        creatorAvatar: 'https://i.pravatar.cc/150?img=12',
        creatorUsername: 'james_fullstack',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[7],
        title: 'The Future of Frontend: AI-Generated UIs',
        description: 'Frontend development is being transformed by AI. Here\'s what\'s coming and how to adapt.',
        skillTags: ['Frontend', 'React', 'AI', 'UI/UX'],
        industryTags: ['Software Engineering', 'Design'],
        difficulty: 'Intermediate',
        duration: 30,
        transcript: 'Frontend development is changing faster than ever. AI can now generate entire UI components from descriptions, adapt interfaces in real-time based on user behavior, and even A/B test design variations autonomously. But this doesn\'t mean frontend devs are out of a job. Instead, the role is shifting to AI-UI orchestration—designing the systems that generate and adapt UIs. Think of it as moving from writing HTML to writing the rules that govern how AI creates HTML.',
        likes: 4100,
        views: 26000,
        comments: 267,
        shares: 780,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'AI can generate entire UI components from natural language descriptions',
                'The role shifts from writing UI code to orchestrating AI-generated UIs',
                'Real-time adaptive interfaces are the next frontier',
            ],
            takeaway: 'Learn AI-UI orchestration to future-proof your frontend career.',
            recommendedSkills: ['AI-UI Orchestration', 'Design Systems', 'Adaptive Interfaces', 'React Server Components'],
        },
        createdAt: '2026-02-26',
    },
    {
        id: 'r9',
        creatorId: 'u6',
        creatorName: 'David Park',
        creatorAvatar: 'https://i.pravatar.cc/150?img=11',
        creatorUsername: 'david_blockchain',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[8],
        title: 'Web3 Meets AI: The Convergence Nobody Expected',
        description: 'Blockchain and AI are converging. Here\'s why this matters and what to build.',
        skillTags: ['Web3', 'Blockchain', 'AI', 'DeFi'],
        industryTags: ['Web3', 'AI'],
        difficulty: 'Advanced',
        duration: 40,
        transcript: 'The convergence of Web3 and AI is creating entirely new categories. Decentralized AI training lets anyone contribute GPU power and earn tokens. On-chain AI agents can execute DeFi strategies autonomously. NFTs are being used as AI model licenses. And DAOs are funding open-source AI research. The key opportunity is building infrastructure that bridges these two worlds—AI models that run on decentralized compute, verifiable AI inference on-chain, and token-incentivized data collection.',
        likes: 3600,
        views: 21000,
        comments: 198,
        shares: 560,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'Decentralized AI training lets anyone contribute GPU power for tokens',
                'On-chain AI agents can execute DeFi strategies autonomously',
                'NFTs are being used as AI model licensing mechanisms',
            ],
            takeaway: 'Build infrastructure bridging AI and Web3 for maximum opportunity.',
            recommendedSkills: ['Decentralized AI', 'Smart Contracts', 'Token Economics', 'Verifiable Compute'],
        },
        createdAt: '2026-02-25',
    },
    {
        id: 'r10',
        creatorId: 'u5',
        creatorName: 'Elena Kowalski',
        creatorAvatar: 'https://i.pravatar.cc/150?img=9',
        creatorUsername: 'elena_startup',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[9],
        title: 'How to Validate a Startup Idea in 48 Hours',
        description: 'Stop building for months. Here\'s how to validate any startup idea in a weekend.',
        skillTags: ['Entrepreneurship', 'Product Management', 'Growth Hacking'],
        industryTags: ['Startups', 'Business'],
        difficulty: 'Beginner',
        duration: 30,
        transcript: 'Most founders waste months building something nobody wants. Here\'s the 48-hour validation framework I used for all three of my YC companies. Hour 1-4: Define your ICP and write down their top 3 pain points. Hour 4-12: Talk to 15 potential customers. Hour 12-24: Build a landing page with a clear value proposition. Hour 24-36: Run $100 of ads to test demand. Hour 36-48: Analyze conversion data and decide go or no-go. If you can\'t get 10% signup rate from cold traffic, the idea needs work.',
        likes: 11200,
        views: 68000,
        comments: 789,
        shares: 3400,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                '48-hour framework: ICP → Customer interviews → Landing page → Paid ads → Decision',
                'Talk to 15 potential customers before writing a single line of code',
                '10% signup rate from cold traffic is the validation threshold',
            ],
            takeaway: 'Validate before building. Use the 48-hour framework to test ideas with minimal cost.',
            recommendedSkills: ['Customer Discovery', 'Landing Page Design', 'Growth Marketing', 'Business Validation'],
        },
        createdAt: '2026-02-24',
    },
    {
        id: 'r11',
        creatorId: 'u3',
        creatorName: 'Priya Sharma',
        creatorAvatar: 'https://i.pravatar.cc/150?img=5',
        creatorUsername: 'priya_cyber',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[10],
        title: 'Ethical Hacking Career Path: From Zero to $200K',
        description: 'Complete roadmap to becoming an ethical hacker earning six figures.',
        skillTags: ['Cybersecurity', 'Ethical Hacking', 'Career Growth'],
        industryTags: ['Cybersecurity', 'Career'],
        difficulty: 'Beginner',
        duration: 45,
        transcript: 'Here\'s exactly how to go from zero to a $200K ethical hacking career. Start with CompTIA Security+ and learn Linux deeply. Then move to CEH or OSCP certifications. Build a home lab and practice on HackTheBox and TryHackMe. Start bug bounty hunting on HackerOne and Bugcrowd. Document everything in a blog. After 2-3 years of consistent practice, apply for senior penetration testing roles. The demand is massive—there are 3.5 million unfilled cybersecurity positions globally.',
        likes: 9100,
        views: 57000,
        comments: 612,
        shares: 2800,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'Career path: Security+ → OSCP → Bug Bounties → Senior Pen Testing',
                '3.5 million unfilled cybersecurity positions globally',
                'Build a home lab and practice on HackTheBox consistently',
            ],
            takeaway: 'Start with certifications, practice bug bounties, and document your journey.',
            recommendedSkills: ['Linux', 'OSCP', 'Bug Bounty', 'Penetration Testing'],
        },
        createdAt: '2026-02-23',
    },
    {
        id: 'r12',
        creatorId: 'u2',
        creatorName: 'Marcus Johnson',
        creatorAvatar: 'https://i.pravatar.cc/150?img=3',
        creatorUsername: 'marcus_devops',
        videoUrl: '',
        thumbnailColor: GRADIENT_COLORS[11],
        title: 'Kubernetes vs Serverless in 2026: The Real Answer',
        description: 'The K8s vs serverless debate is resolved. Here\'s when to use which.',
        skillTags: ['Kubernetes', 'Serverless', 'Cloud Architecture'],
        industryTags: ['Cloud', 'Infrastructure'],
        difficulty: 'Intermediate',
        duration: 35,
        transcript: 'The Kubernetes vs serverless debate has a clear answer in 2026. Use Kubernetes for stateful AI workloads, complex multi-service architectures, and when you need GPU orchestration. Use serverless for event-driven microservices, API backends, and scheduled jobs. The new middle ground is serverless containers—services like AWS Fargate and Google Cloud Run that give you the simplicity of serverless with the flexibility of containers. Most modern architectures use a hybrid approach.',
        likes: 5600,
        views: 32000,
        comments: 345,
        shares: 920,
        isLiked: false,
        isSaved: false,
        aiSummary: {
            keyInsights: [
                'K8s for stateful AI workloads and GPU orchestration',
                'Serverless for event-driven microservices and API backends',
                'Serverless containers (Fargate, Cloud Run) are the new middle ground',
            ],
            takeaway: 'Learn both Kubernetes and serverless, then specialize in serverless containers.',
            recommendedSkills: ['Kubernetes', 'AWS Fargate', 'Cloud Run', 'Serverless Architecture'],
        },
        createdAt: '2026-02-22',
    },
];

// ─── Conversations ───────────────────────────────────────
export const CONVERSATIONS: Conversation[] = [
    {
        id: 'c1',
        user: USERS[0],
        lastMessage: 'Have you tried the new LangGraph features?',
        timestamp: '2m ago',
        unread: 2,
        messages: [
            { id: 'm1', senderId: 'u1', text: 'Hey! Loved your question about AI agents.', timestamp: '10:30 AM' },
            { id: 'm2', senderId: 'current', text: 'Thanks Sarah! Your reel was incredibly insightful.', timestamp: '10:32 AM' },
            { id: 'm3', senderId: 'u1', text: 'I\'m working on a deep-dive series about autonomous agents. Would love your feedback!', timestamp: '10:35 AM' },
            { id: 'm4', senderId: 'current', text: 'Absolutely! I\'m particularly interested in multi-agent collaboration patterns.', timestamp: '10:40 AM' },
            { id: 'm5', senderId: 'u1', text: 'Have you tried the new LangGraph features?', timestamp: '10:45 AM' },
        ],
    },
    {
        id: 'c2',
        user: USERS[4],
        lastMessage: 'The 48-hour validation method is gold!',
        timestamp: '15m ago',
        unread: 0,
        messages: [
            { id: 'm6', senderId: 'current', text: 'Elena, your startup validation reel is amazing!', timestamp: '9:00 AM' },
            { id: 'm7', senderId: 'u5', text: 'Thank you! Are you working on a startup idea?', timestamp: '9:15 AM' },
            { id: 'm8', senderId: 'current', text: 'Yes! I\'m building an AI-powered professional learning platform.', timestamp: '9:20 AM' },
            { id: 'm9', senderId: 'u5', text: 'The 48-hour validation method is gold!', timestamp: '9:25 AM' },
        ],
    },
    {
        id: 'c3',
        user: USERS[2],
        lastMessage: 'I\'ll share my home lab setup guide with you',
        timestamp: '1h ago',
        unread: 1,
        messages: [
            { id: 'm10', senderId: 'u3', text: 'Noticed you saved my cybersecurity reel!', timestamp: '8:00 AM' },
            { id: 'm11', senderId: 'current', text: 'Yes! I want to start learning ethical hacking.', timestamp: '8:10 AM' },
            { id: 'm12', senderId: 'u3', text: 'Great choice! Start with TryHackMe, it\'s beginner-friendly.', timestamp: '8:15 AM' },
            { id: 'm13', senderId: 'u3', text: 'I\'ll share my home lab setup guide with you', timestamp: '8:20 AM' },
        ],
    },
    {
        id: 'c4',
        user: USERS[3],
        lastMessage: 'ROS2 Humble is the best starting version',
        timestamp: '3h ago',
        unread: 0,
        messages: [
            { id: 'm14', senderId: 'current', text: 'Alex, where should I start with robotics?', timestamp: '6:00 AM' },
            { id: 'm15', senderId: 'u4', text: 'Start with ROS2 and a Raspberry Pi!', timestamp: '6:30 AM' },
            { id: 'm16', senderId: 'u4', text: 'ROS2 Humble is the best starting version', timestamp: '6:35 AM' },
        ],
    },
    {
        id: 'c5',
        user: USERS[6],
        lastMessage: 'Check out the dbt fundamentals course',
        timestamp: '5h ago',
        unread: 0,
        messages: [
            { id: 'm17', senderId: 'current', text: 'Nina, your data engineering reel changed my perspective!', timestamp: '3:00 AM' },
            { id: 'm18', senderId: 'u7', text: 'Glad to hear that! Data engineering is where the impact is.', timestamp: '3:30 AM' },
            { id: 'm19', senderId: 'u7', text: 'Check out the dbt fundamentals course', timestamp: '3:35 AM' },
        ],
    },
];

// ─── Skill Graph ─────────────────────────────────────────
export const SKILL_TREE: SkillNode[] = [
    {
        name: 'AI & Machine Learning',
        level: 3,
        children: [
            { name: 'Machine Learning', level: 3 },
            { name: 'LLM Engineering', level: 2 },
            { name: 'AI Agents', level: 1 },
            { name: 'Computer Vision', level: 1 },
        ],
    },
    {
        name: 'Web Development',
        level: 4,
        children: [
            { name: 'React', level: 4 },
            { name: 'TypeScript', level: 3 },
            { name: 'Node.js', level: 3 },
            { name: 'GraphQL', level: 2 },
        ],
    },
    {
        name: 'Cloud & DevOps',
        level: 2,
        children: [
            { name: 'AWS', level: 2 },
            { name: 'Kubernetes', level: 1 },
            { name: 'CI/CD', level: 2 },
        ],
    },
    {
        name: 'Cybersecurity',
        level: 1,
        children: [
            { name: 'Network Security', level: 1 },
            { name: 'Ethical Hacking', level: 0 },
        ],
    },
];

// ─── Trending & Career Insights ──────────────────────────
export const TRENDING_SKILLS: TrendingSkill[] = [
    { name: 'AI Agents', growth: '+340%', icon: 'robot', color: '#6366F1' },
    { name: 'Robotics Engineering', growth: '+180%', icon: 'hardware-chip', color: '#06B6D4' },
    { name: 'Cybersecurity', growth: '+156%', icon: 'shield-checkmark', color: '#10B981' },
    { name: 'Prompt Engineering', growth: '+290%', icon: 'chatbubbles', color: '#8B5CF6' },
    { name: 'Rust Programming', growth: '+120%', icon: 'code-slash', color: '#F59E0B' },
    { name: 'Quantum Computing', growth: '+95%', icon: 'flash', color: '#EF4444' },
    { name: 'Climate Tech', growth: '+200%', icon: 'leaf', color: '#22C55E' },
    { name: 'Edge AI', growth: '+175%', icon: 'phone-portrait', color: '#EC4899' },
];

export const GROWING_INDUSTRIES: Industry[] = [
    {
        name: 'AI Infrastructure',
        growth: '+42% YoY',
        description: 'Building the foundation for AI systems',
        icon: 'server',
        color: '#6366F1',
    },
    {
        name: 'Climate Tech',
        growth: '+38% YoY',
        description: 'Sustainable technology solutions',
        icon: 'leaf',
        color: '#10B981',
    },
    {
        name: 'Robotics',
        growth: '+35% YoY',
        description: 'Autonomous systems and automation',
        icon: 'hardware-chip',
        color: '#06B6D4',
    },
    {
        name: 'Biotech & Longevity',
        growth: '+28% YoY',
        description: 'Gene therapy and aging research',
        icon: 'fitness',
        color: '#EC4899',
    },
    {
        name: 'Space Technology',
        growth: '+25% YoY',
        description: 'Commercialization of space',
        icon: 'rocket',
        color: '#F59E0B',
    },
];

// ─── Interest Categories for Onboarding ──────────────────
export const INTEREST_CATEGORIES = [
    { id: 'ai', name: 'Artificial Intelligence', icon: 'brain', emoji: '🤖' },
    { id: 'startups', name: 'Startups & Business', icon: 'rocket', emoji: '🚀' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: 'shield', emoji: '🛡️' },
    { id: 'robotics', name: 'Robotics', icon: 'hardware-chip', emoji: '🦾' },
    { id: 'web3', name: 'Web3 & Blockchain', icon: 'cube', emoji: '⛓️' },
    { id: 'cloud', name: 'Cloud Computing', icon: 'cloud', emoji: '☁️' },
    { id: 'data', name: 'Data Science', icon: 'analytics', emoji: '📊' },
    { id: 'webdev', name: 'Web Development', icon: 'code-slash', emoji: '💻' },
    { id: 'mobile', name: 'Mobile Development', icon: 'phone-portrait', emoji: '📱' },
    { id: 'devops', name: 'DevOps & SRE', icon: 'git-branch', emoji: '⚙️' },
    { id: 'design', name: 'UI/UX Design', icon: 'color-palette', emoji: '🎨' },
    { id: 'career', name: 'Career Growth', icon: 'trending-up', emoji: '📈' },
];

export const CAREER_GOALS = [
    { id: 'switch', name: 'Switch Careers', emoji: '🔄' },
    { id: 'upskill', name: 'Upskill in Current Role', emoji: '⬆️' },
    { id: 'startup', name: 'Build a Startup', emoji: '🚀' },
    { id: 'freelance', name: 'Go Freelance', emoji: '💼' },
    { id: 'leadership', name: 'Move to Leadership', emoji: '👑' },
    { id: 'deeptech', name: 'Go Deep in Tech', emoji: '🔬' },
];

export const SKILL_LEVELS = [
    { id: 'beginner', name: 'Beginner', description: 'Just starting my journey', emoji: '🌱' },
    { id: 'intermediate', name: 'Intermediate', description: '1-3 years experience', emoji: '🌿' },
    { id: 'advanced', name: 'Advanced', description: '3-7 years experience', emoji: '🌳' },
    { id: 'expert', name: 'Expert', description: '7+ years experience', emoji: '🏔️' },
];

// ─── Saved Reel Playlists ────────────────────────────────
export const PLAYLISTS = [
    { id: 'p1', name: 'My AI Learning', emoji: '🤖', reelIds: ['r1', 'r4', 'r7'] },
    { id: 'p2', name: 'Startup Knowledge', emoji: '🚀', reelIds: ['r2', 'r10'] },
    { id: 'p3', name: 'Career Growth', emoji: '📈', reelIds: ['r3', 'r11'] },
    { id: 'p4', name: 'Cloud & DevOps', emoji: '☁️', reelIds: ['r6', 'r12'] },
];

export interface SampleResume {
  id: string;
  company: string;
  role: string;
  result: string;
  image?: string;
  highlights: string[];
  link?: string;
  resumeContent?: {
    personalInfo: {
      name: string;
      title: string;
      email: string;
      phone: string;
      location: string;
      summary: string;
    };
    education: Array<{
      institution: string;
      degree: string;
      field: string;
      dates: string;
      gpa?: string;
      achievements?: string[];
    }>;
    experience: Array<{
      company: string;
      position: string;
      dates: string;
      description: string;
      highlights: string[];
    }>;
    skills: string[];
    projects: Array<{
      name: string;
      description: string;
      highlights: string[];
    }>;
    achievements?: string[];
  };
}

export const sampleResumes: SampleResume[] = [
  {
    id: "1",
    company: "Google",
    role: "Software Engineer",
    result: "Accepted",
    highlights: [
      "Highlighted problem-solving skills with specific examples",
      "Quantified impact with metrics and percentages",
      "Emphasized technical depth with side projects",
      "Used clean, minimal formatting focusing on content over style",
      "Listed specific project contributions and team impact"
    ],
    resumeContent: {
      personalInfo: {
        name: "Alex Johnson",
        title: "Software Engineer",
        email: "example@email.com",
        phone: "(555) 123-4567",
        location: "Mountain View, CA",
        summary: "Software engineer with 3+ years of experience building scalable web applications and distributed systems. Passionate about elegant solutions to complex problems with focus on performance optimization and clean code."
      },
      education: [
        {
          institution: "Stanford University",
          degree: "Bachelor of Science",
          field: "Computer Science",
          dates: "2016 - 2020",
          gpa: "3.85/4.0"
        }
      ],
      experience: [
        {
          company: "TechStart Inc.",
          position: "Software Engineer",
          dates: "2020 - 2023",
          description: "Led backend development for a cloud-based SaaS platform serving 500,000+ monthly active users.",
          highlights: [
            "Redesigned data processing pipeline, reducing latency by 43% and scaling to handle 3x the previous throughput",
            "Implemented caching strategy that reduced database load by 65% during peak traffic periods",
            "Built and deployed microservices architecture using Docker and Kubernetes, improving deployment time by 78%",
            "Led weekly code reviews and mentored 2 junior engineers"
          ]
        },
        {
          company: "InnovateTech",
          position: "Software Engineering Intern",
          dates: "Summer 2019",
          description: "Contributed to the development of the company's flagship machine learning platform.",
          highlights: [
            "Developed REST API endpoints serving 200,000+ daily requests with 99.9% uptime",
            "Created automated testing suite that caught 24 critical bugs before production deployment",
            "Optimized image processing algorithm, reducing execution time by 35%"
          ]
        }
      ],
      skills: [
        "Java", "Python", "Go", "JavaScript", "React", "Node.js", "Docker", "Kubernetes", "Redis", "MongoDB", "PostgreSQL", "AWS", "GCP", "Distributed Systems", "Microservices", "CI/CD", "Test-driven Development"
      ],
      projects: [
        {
          name: "Distributed Search Engine",
          description: "Built a scalable search engine using Go that indexes millions of documents across distributed nodes.",
          highlights: [
            "Implemented custom ranking algorithm optimizing for relevance and response time",
            "Created distributed crawler capable of processing 10,000 URLs per minute",
            "Deployed on GCP with autoscaling and load balancing"
          ]
        },
        {
          name: "Open Source Contribution - TensorFlow",
          description: "Active contributor to TensorFlow, focusing on performance optimizations.",
          highlights: [
            "Submitted 3 accepted pull requests improving memory usage for large model training",
            "Authored documentation for custom training loops used by 5,000+ developers monthly"
          ]
        }
      ],
      achievements: [
        "1st Place, Stanford Coding Competition (2019)",
        "Published research paper on distributed systems at ACM Conference (2020)",
        "Completed Google's Advanced Algorithm Specialization (2021)"
      ]
    }
  },
  {
    id: "2",
    company: "Microsoft",
    role: "Product Manager",
    result: "Accepted",
    highlights: [
      "Demonstrated familiarity with Microsoft ecosystem and tools",
      "Emphasized collaborative achievements across teams",
      "Showcased customer-focused approach with examples",
      "Included metrics demonstrating product success",
      "Used clear, structured formatting with distinct sections"
    ],
    resumeContent: {
      personalInfo: {
        name: "Jamie Rivera",
        title: "Product Manager",
        email: "example@email.com",
        phone: "(555) 987-6543",
        location: "Seattle, WA",
        summary: "Customer-focused Product Manager with 5+ years of experience driving product strategy and execution across B2B and B2C platforms. Strong track record of delivering user-centered solutions that meet business objectives while enhancing customer experience."
      },
      education: [
        {
          institution: "University of Washington",
          degree: "Master of Business Administration",
          field: "Technology Management",
          dates: "2015 - 2017"
        },
        {
          institution: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Information Systems",
          dates: "2011 - 2015"
        }
      ],
      experience: [
        {
          company: "CloudSolutions Inc.",
          position: "Senior Product Manager",
          dates: "2019 - 2023",
          description: "Led cross-functional teams to develop and launch cloud-based enterprise productivity suite used by 300+ organizations.",
          highlights: [
            "Increased user retention by 37% through implementation of customer feedback program and feature prioritization",
            "Managed product roadmap resulting in 42% revenue growth over 2 years",
            "Collaborated with engineering, design, and marketing teams to launch 4 major product updates annually",
            "Conducted competitive analysis leading to strategic differentiation that captured 15% increased market share"
          ]
        },
        {
          company: "TechInnovate",
          position: "Product Manager",
          dates: "2017 - 2019",
          description: "Managed development and launch of mobile application focusing on team collaboration.",
          highlights: [
            "Drove product vision and strategy for collaboration platform with 100,000+ monthly active users",
            "Implemented agile methodology that accelerated development cycle by 35%",
            "Conducted user research sessions with 500+ participants to identify pain points and opportunities",
            "Launched key integration features that increased enterprise adoption by 28%"
          ]
        }
      ],
      skills: [
        "Product Strategy", "User Research", "Market Analysis", "Agile/Scrum", "SQL", "Product Analytics", "A/B Testing", "Wireframing", "Microsoft Azure", "Power BI", "Office 365", "JIRA", "Prioritization", "Cross-functional Leadership", "Stakeholder Management"
      ],
      projects: [
        {
          name: "Enterprise Integration Framework",
          description: "Led initiative to create enterprise integration platform connecting legacy systems with cloud applications.",
          highlights: [
            "Delivered solution that reduced manual data entry by 75% for customer organizations",
            "Created comprehensive documentation and training materials resulting in 90% user adoption",
            "Managed $1.2M budget and delivered project on time and under budget"
          ]
        },
        {
          name: "Customer Success Dashboard",
          description: "Conceptualized and delivered real-time customer success monitoring dashboard.",
          highlights: [
            "Unified 12 data sources into single view for customer support teams",
            "Reduced issue resolution time by 40% through improved visibility into customer usage patterns",
            "Implemented predictive analytics feature that identified at-risk accounts with 85% accuracy"
          ]
        }
      ],
      achievements: [
        "Product Innovation Award, CloudSolutions Inc. (2022)",
        "Speaker at ProductCon Seattle (2021)",
        "Microsoft Certified: Azure Fundamentals (2020)"
      ]
    }
  },
  {
    id: "3",
    company: "Amazon",
    role: "Software Development Engineer",
    result: "Accepted",
    highlights: [
      "Structured bullets as 'Accomplished X by implementing Y which led to Z'",
      "Connected achievements to Amazon's leadership principles",
      "Used metrics to quantify impact throughout",
      "Demonstrated ownership with end-to-end project examples",
      "Focused on customer-centric outcomes"
    ],
    resumeContent: {
      personalInfo: {
        name: "Taylor Patel",
        title: "Software Development Engineer",
        email: "example@email.com",
        phone: "(555) 345-6789",
        location: "San Francisco, CA",
        summary: "Results-driven Software Development Engineer with expertise in distributed systems and microservices architecture. Passionate about delivering scalable solutions that drive business growth while maintaining operational excellence."
      },
      education: [
        {
          institution: "Carnegie Mellon University",
          degree: "Master of Science",
          field: "Computer Science - Distributed Systems",
          dates: "2017 - 2019",
          gpa: "3.9/4.0"
        },
        {
          institution: "University of Illinois Urbana-Champaign",
          degree: "Bachelor of Science",
          field: "Computer Engineering",
          dates: "2013 - 2017",
          gpa: "3.85/4.0"
        }
      ],
      experience: [
        {
          company: "DataScale Technologies",
          position: "Senior Software Engineer",
          dates: "2020 - 2023",
          description: "Led development of high-throughput data processing systems handling petabytes of data for Fortune 500 clients.",
          highlights: [
            "Accomplished 99.99% system reliability by implementing distributed tracing and automated recovery mechanisms that reduced critical incidents by 72%",
            "Reduced operational costs by $1.2M annually by optimizing cloud resource usage and implementing auto-scaling policies based on traffic patterns",
            "Improved developer productivity by 45% through establishing CI/CD pipelines and standardizing development workflows across 12 teams",
            "Delivered data replication service processing 250TB daily with latency under 5ms by designing custom caching layer and optimizing database queries"
          ]
        },
        {
          company: "CloudInfra Inc.",
          position: "Software Engineer",
          dates: "2019 - 2020",
          description: "Developed and maintained core infrastructure services supporting e-commerce platform with $500M annual revenue.",
          highlights: [
            "Implemented inventory management system that reduced stockout incidents by 35% and increased order fulfillment rate to 99.7%",
            "Led migration from monolithic architecture to microservices, resulting in 65% faster deployment cycles",
            "Created automated testing framework that caught 85% of bugs before production deployment",
            "Mentored 4 junior engineers, with all receiving exceeds expectations on performance reviews"
          ]
        }
      ],
      skills: [
        "Java", "C++", "Python", "AWS", "DynamoDB", "S3", "Lambda", "EC2", "Kinesis", "Kafka", "Redis", "PostgreSQL", "Docker", "Kubernetes", "Terraform", "Microservices", "Distributed Systems", "High Availability", "System Design", "Performance Optimization"
      ],
      projects: [
        {
          name: "Distributed Log Analysis System",
          description: "Designed and implemented system processing 2TB of log data daily with sub-second query capabilities.",
          highlights: [
            "Architected end-to-end solution including data ingestion, processing, storage, and visualization",
            "Achieved 5x performance improvement compared to previous system while reducing infrastructure costs by 40%",
            "Implemented automated anomaly detection that identified critical issues 15 minutes faster than manual monitoring"
          ]
        },
        {
          name: "Fault-Tolerant Messaging Platform",
          description: "Built messaging service handling 50,000+ transactions per second with guaranteed delivery.",
          highlights: [
            "Designed system with zero data loss guarantees even during multiple node failures",
            "Implemented custom back-pressure mechanisms preventing system degradation during traffic spikes",
            "Created comprehensive monitoring dashboard reducing MTTR (Mean Time To Resolution) by 60%"
          ]
        }
      ],
      achievements: [
        "Patent pending: Method for Distributed Data Consistency in High-Traffic Systems (2022)",
        "Top contributor award, DataScale Technologies (2021)",
        "AWS Certified Solutions Architect - Professional (2020)"
      ]
    }
  },
  {
    id: "4",
    company: "MIT",
    role: "Graduate Program",
    result: "Accepted",
    highlights: [
      "Emphasized research experience and methodologies",
      "Highlighted interdisciplinary projects and approaches",
      "Listed relevant publications and academic achievements",
      "Showcased technical innovation with specific projects",
      "Focused on academic excellence with GPA and honors"
    ],
    resumeContent: {
      personalInfo: {
        name: "Jordan Chen",
        title: "Computer Science Graduate Candidate",
        email: "example@email.com",
        phone: "(555) 234-5678",
        location: "Boston, MA",
        summary: "Aspiring researcher in artificial intelligence and machine learning with focus on computer vision applications. Seeking to leverage solid academic foundation and research experience to contribute to cutting-edge AI research at MIT."
      },
      education: [
        {
          institution: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science with Minor in Mathematics",
          dates: "2018 - 2022",
          gpa: "3.95/4.0",
          achievements: [
            "Graduated Summa Cum Laude (top 2% of class)",
            "Dean's List all semesters",
            "Received John Smith Memorial Scholarship for academic excellence"
          ]
        }
      ],
      experience: [
        {
          company: "Berkeley Artificial Intelligence Research Lab",
          position: "Undergraduate Researcher",
          dates: "2020 - 2022",
          description: "Contributed to research on deep learning approaches for medical image analysis under Prof. Lisa Johnson.",
          highlights: [
            "Developed neural network architecture improving tumor detection accuracy by 12% compared to existing methods",
            "Co-authored paper accepted to Neural Information Processing Systems (NeurIPS) conference",
            "Collaborated with interdisciplinary team of 5 researchers across computer science and medical departments",
            "Presented research findings at undergraduate research symposium, awarded Best Presentation"
          ]
        },
        {
          company: "TechVision AI",
          position: "Research Intern",
          dates: "Summer 2021",
          description: "Contributed to computer vision team developing object recognition algorithms for autonomous systems.",
          highlights: [
            "Implemented real-time object tracking algorithm achieving 45fps on edge devices with 94% accuracy",
            "Created data augmentation pipeline that reduced training data requirements by 30%",
            "Collaborated with senior researchers to optimize model architecture, reducing inference time by 25%"
          ]
        }
      ],
      skills: [
        "Python", "TensorFlow", "PyTorch", "Computer Vision", "Machine Learning", "Deep Learning", "Mathematics", "C++", "CUDA", "Research Methodology", "Statistical Analysis", "Data Visualization", "LaTeX", "Algorithm Design", "Technical Writing", "Julia", "R"
      ],
      projects: [
        {
          name: "Self-Supervised Learning for Medical Imaging",
          description: "Research project exploring self-supervised pre-training for medical image segmentation with limited labeled data.",
          highlights: [
            "Achieved 88% accuracy with only 10% of labeled data compared to fully-supervised approaches",
            "Implemented novel contrastive learning approach specifically designed for medical imaging domain",
            "Published methodology as first author in undergraduate research journal"
          ]
        },
        {
          name: "Distributed Multi-Agent Reinforcement Learning Framework",
          description: "Developed framework for training multiple reinforcement learning agents in collaborative environments.",
          highlights: [
            "Created scalable system supporting 100+ simultaneous agents with shared experience replay",
            "Implemented curriculum learning approach accelerating convergence by 40%",
            "Open-sourced project with 500+ GitHub stars and 12 contributors"
          ]
        },
        {
          name: "Computational Neuroscience Project",
          description: "Interdisciplinary research connecting deep learning with cognitive science models of human vision.",
          highlights: [
            "Collaborated with neuroscience department to analyze neural network activations compared to fMRI data",
            "Identified specific network architectures that more closely match human visual processing pathways",
            "Presented findings at undergraduate interdisciplinary conference"
          ]
        }
      ],
      achievements: [
        "Co-author on paper: Self-Supervised Pre-training for Medical Image Segmentation (NeurIPS 2022)",
        "1st Place, Berkeley AI Hackathon (2021)",
        "National Science Foundation Undergraduate Research Fellowship (2020-2022)",
        "Perfect score on Graduate Record Examination (GRE) Quantitative section"
      ]
    }
  }
];
// Projects data
const projectsData = [
    {
        id: 1,
        title: "QuickShop - AI E-commerce Platform",
        description: "Full-stack e-commerce platform with AI-powered product search, personalized recommendations, integrated Stripe payments, and complete AWS/Vercel deployment.",
        image: "assets/images/quickshop.jpg",
        liveLink: "https://www.quickshop.fit",
        githubLink: "#",
        videoLink: null,
        technologies: ["React", "Node.js", "Prisma", "PostgreSQL", "AI/ML", "Stripe", "AWS"],
        category: "fullstack",
        featured: true
    },
    {
        id: 2,
        title: "City Digital Twin Platform",
        description: "Real-time 3D city visualization with AI-driven analysis, weather models, and spatial queries. Interactive WebGL performance with custom shaders.",
        image: "assets/images/digitwin.jpg",
        liveLink: "http://digitwin-platform-frontend.s3-website-ap-southeast-1.amazonaws.com",
        githubLink: "#",
        videoLink: null,
        technologies: ["React", "Three.js", "PostgreSQL", "PostGIS", "WebGL", "Python"],
        category: "3d",
        featured: true
    },
    {
        id: 3,
        title: "LAI Games - Commercial VR Game",
        description: "Lead programmer for commercial VR game. Designed modular gameplay systems, networked features, and optimized VR render pipelines.",
        image: "assets/images/vr-game.jpg",
        liveLink: null,
        githubLink: "#",
        videoLink: "https://www.youtube.com/embed/-jhhUSG8SOY",
        technologies: ["Unity", "VR", "C#", "C++", "AWS", "Networking"],
        category: "vr",
        featured: true
    },
    {
        id: 4,
        title: "AR Property Visualization",
        description: "Interactive AR/VR platform for property and industrial visualization with dynamic 3D content delivery frameworks.",
        image: "assets/images/ar-platform.jpg",
        liveLink: null,
        githubLink: "#",
        videoLink: "https://www.youtube.com/embed/HPfGbeWVkPI",
        technologies: ["AR", "Unity", "React", "Node.js", "WebRTC"],
        category: "ar",
        featured: true
    },
    {
        id: 5,
        title: "Virtual Property Platform",
        description: "3D virtual property viewing platform combining Unity and React for immersive real estate experiences with real-time collaboration.",
        image: "assets/images/virtual-property.jpg",
        liveLink: null,
        githubLink: "#",
        videoLink: "https://www.youtube.com/embed/LfgV6WtZgyA",
        technologies: ["Unity", "React", "Node.js", "Three.js", "WebGL"],
        category: "3d",
        featured: false
    },
    {
        id: 6,
        title: "Dr. Panda Restaurant 2",
        description: "Interactive educational cooking game for children. Led team developing game logic, AI, and shader effects for smooth cross-device performance.",
        image: "assets/images/dr-panda.jpg",
        liveLink: null,
        githubLink: "#",
        videoLink: "https://www.youtube.com/embed/O8Wlk_8crgI",
        technologies: ["Unity", "C#", "Animation", "Game AI", "iOS/Android"],
        category: "game",
        featured: false
    }
];

// Function to create project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);

    // Determine what to show in the image area
    let mediaContent = '';
    if (project.videoLink) {
        // If there's a video, show it as an embedded iframe
        mediaContent = `
            <iframe
                src="${project.videoLink}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                style="width: 100%; height: 100%;">
            </iframe>
        `;
    } else if (project.image) {
        // Otherwise show the image
        mediaContent = `
            <img src="${project.image}" alt="Project Image" onerror="this.src='https://via.placeholder.com/400x250/6366f1/ffffff?text=Project'">
            <div class="project-overlay">
                <div class="project-links">
                    ${project.liveLink ? `
                        <a href="${project.liveLink}" target="_blank" class="project-link" title="View Live">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    ` : ''}
                    ${project.githubLink && project.githubLink !== '#' ? `
                        <a href="${project.githubLink}" target="_blank" class="project-link" title="View Code">
                            <i class="fab fa-github"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    card.innerHTML = `
        <div class="project-image">
            ${mediaContent}
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

// Function to load projects
function loadProjects(filterCategory = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');

    if (!projectsGrid) return;

    // Clear existing projects
    projectsGrid.innerHTML = '';

    // Filter projects
    let filteredProjects = projectsData;
    if (filterCategory !== 'all') {
        filteredProjects = projectsData.filter(project => project.category === filterCategory);
    }

    // Sort featured projects first
    filteredProjects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    // Create and add project cards
    filteredProjects.forEach((project, index) => {
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);

        // No animation needed - cards will be visible immediately
    });
}
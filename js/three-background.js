// Three.js 3D Background Animation
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

function init3DBackground() {
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.001);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('canvas3d'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    createParticles();

    // Create geometric shapes
    createGeometricShapes();

    // Add lights
    addLights();

    // Event listeners
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    // Create random particles
    for (let i = 0; i < 1000; i++) {
        vertices.push(
            Math.random() * 200 - 100,
            Math.random() * 200 - 100,
            Math.random() * 200 - 100
        );

        // Random colors with purple/blue theme
        const color = new THREE.Color();
        color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5);
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createGeometricShapes() {
    // Create floating geometric shapes
    const shapes = [];

    // Icosahedron
    const icosahedronGeometry = new THREE.IcosahedronGeometry(5, 0);
    const icosahedronMaterial = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(-30, 10, -20);
    scene.add(icosahedron);
    shapes.push(icosahedron);

    // Torus
    const torusGeometry = new THREE.TorusGeometry(4, 1.5, 8, 50);
    const torusMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(30, -10, -30);
    scene.add(torus);
    shapes.push(torus);

    // Octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(6, 0);
    const octahedronMaterial = new THREE.MeshPhongMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(0, 20, -40);
    scene.add(octahedron);
    shapes.push(octahedron);

    // Store shapes for animation
    window.geometricShapes = shapes;
}

function addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Point lights
    const pointLight1 = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight1.position.set(50, 50, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1, 100);
    pointLight2.position.set(-50, -50, -50);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xec4899, 1, 100);
    pointLight3.position.set(0, 30, 0);
    scene.add(pointLight3);
}

function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
    }

    // Animate geometric shapes
    if (window.geometricShapes) {
        window.geometricShapes.forEach((shape, index) => {
            shape.rotation.x += 0.005 * (index + 1) * 0.5;
            shape.rotation.y += 0.005 * (index + 1) * 0.5;
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.05;
        });
    }

    // Mouse interaction
    camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 10 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Alternative simpler particle system for mobile/low-performance devices
function initSimpleBackground() {
    const canvas = document.getElementById('canvas3d');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.5
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
            ctx.fill();

            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around screen
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize based on device performance
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is available and device can handle it
    if (typeof THREE !== 'undefined' && window.innerWidth > 768) {
        init3DBackground();
    } else {
        // Fallback to simple canvas animation
        initSimpleBackground();
    }
});
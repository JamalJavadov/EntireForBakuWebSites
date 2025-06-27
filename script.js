if (window.matchMedia('(min-width: 769px)').matches) {
    let scene, camera, webGLRenderer;
    let particles;
    const mouse = new THREE.Vector2();

    function init() {
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 100, 2000);
        
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2500);
        camera.position.z = 800; 

        const webglContainer = document.getElementById('webgl-container');
        webGLRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        webglContainer.appendChild(webGLRenderer.domElement);
        
        createParticles();
        
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mousemove', onMouseMove);

        animate();
    }

    function createParticles() {
        const particlesGeometry = new THREE.BufferGeometry;
        const count = 5000;
        const positions = new Float32Array(count * 3);
        const area = 2500;
        for (let i = 0; i < count * 3; i++) { 
            positions[i] = (Math.random() - 0.5) * area; 
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({ 
            size: 1.5, 
            color: 0xaaaaee, 
            blending: THREE.AdditiveBlending, 
            transparent: true,
            opacity: 0.8
        });
        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function animate() {
        requestAnimationFrame(animate);
        
        const parallaxX = mouse.x * 40;
        const parallaxY = -mouse.y * 40;
        camera.position.x += (parallaxX - camera.position.x) * 0.03;
        camera.position.y += (parallaxY - camera.position.y) * 0.03;
        
        const elapsedTime = Date.now() * 0.0001;
        if(particles) particles.rotation.y = -elapsedTime * 0.15;
        
        webGLRenderer.render(scene, camera);
    }
    
    init();

}

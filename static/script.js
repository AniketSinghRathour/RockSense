document.addEventListener('DOMContentLoaded', () => {
    // Interactive gradient background
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    };

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(8, 10, 15, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(8, 10, 15, 0.8)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// Add this to your script.js file
document.addEventListener('DOMContentLoaded', () => {
    // Get modal elements
    const signupModal = document.querySelector('.signup-modal');
    const loginModal = document.querySelector('.login-modal');
    const signupBtn = document.querySelector('.signup-btn');
    const loginBtn = document.querySelector('.login-btn');
    const closeBtns = document.querySelectorAll('.close-btn');
    const navButtons = document.querySelector('.nav-buttons');

    // Show modals
    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            signupModal.style.display = 'none';
            loginModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === signupModal || e.target === loginModal) {
            signupModal.style.display = 'none';
            loginModal.style.display = 'none';
        }
    });

    // Handle signup
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Store user data (in real app, this would be sent to a server)
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        signupModal.style.display = 'none';
        updateUIForLoggedInUser(name);
    });

    // Handle login
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Check credentials (in real app, this would verify with a server)
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email === email && user.password === password) {
            loginModal.style.display = 'none';
            updateUIForLoggedInUser(user.name);
        } else {
            alert('Invalid credentials');
        }
    });

    // Update UI after login
    function updateUIForLoggedInUser(name) {
        navButtons.innerHTML = `
            <div class="user-profile">
                Hi, <span>${name.split(' ')[0]}</span>
            </div>
        `;
    }

    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        updateUIForLoggedInUser(user.name);
    }
});


// this for api call

document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing code) ...

    let ws = null;
    const rockName = 'Granite'; // Replace with the currently displayed rock type

    function connectWebSocket() {
        const wsUrl = 'ws://your-server.com/rocks/realtime'; // Replace with your server URL
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('WebSocket connection opened.');
            // Send a message to the server to subscribe to updates for the rock type
            ws.send(JSON.stringify({ action: 'subscribe', rock: rockName }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received data:', data);
            updateRockData(data); // Call function to update UI with new data
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            // Handle errors (e.g., reconnect attempts)
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
            // Handle connection closure (e.g., reconnect attempts)
        };
    }

    function updateRockData(data) {
        // Update your charts, text content, etc., based on the received `data`
        document.getElementById('description').textContent = data.description; 
        // ... (Update other elements like composition, properties, etc.)

        // Update Chart.js charts (if you are using them)
        if (charts.composition) {
            charts.composition.data.datasets[0].data = data.composition.values;
            charts.composition.update();
        }
        if (charts.properties) {
            charts.properties.data.datasets[0].data = data.properties.values;
            charts.properties.update();
        }
    }

    // Call connectWebSocket() to establish the WebSocket connection
    connectWebSocket();

    // ... (rest of your code) ...
});
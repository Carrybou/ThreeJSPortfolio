import { Raycaster, Vector2 } from 'three';
        import { updateUI } from './UI.js';

        export function startGame(scene, camera, portfolio) {
            let lives = 3;
            let time = 0;
            let completedProjects = [];
            let currentIndex = 0;

            // Initialize raycaster and mouse
            const raycaster = new Raycaster();
            const mouse = new Vector2();

            // Show the UI
            const gameUI = document.getElementById('game-ui');
            gameUI.style.display = 'block';

            // Display the first project to match
            const projectDisplay = document.getElementById('current-project');
            function updateProjectDisplay() {
                if (currentIndex < portfolio.length) {
                    projectDisplay.textContent = `Match: ${portfolio[currentIndex].title}`;
                } else {
                    projectDisplay.textContent = '';
                }
            }
            updateProjectDisplay();

            // Start the timer
            const timerInterval = setInterval(() => {
                time++;
                updateUI(lives, time, completedProjects);
            }, 1000);

            // Handle project click
            function handleProjectClick(event) {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(scene.children);

                if (intersects.length > 0) {
                    const clickedObject = intersects[0].object;
                    const projectTitle = clickedObject.userData?.title;

                    console.log('Clicked Project Title:', projectTitle);
                    console.log('Expected Project Title:', portfolio[currentIndex]?.title);
                    console.log('Current Index:', currentIndex);

                   // Load audio files
                    const correctSound = new Audio('components/import/sounds/correct.mp3');
                    const incorrectSound = new Audio('components/import/sounds/incorrect.mp3');

                    if (projectTitle === portfolio[currentIndex]?.title) {
                        console.log('Correct project clicked!');
                        correctSound.play(); // Play correct sound
                        completedProjects.push(projectTitle);
                        currentIndex++;
                        updateProjectDisplay();

                        if (currentIndex === portfolio.length) {
                            endGame('You win!');
                        }
                    } else {
                        lives--;
                        console.log('Incorrect project clicked! Lives left:', lives);
                        incorrectSound.play(); // Play incorrect sound
                        if (lives === 0) {
                            endGame('Game over!');
                        }
                    }
                    updateUI(lives, time, completedProjects);
                }
            }
            // End the game
            function endGame(message) {
                clearInterval(timerInterval);
                window.removeEventListener('click', handleProjectClick);

                if (message === 'You win!') {
                    // Create and display the popup form
                    const popup = document.createElement('div');
                    popup.id = 'popup';
                    popup.style.position = 'fixed';
                    popup.style.top = '50%';
                    popup.style.left = '50%';
                    popup.style.transform = 'translate(-50%, -50%)';
                    popup.style.padding = '20px';
                    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                    popup.innerHTML = `
                            <h2>Congratulations! You won!</h2>
                            <p>Your time: ${time} seconds</p>
                            <form id="signup-form">
                                <label for="email">Email:</label>
                                <input type="email" id="email" name="email" required>
                                <label for="password">Password:</label>
                                <input type="password" id="password" name="password" required>
                            </form>
                    `;
                    document.body.appendChild(popup);

                    // Handle form submission
                    const form = document.getElementById('signup-form');
                    form.addEventListener('submit', async (event) => {
                        event.preventDefault();
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;

                        try {
                            const response = await fetch('http://127.0.0.1:8000/register', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email, password, score: time }),
                            });

                            if (response.ok) {
                                alert('Account created and score saved successfully!');
                                popup.remove(); // Remove the popup
                            } else {
                                const error = await response.json();
                                alert(`Error: ${error.message}`);
                            }
                        } catch (err) {
                            console.error('Error:', err);
                            alert('An error occurred while creating the account.');
                        }
                    });
                } else {
                    alert(message);
                }
            }

            // Add event listener for clicks
            window.addEventListener('click', handleProjectClick);
        }
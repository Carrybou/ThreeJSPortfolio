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
                alert(message);
                clearInterval(timerInterval);
                window.removeEventListener('click', handleProjectClick);
            }

            // Add event listener for clicks
            window.addEventListener('click', handleProjectClick);
        }
export function updateUI(lives, time, completedProjects) {
    document.getElementById('lives').textContent = lives;
    document.getElementById('time').textContent = time;

    const completedList = document.getElementById('completed-projects');
    completedList.innerHTML = ''; // Clear the list
    completedProjects.forEach((project) => {
        const li = document.createElement('li');
        li.textContent = project;
        completedList.appendChild(li);
    });
}
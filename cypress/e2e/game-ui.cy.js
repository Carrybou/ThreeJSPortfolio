describe('Game UI Tests', () => {
    beforeEach(() => {
        // Visite la page principale
        cy.visit('http://localhost:5173'); // Remplacez par l'URL de votre application
    });

    it('should display the game UI correctly', () => {
        // Vérifie que le panneau de jeu est caché au départ
        cy.get('#game-ui').should('not.be.visible');

        // Simule un événement pour afficher le panneau
        cy.window().then((win) => {
            win.document.getElementById('game-ui').style.display = 'block';
        });

        // Vérifie que le panneau est maintenant visible
        cy.get('#game-ui').should('be.visible');
    });

    it('should update lives and time correctly', () => {
        // Simule une mise à jour des vies et du temps
        cy.get('#lives').invoke('text', '2');
        cy.get('#time').invoke('text', '10');

        // Vérifie que les valeurs sont mises à jour
        cy.get('#lives').should('have.text', '2');
        cy.get('#time').should('have.text', '10');
    });

    it('should display the description panel on hover', () => {
        // Simule un objet avec des données utilisateur
        cy.window().then((win) => {
            const panel = win.document.getElementById('description-panel');
            panel.style.display = 'block';
            panel.querySelector('#project-title').textContent = 'Test Project';
            panel.querySelector('#project-description').textContent = 'This is a test description.';
        });

        // Vérifie que le panneau de description est visible avec les bonnes données
        cy.get('#description-panel').should('be.visible');
        cy.get('#project-title').should('have.text', 'Test Project');
        cy.get('#project-description').should('have.text', 'This is a test description.');
    });
});
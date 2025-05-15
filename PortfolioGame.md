# Note d'intention : Jeu interactif en Three.js

## **But du jeu**
L'objectif de ce jeu est de proposer une expérience interactive et immersive où les joueurs doivent identifier et sélectionner des projets spécifiques dans un environnement 3D. Le jeu met à l'épreuve la mémoire, la précision et la gestion du temps des joueurs, tout en offrant une expérience divertissante et éducative.

## **Objectif du joueur**
Le joueur doit :
1. Identifier le projet correct à partir d'une liste donnée.
2. Cliquer sur le projet correspondant dans la scène 3D.
3. Compléter tous les projets avant d'épuiser ses vies et le plus rapidement.

Le jeu se termine lorsque :
- Le joueur identifie tous les projets correctement (Victoire).
- Le joueur perd toutes ses vies (Game Over).

## **Choix de game design**
### **1. Design visuel**
- **Environnement 3D** : L'utilisation de Three.js permet de créer une expérience immersive et visuellement attrayante.
- **Interface moderne** : Une UI épurée avec des dégradés, des coins arrondis et des couleurs vives pour améliorer l'expérience utilisateur.
- **Feedback dynamique** : Des retours visuels et sonores (sons pour les actions correctes/incorrectes) maintiennent l'engagement du joueur.

### **2. Mécaniques de jeu**
- **Chronomètre** : Un compte à rebours ajoute de l'urgence et encourage les joueurs à agir rapidement, augmentant ainsi le défi.
- **Système de vies** : Les joueurs disposent d'un nombre limité de vies, ce qui les pousse à être attentifs et stratégiques.
- **Suivi de progression** : L'interface affiche le projet actuel, les vies restantes, le temps écoulé et les projets complétés, permettant au joueur de suivre sa progression.

### **3. Interactions**
- **Contrôles à la souris** : Les joueurs interagissent avec le jeu en cliquant sur des objets dans la scène 3D, rendant l'expérience intuitive.
- **Descriptions contextuelles** : Un panneau de description fournit des informations supplémentaires sur les projets, renforçant l'aspect éducatif. (non fonctionnel dans la version final)

### **4. Feedback sonore**
- **Sons correct/incorrect** : Des indices sonores immédiats renforcent les actions du joueur et augmentent l'immersion.

## **Public cible**
Ce jeu s'adresse à :
- Les amateurs d'expériences interactives en 3D.
- Les joueurs appréciant les défis basés sur la mémoire et la précision.
- Les développeurs ou designers cherchant de l'inspiration pour présenter un portfolio.

## **Implémentation technique**
- **Three.js** : Pour le rendu de l'environnement 3D et la gestion des interactions.
- **JavaScript** : Pour la logique principale du jeu (chronomètre, mise à jour de l'UI, gestion des événements).
- **HTML/CSS** : Pour la structure et le style de l'interface utilisateur.
- **Cypress** : Pour les tests end-to-end, garantissant une expérience fluide et sans bugs.

## **Améliorations futures**
- **Niveaux** : Ajouter plusieurs niveaux avec une difficulté croissante.
- **Classement** : Intégrer un tableau des scores pour encourager la compétition entre joueurs.
- **Support mobile** : Optimiser le jeu pour les appareils mobiles afin d'élargir l'audience.
- **Effets visuels supplémentaires** : Ajouter des animations ou des effets de particules pour les actions correctes/incorrectes.

Ce jeu combine amusement, défi et interactivité, offrant une expérience unique et mémorable aux joueurs.
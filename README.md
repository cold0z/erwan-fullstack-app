# Projet Full-Stack Next.js
Ce projet a été développé dans le cadre d'un test technique pour un poste de chef de projet Full-Stack. L'objectif était de réaliser un outil permettant de visualiser les cours des actions Google et Amazon sur une année, ainsi que de proposer des stratégies d'achat et de vente pour optimiser le profit.

# Technologies utilisées
## Front-end : Next.js, TypeScript, React, Redux, TailwindCSS
Back-end : Express, MongoDB, TypeScript, Jest
Fonctionnalités
Visualisation du graphique sur un an du prix des actions
Les données sont stockées dans les fichiers GOOGLE.json et AMAZON.json, et sont directement stockées dans une base de données MongoDB. Les données stockées comprennent :

timestamp : date du jour sous format timestamp
highestPriceOfTheDay : le prix du jour au plus haut
lowestPriceOfTheDay : le prix du jour au plus bas
La page principale affiche le graphique des prix moyens des actions pour chaque mois. La visualisation est réalisée grâce à la librairie react-chartjs-2.

# Stratégies d'achat et de vente pour optimiser le profit
Fonctionnalité 1 : Le meilleur moment pour acheter et vendre
Aymen et Anouar ont chacun 100 000€ le 1er janvier. Aymen veut acheter/vendre uniquement des actions Amazon et Anouar préfère Google.

Le back-end de l'application affiche à quelle date Aymen et Anouar auraient dû acheter et à quelle date il aurait dû vendre pour faire le meilleur profit, ainsi que le bénéfice réalisé. Ils n’ont droit qu'à une seule action d'achat et une seule action de vente sur l’année.

Fonctionnalité 2 : Le meilleur moment pour acheter et vendre (Version avancée)
Erwan à lui aussi 100 000€ le 1 er janvier. Il veut acheter/vendre des actions Google et Amazon. Erwan achète et vend une fois par jour des actions Google et Amazon. Il n’est pas obligé d’acheter ou de vendre tous les jours si les prix ne sont pas intéressants.

Le back-end de l'application affiche la liste des actes d’achat ou de vente d’Erwan pour obtenir le meilleur gain, ainsi que le gain à la fin de l’année. Un timer est également affiché pour mesurer le temps pris par l'algorithme. L'objectif est d'optimiser au maximum le temps de calcul de l'algorithme.

# Installation et exécution
Cloner le dépôt Github


git clone https://github.com/cold0z/erwan-fullstack-app.git
Installer les dépendances

cd {repository}
npm install

Exécuter l'application en mode développement

npm run dev
L'application peut également être déployée sur une plateforme de votre choix.
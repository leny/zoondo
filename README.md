# leny/zoondo

> Implementing an old boardgame for the web (following a YouTube serie).

* * *

> **NOTE:** this repository host the code of a game developped as the subject of a serie of [YouTube videos](https://www.youtube.com/playlist?list=PLiqWBsRPUup73D6Mew2s1XsoyXp6eaHjp). Since the videos are in *french*, this README will be too.

* * *

## Introduction

Bienvenue sur le repository de Zoondo, la version en ligne du jeu de société du même nom.

> ☝️ Ce projet *sans but commercial*, à vocation pédagogique, n'est lié en aucune façon à [**Matagot**](https://www.matagot.com), détenteur des droits de Zoondo.

Les sources de ce repository sont conjointes à une [série de vidéos](https://www.youtube.com/playlist?list=PLiqWBsRPUup73D6Mew2s1XsoyXp6eaHjp) explicatives du processus, hébergées sur YouTube.

## Zoondo

Zoondo est un jeu de cartes / jeu de plateau. Selon la [théorie des jeux combinatoires](https://fr.wikipedia.org/wiki/Th%C3%A9orie_des_jeux_combinatoires), c'est un [jeu de stratégie abstraite](https://fr.wikipedia.org/wiki/Jeu_de_strat%C3%A9gie_combinatoire_abstrait) à [information non parfaite](https://fr.wikipedia.org/wiki/Th%C3%A9orie_des_jeux#Information_compl%C3%A8te_et_information_incompl%C3%A8te).

### Règles du jeu

Les règles du jeu originales sont [retranscrites ici](./docs/gamerules.md).

## Documentation

> **⚠️ ATTENTION:** la présente documentation se réfère à la _version de développement_ de Zoondo. La version finale sera _probablement_ accessible sous forme d'un site en ligne.

### Prérequis

Installer et faire fonctionner la version *dev* de Zoondo n'est pas très sorcier. Il vous faut juste quelques *connaissances de base* avec le terminal, et [node.js installé](https://nodejs.org/en/download/) sur votre machine (version 12 ou plus).

### Installation

Pour commencer, téléchargez le fichier zip correspondant à la version que vous voulez tester. Les versions sont listées sur la page [releases](https://github.com/leny/zoondo/releases) du repo GitHub.

Dézipper le fichier et utilisez votre terminal pour naviguer dans le dossier de Zoondo. Vous devriez être dans un dossier comprenant un dossier `src`, ainsi que les fichiers `package.json`, `package-lock.json` et quelques autres.

De là, lancez les commandes suivantes :

- `npm ci` (installe les dépendances)
- `npm run build` (build le code serveur et le code client)

C'est tout pour l'installation.

### Exécution

Pour exécuter Zoondo et faire votre première partie, lancez simplement la commande `npm start` depuis le dossier de Zoondo.

De là, le jeu est accessible sur l'adresse [http://localhost:8000](http://localhost:8000), depuis votre navigateur web.

> ☝️ Durant le développement, Zoondo n'est testé que sur **Google Chrome**.

Pour lancer une partie, vous devez être deux joueurs. Vous pouvez soit jouer avec deux onglets sur le même navigateur, ou, sur le même réseau local, utiliser l'IP locale de la machine hôte (la plupart du temps quelque chose comme `192.168.0.XXX`) pour acceder au jeu depuis une autre machine.

En ligne, vous pouvez également utiliser [ngrok](https://ngrok.com), mais ça sort un peu de cette documentation.

Pour couper le serveur de Zoondo en fin de partie, il vous suffit de faire `CTRL+C` dans le terminal.

## Fonctionnalités

### Application/écrans

- [x] Écran d'accueil
- [x] Sélection de tribu
- [ ] Création de tribu
- [ ] Match-making
	- [x] Aléatoire
	- [ ] Invitation
- [ ] IA joueur

### Règles

- [x] Placement de tribu
- [x] Déplacement
  - [x] Déplacement normal
  - [x] Déplacement spécial
- [x] Combat
  - [x] Choix
  - [x] Résolution
	  - [x] Égalité
	  - [x] Victoire/défaite
	  - [x] Pouvoir
- [ ] Atouts
- [ ] Renforts
- [x] Obstacles
- [ ] Conditions de victoire
    - [x] Élimination de l'emblème
    - [ ] _Gamelock_

### Tribus

- [ ] Europa
	- [ ] Boarix - Tribu de Cloboulon
	- [ ] Warus - Tribu de Harold de Jarl
	- [ ] Monkus - Tribu de King Louis
	- [x] Rhinogoths - Tribu de Goolgoth I
- [ ] Gandzoreille
	- [ ] Zools - Tribu de Mama Zool
	- [ ] Zyons - Tribu de Jadu
	- [ ] Krokokos - Tribu de Aligofis IV
	- [ ] Pungs - Tribu de Ali Big Scourge
- [ ] UZA
	- [ ] Koyotos - Tribu de Zapatas
	- [ ] Turkys - Tribu de Jacksoon
	- [ ] Zumanbeens - Tribu de Tatatanka
	- [ ] Sharkoïs - Tribu de Big White
- [ ] Ziatic
	- [ ] Rapons - Tribu de Shotgun
	- [ ] Pandees - Tribu de Zoon-li
	- [ ] Momoots - Tribu de Yoga
	- [ ] Krusers - Tribu de Little Richard
- [ ] Straly
	- [ ] Leopardians - Tribu de Miss Kaiser
	- [ ] Jailrabbits - Tribu de Scareface Wilson
	- [ ] Kasorenes - Tribu de Tall K
	- [ ] Tugeshes - Tribu de Monzignore
- [ ] Gandent
	- [ ] Konkistators - Tribu de Kabull
	- [ ] Pekles - Tribu de Miss Zery
	- [ ] Thorinks - Tribu de Don Nythorink
	- [ ] Yetis - Tribu de Captain Migou
- [ ] Donuts
	- [ ] Techno-Gambas - Tribu de Big Stratoshrimp
	- [ ] Dinorigenes - Tribu de Sisit Rex
	- [ ] Cyber-Poulpes - Tribu de Kraken
	- [ ] Hell's Sheepies - Tribu de Bêêêl Vils
- [ ] Europa, le retour
	- [ ] Cocoléoniens - Tribu de Cocoléon
	- [ ] Zhypos - Tribu de Popotin
	- [ ] Warus - Tribu de Bris-Gläss
	- [ ] Rhinogoths - Tribu de Maître Günter
	- [ ] Monkus - Tribu de Makak 1er
	- [ ] Boarix - Tribu de Kariboorik
- [ ] Bôplatô
	- [ ] Obstacles du Bôplatô

## Roadmap

La roadmap est gêrée sous la forme d'un [GitHub Project](https://github.com/leny/zoondo/projects/1).

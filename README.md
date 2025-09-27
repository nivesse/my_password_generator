# Générateur de mots de passe / passphrases — Vue 3

**Projet** : Générateur de mots de passe convivial et sécurisé, côté client (Vue 3 + Vite). L'application produit des mots de passe et passphrases à partir d'un dictionnaire (possibilité d'importer un `.txt`). Rien n'est enregistré sur le disque ni envoyé à un serveur.

---

## Fonctionnalités

* Génération de passphrases basées sur un dictionnaire (mode "nombre de mots").
* Mode "longueur minimale" (génère des mots jusqu'à atteindre la longueur demandée).
* Options : séparateur, capitalisation, ajout d'un nombre aléatoire, ajout d'un symbole.
* Interface responsive et sobre.
* Multilingue (Français / English) via `vue-i18n`.
* Import optionnel d'un dictionnaire local (`.txt`, 1 mot par ligne) — chargé en mémoire uniquement.
* Génération cryptographiquement sécurisée via `crypto.getRandomValues`.

---

## Arborescence recommandée

```
my-password-app/
├─ public/
│  └─ dicts/
│     └─ fr.txt          # dictionnaire français (1 mot par ligne)
├─ src/
│  ├─ components/
│  │  └─ PasswordGenerator.vue
│  ├─ i18n.js
│  ├─ main.js
│  └─ App.vue
├─ package.json
└─ README.md
```

---

## Prérequis

* Node.js 16+ (ou version LTS recommandée)
* npm (ou yarn / pnpm)

---

## Installation rapide (Vite)

1. Créer le projet avec Vite (template Vue) :

```bash
npm create vite@latest my-password-app -- --template vue
cd my-password-app
```

2. Installer les dépendances :

```bash
npm install
npm install vue-i18n@9
```

3. Copier les fichiers du composant et de configuration :

* `src/components/PasswordGenerator.vue` (composant principal) — code fourni dans le projet.
* `src/i18n.js` — configuration `vue-i18n` (messages FR/EN).
* `src/main.js` — enregistrement d'i18n et montage de l'app.
* `public/dicts/fr.txt` — dictionnaire français (1 mot par ligne). Placez le fichier dans `public/dicts/fr.txt`.

4. Lancer le serveur de développement :

```bash
npm run dev
```

Ouvrez l'URL indiquée (par défaut `http://localhost:5173`).

---

## Utilisation

* Sélectionnez le mode (`Nombre de mots` ou `Longueur minimale`).
* Choisissez le séparateur et les options (majuscule, ajouter nombre, ajouter symbole).
* Cliquez sur **Générer**.
* Copier le mot de passe avec **Copier** (utilise `navigator.clipboard`).
* Importez un dictionnaire personnalisé via l'input fichier si besoin (1 mot par ligne).

---

## Dictionnaire FR

* Le projet tente de charger `/dicts/fr.txt` depuis le répertoire `public/` au démarrage.
* Si `fr.txt` est présent, il remplace la liste embarquée par défaut et est utilisé pour la génération.
* Format attendu : un mot par ligne, encodage UTF-8.
* Conseil : préférez des mots de longueur moyenne (4+ caractères) et évitez d'inclure des données personnelles.

---

## Sécurité & confidentialité

* **Rien n'est enregistré** par défaut : ni `localStorage`, ni `IndexedDB`, ni envoi réseau.
* L'entropie provient de `crypto.getRandomValues` (API Web Crypto) — adaptée pour la génération de secrets.
* Ne loggez jamais en production les mots de passe générés (`console.log`).
* Le copier dans le presse-papiers dépend des autorisations du navigateur.
* Si vous ajoutez une fonctionnalité d'export (fichier local), affichez un avertissement clair que le fichier contient des secrets.

---

## Build & déploiement

1. Construire :

```bash
npm run build
```

2. Prévisualiser :

```bash
npm run preview
```

3. Déployer le dossier `dist/` sur un hébergeur statique : Netlify, Vercel, GitHub Pages, ou tout serveur web statique.

---

## Améliorations possibles (roadmap)

* Ajouter d'autres langues et charger dynamiquement les fichiers de traduction.
* Remplacer le mini-i18n interne par `vue-i18n` (déjà intégré dans la version proposée).
* Ajouter un indicateur visuel d'entropie (barre + couleur) avec seuils recommandés.
* Permettre la sélection de catégories de mots (noms, adjectifs, verbes

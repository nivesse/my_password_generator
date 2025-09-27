// /src/i18n.js
import { createI18n } from "vue-i18n";

const messages = {
  fr: {
    title: "Générateur de mots de passe",
    lang: "Langue",
    settings: "Paramètres",
    mode: "Mode",
    modeWords: "Nombre de mots",
    modeLength: "Longueur minimale (caractères)",
    numWords: "Nombre de mots",
    minLength: "Longueur minimale",
    separator: "Séparateur",
    sepSpace: "Espace",
    sepNone: "Aucun",
    capitalize: "Mettre une majuscule au début de chaque mot",
    appendNumber: "Ajouter un nombre",
    appendSymbol: "Ajouter un symbole",
    importDict: "Importer un dictionnaire (.txt — 1 mot par ligne)",
    importHint:
      "Le dictionnaire reste en mémoire tant que la page est ouverte — rien n'est enregistré.",
    generate: "Générer",
    copy: "Copier",
    clear: "Effacer",
    output: "Mot de passe généré",
    length: "Longueur",
    entropy: "Entropie approx.",
    bits: "bits",
    details: "Détails / Conseils",
    noteNoSave: "Rien n'est enregistré sur le disque ni envoyé au serveur.",
    notePassphrase:
      'Utilisez le mode "Nombre de mots" pour des passphrases mémorisables.',
    noteImport:
      "Importer un dictionnaire en français améliore la convivialité pour les utilisateurs francophones.",
    footer:
      "Génération côté client — utilise crypto.getRandomValues pour random sécurisé.",
  },
  en: {
    title: "Password & Passphrase Generator",
    lang: "Language",
    settings: "Settings",
    mode: "Mode",
    modeWords: "Number of words",
    modeLength: "Minimum length (chars)",
    numWords: "Number of words",
    minLength: "Minimum length",
    separator: "Separator",
    sepSpace: "Space",
    sepNone: "None",
    capitalize: "Capitalize words",
    appendNumber: "Append number",
    appendSymbol: "Append symbol",
    importDict: "Import dictionary (.txt — 1 word per line)",
    importHint:
      "Dictionary stays in memory while the page is open — nothing is saved.",
    generate: "Generate",
    copy: "Copy",
    clear: "Clear",
    output: "Generated password",
    length: "Length",
    entropy: "Estimated entropy",
    bits: "bits",
    details: "Details / Tips",
    noteNoSave: "Nothing is stored on disk or sent to a server.",
    notePassphrase: 'Use "Number of words" for memorable passphrases.',
    noteImport:
      "Importing a local dictionary improves usability for your language.",
    footer:
      "Client-side generation — uses crypto.getRandomValues for secure randomness.",
  },
};

export const i18n = createI18n({
  // important: enable composition mode so useI18n() works
  legacy: false,
  // optional: allow global $t in Options API / templates if you want
  globalInjection: true,
  locale:
    navigator.language && navigator.language.startsWith("fr") ? "fr" : "en",
  fallbackLocale: "en",
  messages,
});

<template>
    <div class="gen">
        <header class="header">
            <h1>{{ t("title") }}</h1>
            <div class="lang-switch">
                <label for="lang">{{ t("lang") }}</label>
                <select
                    id="lang"
                    v-model="currentLocale"
                    @change="changeLocale"
                    aria-label="Language"
                >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                </select>
            </div>
        </header>

        <main class="container">
            <section class="controls" aria-labelledby="controls-title">
                <h2 id="controls-title">{{ t("settings") }}</h2>

                <div class="field">
                    <label for="mode">{{ t("mode") }}</label>
                    <select id="mode" v-model="mode">
                        <option value="words">{{ t("modeWords") }}</option>
                        <option value="length">{{ t("modeLength") }}</option>
                    </select>
                </div>

                <div class="field" v-if="mode === 'words'">
                    <label for="numWords">{{ t("numWords") }}</label>
                    <input
                        id="numWords"
                        type="number"
                        v-model.number="options.numWords"
                        min="1"
                        max="12"
                    />
                </div>

                <div class="field" v-if="mode === 'length'">
                    <label for="minLength">{{ t("minLength") }}</label>
                    <input
                        id="minLength"
                        type="number"
                        v-model.number="options.minLength"
                        min="4"
                        max="128"
                    />
                </div>

                <div class="field">
                    <label for="sep">{{ t("separator") }}</label>
                    <select id="sep" v-model="options.separator">
                        <option value=" ">{{ t("sepSpace") }}</option>
                        <option value="-">-</option>
                        <option value="_">_</option>
                        <option value="">{{ t("sepNone") }}</option>
                    </select>
                </div>

                <fieldset class="checkboxes" aria-label="options">
                    <label
                        ><input type="checkbox" v-model="options.capitalize" />
                        {{ t("capitalize") }}</label
                    >
                    <label
                        ><input
                            type="checkbox"
                            v-model="options.appendNumber"
                        />
                        {{ t("appendNumber") }}</label
                    >
                    <label
                        ><input
                            type="checkbox"
                            v-model="options.appendSymbol"
                        />
                        {{ t("appendSymbol") }}</label
                    >
                </fieldset>

                <div class="field file">
                    <label>{{ t("importDict") }}</label>
                    <input type="file" @change="onFile" accept="text/plain" />
                    <small class="hint">{{ t("importHint") }}</small>
                </div>

                <div class="actions">
                    <!-- Bouton principal bien visible -->
                    <button
                        type="button"
                        class="btn-generate"
                        @click="generate"
                        aria-label="Generate password"
                    >
                        {{ t("generate") }}
                    </button>

                    <!-- Boutons secondaires -->
                    <div class="secondary-actions">
                        <button
                            type="button"
                            @click="copyToClipboard"
                            :disabled="!password"
                        >
                            {{ t("copy") }}
                        </button>
                        <button type="button" @click="clearOutput">
                            {{ t("clear") }}
                        </button>
                    </div>
                </div>
            </section>

            <section class="output" aria-labelledby="output-title">
                <h2 id="output-title">{{ t("output") }}</h2>
                <textarea
                    readonly
                    :value="password"
                    rows="4"
                    aria-label="Generated password"
                ></textarea>

                <div class="meta">
                    <div>
                        {{ t("length") }}:
                        <strong>{{ password.length }}</strong>
                    </div>
                    <div>
                        {{ t("entropy") }}:
                        <strong>{{ entropyEstimate }}</strong> {{ t("bits") }}
                    </div>
                </div>

                <details>
                    <summary>{{ t("details") }}</summary>
                    <ul>
                        <li>{{ t("noteNoSave") }}</li>
                        <li>{{ t("notePassphrase") }}</li>
                        <li>{{ t("noteImport") }}</li>
                    </ul>
                </details>
            </section>
        </main>

        <footer class="footer">{{ t("footer") }}</footer>
    </div>
</template>

<script setup>
/*
  PasswordGenerator.vue (updated)
  - Utilise vue-i18n (useI18n)
  - Tente de charger /dicts/fr.txt depuis public/ au mounted
  - Fallback embarqué si fetch échoue
  - Génération côté client uniquement (crypto.getRandomValues)
*/

import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

// --- i18n ---
const { t, locale } = useI18n();
const currentLocale = ref(locale.value || "en");
function changeLocale() {
    locale.value = currentLocale.value;
}

// --- Wordlist : on essaie de charger public/dicts/fr.txt ; fallback embarqué si absent ---
const fallbackFR = [
    "abandon",
    "abri",
    "accord",
    "acier",
    "action",
    "adresse",
    "aigle",
    "air",
    "alarme",
    "ambre",
    "amour",
    "ancre",
    "ange",
    "animal",
    "arbre",
    "argent",
    "art",
    "astre",
    "avenir",
    "avion",
    "barrage",
    "batterie",
    "belle",
    "beurre",
    "bise",
    "blanc",
    "bleu",
    "bois",
    "bord",
    "branche",
    "brise",
    "brouillard",
    "brun",
    "cadeau",
    "calme",
    "camp",
    "canon",
    "carte",
    "cascade",
    "cerise",
    "champ",
    "chance",
    "chanson",
    "chasse",
    "chaud",
    "chemin",
    "cheval",
    "ciel",
    "cime",
    "clair",
    "cle",
    "coeur",
    "colline",
    "compagnon",
    "conte",
    "courant",
    "couleur",
    "cristal",
    "danse",
    "desert",
    "diamant",
    "direction",
    "douceur",
    "drame",
    "eau",
    "ecume",
    "eclat",
    "ecole",
    "etoile",
    "ete",
    "feuille",
    "fer",
    "feu",
    "fleur",
    "foret",
    "fusee",
    "garde",
    "glace",
    "grain",
    "granit",
    "grand",
    "gris",
    "guide",
    "harmonie",
    "hauteur",
    "herbe",
    "ile",
    "image",
    "indigo",
    "iris",
    "joie",
    "journée",
    "lac",
    "lame",
    "lapin",
    "lumière",
    "lune",
    "maison",
    "marche",
    "marine",
    "matin",
    "mer",
    "miel",
    "minuit",
    "montagne",
    "mot",
    "mousse",
    "neige",
    "nuage",
    "nuit",
    "ombre",
    "ocean",
    "petit",
    "pierre",
    "plage",
    "pluie",
    "poeme",
    "port",
    "prix",
    "prune",
    "quartz",
    "racine",
    "rayon",
    "relais",
    "reve",
    "route",
    "sable",
    "saison",
    "savoir",
    "secret",
    "sel",
    "sentier",
    "serre",
    "silence",
    "signe",
    "simple",
    "ski",
    "sommeil",
    "son",
    "soleil",
    "source",
    "sud",
    "tendre",
    "terre",
    "tige",
    "tombe",
    "tonnerre",
    "tour",
    "troupeau",
    "urbain",
    "vallee",
    "vent",
    "verger",
    "verre",
    "vieux",
    "ville",
    "voile",
    "vol",
    "vortex",
    "zeste",
    "zen",
];

const wordlist = ref([...fallbackFR]);

onMounted(async () => {
    try {
        const resp = await fetch("/dicts/fr.txt", { cache: "no-store" });
        if (resp.ok) {
            const text = await resp.text();
            const list = text
                .split(/\r?\n/)
                .map((s) => s.trim())
                .filter(Boolean);
            if (list.length) wordlist.value = list;
        }
    } catch (e) {
        // ignore - keep fallback
    }
});

// --- Options & state ---
const mode = ref("words");
const options = ref({
    numWords: 4,
    minLength: 16,
    separator: "-",
    capitalize: false,
    appendNumber: true,
    appendSymbol: false,
});
const password = ref("");

const SYMBOLS = "!@#$%^&*()_+[]{}|;:,.<>?";

function secureRandomInt(max) {
    if (max <= 0) return 0;
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    const f = arr[0] / 4294967296;
    return Math.floor(f * max);
}

function pickRandomWord() {
    if (!wordlist.value.length) return "";
    return wordlist.value[secureRandomInt(wordlist.value.length)];
}

function randFromString(s) {
    if (!s || s.length === 0) return "";
    return s.charAt(secureRandomInt(s.length));
}

function generate() {
    if (!wordlist.value.length) {
        password.value = "";
        return;
    }

    if (mode.value === "words") {
        const parts = [];
        for (let i = 0; i < options.value.numWords; i++) {
            let w = pickRandomWord();
            if (options.value.capitalize && w)
                w = w.charAt(0).toUpperCase() + w.slice(1);
            parts.push(w);
        }
        password.value = parts.join(options.value.separator);
    } else {
        let out = "";
        while (out.length < options.value.minLength) {
            let w = pickRandomWord();
            if (options.value.capitalize && w)
                w = w.charAt(0).toUpperCase() + w.slice(1);
            out = out ? out + options.value.separator + w : w;
            if (out.length > 2000) break;
        }
        password.value = out;
    }

    if (options.value.appendNumber) {
        const num = secureRandomInt(1000);
        password.value += num.toString();
    }
    if (options.value.appendSymbol) {
        password.value += randFromString(SYMBOLS);
    }
}

async function onFile(ev) {
    const f = ev.target.files && ev.target.files[0];
    if (!f) return;
    try {
        const text = await f.text();
        const list = text
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean);
        if (list.length) wordlist.value = list;
    } catch (e) {
        // ignore
    }
}

function copyToClipboard() {
    if (!password.value) return;
    navigator.clipboard.writeText(password.value).catch(() => {});
}

function clearOutput() {
    password.value = "";
}

const entropyEstimate = computed(() => {
    if (!password.value) return 0;
    let wordsUsed =
        mode.value === "words"
            ? options.value.numWords
            : Math.max(
                  1,
                  password.value.split(options.value.separator).filter(Boolean)
                      .length,
              );
    const base = Math.log2(Math.max(2, wordlist.value.length)) * wordsUsed;
    let extra = 0;
    if (options.value.appendNumber) extra += Math.log2(1000);
    if (options.value.appendSymbol) extra += Math.log2(SYMBOLS.length);
    return Math.round(base + extra);
});
</script>

<style scoped>
:root {
    --bg: #ffffff;
    --muted: #6b7280;
    --accent: #0f62ff;
    --card: #fbfcfd;
}
.gen {
    max-width: 980px;
    margin: 18px auto;
    padding: 18px;
    background: var(--bg);
    border-radius: 10px;
    box-shadow: 0 6px 18px rgba(12, 15, 20, 0.06);
    font-family:
        Inter,
        system-ui,
        -apple-system,
        "Segoe UI",
        Roboto,
        "Helvetica Neue",
        Arial;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}
.header h1 {
    font-size: 1.15rem;
    margin: 0;
}
.lang-switch {
    display: flex;
    align-items: center;
    gap: 8px;
}
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
}
.controls,
.output {
    background: var(--card);
    padding: 12px;
    border-radius: 8px;
}
.field {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}
.field label {
    font-size: 0.92rem;
    margin-bottom: 6px;
}
input[type="number"],
select,
textarea,
input[type="file"] {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #e6e9ef;
}
.checkboxes label {
    display: block;
    margin-bottom: 6px;
}

.actions {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 8px;
    flex-wrap: wrap;
}

.btn-generate {
    padding: 10px 16px;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    background: var(--accent);
    color: #000;
    box-shadow: 0 6px 14px rgba(15, 98, 255, 0.12);
}

.secondary-actions {
    display: flex;
    gap: 8px;
}

.secondary-actions button {
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    background: transparent;
    color: var(--accent);
    cursor: pointer;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.meta {
    margin-top: 10px;
    color: var(--muted);
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
.footer {
    margin-top: 12px;
    color: var(--muted);
    font-size: 0.85rem;
}
.hint {
    font-size: 0.8rem;
    color: var(--muted);
}
textarea[readonly] {
    width: 100%;
    resize: none;
    border-radius: 6px;
    border: 1px solid #e6e9ef;
    padding: 8px;
}

@media (max-width: 820px) {
    .container {
        grid-template-columns: 1fr;
    }
    .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
}
</style>

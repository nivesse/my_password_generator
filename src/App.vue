<template>
    <div id="app">
        <main class="app-shell">
            <PasswordGenerator />
        </main>

        <footer class="app-footer">
            <small
                >© {{ new Date().getFullYear() }} — Générateur de mots de passe
                (client-side)</small
            >
        </footer>
    </div>
</template>

<script setup>
import PasswordGenerator from "./components/PasswordGenerator.vue";
</script>

<style>
:root {
    --bg: #f6f8fb;
    --card-bg: #ffffff;
    --muted: #6b7280;
    --maxwidth: 980px;
}

html,
body,
#app {
    height: 100%;
    margin: 0;
    font-family:
        Inter,
        system-ui,
        -apple-system,
        "Segoe UI",
        Roboto,
        "Helvetica Neue",
        Arial;
    background: var(--bg);
    color: #0f172a;
}

.app-shell {
    max-width: var(--maxwidth);
    margin: 28px auto 8px;
    padding: 0 16px;
    display: block;
}

/* footer */
.app-footer {
    max-width: var(--maxwidth);
    margin: 18px auto;
    padding: 8px 16px;
    color: var(--muted);
    font-size: 0.9rem;
    text-align: center;
}
</style>

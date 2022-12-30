<template>
    <h1>Stevnbak</h1>
    <nav>
        <a href="https://kasper.stevnbak.dk">
            <h2>Kasper</h2>
            <img src="/kasper-logo.png" alt="Kasper Image" />
        </a>
    </nav>
</template>

<style scoped>
h1 {
    font-size: 5rem;
    font-weight: 700;
    text-align: center;
    margin: 2rem 0;
    color: var(--color-heading);
}
nav {
    margin-top: 5rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    align-content: flex-start;
    flex-direction: row;
}
nav a {
    margin: 1rem;
    width: 20rem;
    height: 25rem;
    padding: 1.5rem;
    background-color: var(--color-background-soft);
    border-radius: 1rem;
    border: 0.25rem solid var(--color-border);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
}
nav a:hover {
    border-color: var(--color-border-hover);
    background-color: var(--color-border);
}
nav a img {
    width: 85%;
    object-fit: contain;
}
nav a h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin: 1rem 0;
    color: var(--color-text);
}
</style>

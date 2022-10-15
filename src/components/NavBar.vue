<template>
    <div class="horizontal spread" id="navAll">
        <a class="logo horizontal" href="/">
            <img id="logo" src="/logo.png" alt="Logo Icon" />
            <h1>Stevnbak</h1>
        </a>
        <div class="horizontal right nav">
            <a class="center hover" href="/">Home</a>
            <a class="center hover" href="/Projects">Projects</a>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'NavBar',
    mounted() {
        // When the user scrolls down 50px from the top of the document, resize the header's font size
        window.onscroll = function () {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                document.getElementById('logo')!.style.width = '3rem';
                document.getElementById('navAll')!.style.height = '75%';
            } else {
                document.getElementById('logo')!.style.width = '5rem';
                document.getElementById('navAll')!.style.height = '100%';
            }
        }
    },
});
</script>

<style>
#navAll {
    width: 100%;
    height: 100%;
    background-color: var(--color-background-soft);
    border: 2px solid var(--color-border);
}
.logo {
    width: 15%;
    align-items: center;
    margin-left: 1rem;
    color: var(--color-heading);
    text-decoration: none;
}
.logo:hover {
    background-color: #ffffff00;
}
.logo img {
    width: 5rem;
    margin-right: 1rem;
}
.nav {
    width: 75%;
}
.nav a {
    min-width: 15%;
    height: 100%;
    align-items: center;
    font-size: 1.25rem;
    border: 2px solid var(--color-border);
}
</style>

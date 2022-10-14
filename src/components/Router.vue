<script lang="ts">
import {defineComponent} from 'vue';

import Home from './HomePage.vue';
import Test from './TestPage.vue';
import Projects from './ProjectPage.vue';
import NotFound from './404.vue';

const routes = {
    '/': Home,
    '/Test': Test,
    '/Projects': Projects,
};

export default defineComponent({
    data: function () {
        return {
            currentPath: window.location.pathname,
        };
    },
    computed: {
        currentView(): any {
            /*@ts-ignore*/
            var newPage = routes['/' + this.currentPath.split('/')[1] || '/'] || NotFound;
            if (newPage != NotFound) {
                var name = this.currentPath.split('/')[1] || '';
                if (name == '') name = 'Home';
                document.title = 'Stevnbak - ' + name;
            } else {
                document.title = '404 - Not Found';
            }
            return newPage;
        },
    },
    mounted() {
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.pathname;
        });
    },
});
</script>

<template>
    <component :is="currentView" />
</template>

<style scoped>
nav {
    width: 100%;
    min-height: 10%;
    display: flex;
    justify-content: space-evenly;
}
nav a {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

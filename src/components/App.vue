<template>
    <component :is="pageComponent" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

import ProjectOverview from './ProjectOverview.vue';
import NotFound from './404.vue';

export default defineComponent({
    data: function () {
        return {
            currentPath: window.location.pathname,
            pageComponent: defineComponent({template: ``}),
        };
    },
    methods: {
        setPage(): any {
            this.currentPath = window.location.pathname;
            if (this.currentPath == '/') {
                document.title = 'Kasper Stevnbak';
                /*@ts-ignore*/
                this.pageComponent = ProjectOverview;
            } else {
                var projectName = this.currentPath.split('/')[2];
                document.title = 'Kasper Stevnbak - ' + projectName;
                fetch('/projects/' + projectName + '.txt')
                    .then((response) => response.text())
                    .then((text) => {
                        var categories = text.split(/\r?\n/g)[0].split(';');
                        var transformedText = text
                            //Remove category text
                            .replace(categories.join(';') + '\r\n', '')
                            //New line to html line break
                            .replace(/\r?\n/g, '<br />')
                            //Link to html link
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
                            //Bold&Italic to html bold&italic
                            .replace(/\*\*\*(.*?)\*\*\*/g, '<i> <p class="bold">$1</p> </i>')
                            //Bold to html bold
                            .replace(/\*\*(.*?)\*\*/g, '<p class="bold">$1</p>')
                            //Italic to html italic
                            .replace(/\*(.*?)\*/g, '<i>$1</i>')
                            //Code to html code
                            .replace(/`(.*?)`/g, '<code>$1</code>')
                            //Headers
                            .replace(/\|(.*?)\|/g, '<h3>$1</h3>');
                        this.pageComponent = defineComponent({
                            template: `<div class="projectPage"> <h2>${projectName}</h2> <img class="projectImg" alt="Main project image" src="/projects/${projectName}.png" /> <p class="text">${transformedText}</p> </div>`,
                        });
                    })
                    .catch(() => {
                        this.pageComponent = NotFound;
                    });
            }
        },
    },
    mounted() {
        this.setPage();
    },
});
</script>

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

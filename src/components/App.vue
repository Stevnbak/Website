<template>
    <component :is="pageComponent" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import markdown from "markdown-it";
const md = new markdown();

import projectFiles from "../projects";
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
                let text = projectFiles[projectName as (keyof typeof projectFiles)];
                if(text) {
                    var categories = text.split(/\r?\n/g)[0].split(';');
                    var transformedText = md.render(text
                        //Remove category text
                        .replace(categories.join(';') + '\r\n', '')
                        //New line to markdown new line
                        .replace(/\r?\n/g, '\n\n')
                        //Remove github: link
                        .replace(/(github:).*/gm, "")
                        //Remove link: link
                        .replace(/(link:).*/gm, "")
                    );
                    this.pageComponent = defineComponent({
                        template: `<div class="projectPage"> <h2>${projectName}</h2> <img class="projectImg" alt="Main project image" src="/projects/${projectName}.png" /> <p class="text">${transformedText}</p> </div>`,
                    });
                } else {
                    this.pageComponent = NotFound;
                }
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

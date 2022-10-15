<template>
    <component :is="page" />
</template>

<script lang="ts">
import ProjectOverview from './ProjectOverview.vue';
//Vue component
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Projects',
    data: function () {
        return {
            currentPath: window.location.pathname,
            page: defineComponent({template: ``}),
        };
    },
    mounted() {
        //Project pages path stuff
        var th = this;
        refreshPage();
        window.addEventListener('hashchange', () => {
            refreshPage();
        });
        function refreshPage(): any {
            th.currentPath = window.location.pathname;
            if (th.currentPath == '/Projects') {
                /*@ts-ignore*/
                th.page = ProjectOverview;
            } else {
                var projectName = th.currentPath.split('/')[2];
                document.title = 'Stevnbak - Projects - ' + projectName;
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
                            .replace(/`(.*?)`/g, '<code>$1</code>');
                        th.page = defineComponent({template: `<div class="projectPage"> <h2>${projectName}</h2> <img class="projectImg" alt="Main project image" src="/projects/${projectName}.png" /> <p class="text">${transformedText}</p> </div>`});
                    });
            }
        }
    },
});
</script>

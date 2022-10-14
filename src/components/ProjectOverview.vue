<template>
    <h2>Project overview</h2>
    <div class="categoryList select">
        <a v-for:="category in categories" :href="'#' + category">{{ category }}</a>
    </div>
    <br />
    <div class="projects">
        <div v-for:="project in projects">
            <a class="project" :href="'/Projects/' + project.title">
                <h3>{{ project.title }}</h3>
                <div class="categoryList">
                    <p v-for:="category in project.categories">{{ category }}</p>
                </div>
                <img :src="'/projects/' + project.title + '.png'" :alt="project.title + ' image'" />
                <p>{{ project.description }}</p>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
//Type
type Project = {
    title: string;
    description: string;
    categories: string[];
};
//Vue component
import {defineComponent} from 'vue';
export default defineComponent({
    name: 'ProjectOverview',
    data: function () {
        return {
            projects: [] as Project[],
            categories: [] as string[],
        };
    },
    methods: {
        selectCategory: function () {
            console.log('Select category');
        },
    },
    async mounted() {
        //Load project list
        var projectFiles = [] as string[];
        await fetch('/projects/list.json')
            .then((response) => response.json())
            .then(async (json) => {
                projectFiles = json;
            });

        //Load projects
        for (var i = 0; i < projectFiles.length; i++) {
            var name = projectFiles[i];
            await fetch('/projects/' + name)
                .then((response) => response.text())
                .then((text) => {
                    var lines = text.split('\n');
                    var project: Project = {
                        title: name.replace('.txt', ''),
                        description: lines[1],
                        categories: lines[0].split(';'),
                    };
                    project.categories.forEach((category) => {
                        if (!this.categories.includes(category)) {
                            this.categories.push(category);
                        }
                    });
                    this.projects.push(project);
                });
        }
    },
});
</script>

<style scoped>
h2 {
    font-size: 5rem;
    font-weight: 400;
    color: var(--color-heading);
    margin: 2rem;
}
.projects {
    min-height: 70vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: row;
}

.project {
    margin-right: 0;
    width: 23%;
    min-width: 20rem;
    min-height: 15rem;
    padding: 5%;
    background-color: var(--color-background-soft);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.categoryList {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 0.5rem;
}

.categoryList p {
    font-size: 0.9rem;
    color: var(--color-text);
    margin: 0;
    padding: 0 0.5rem 0 0.5rem;
    border-radius: 1rem;
    background-color: var(--color-border);
}

.select a {
    font-size: 1.5rem;
    margin: 0 0.5rem 0 0.5rem;
    color: var(--color-text);
    padding: 0 0.5rem 0 0.5rem;
    border-radius: 1rem;
    border: none;
    background-color: var(--color-border);
}
</style>

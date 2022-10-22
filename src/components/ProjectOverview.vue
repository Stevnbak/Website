<template>
    <h2>Project overview</h2>
    <div class="categoryList select">
        <a v-for:="category in categories" :href="'#' + category">{{ category }}</a>
    </div>
    <br />
    <div class="projects">
        <div v-for:="project in projects" :class="project.hidden ? 'hidden' : ''">
            <a class="project" :href="'/Projects/' + project.title">
                <h3>{{ project.title }}</h3>
                <div class="categoryList">
                    <a v-for:="category in project.categories" :href="'#' + category">{{ category }}</a>
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
    hidden: boolean;
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
        refreshHash: function () {
            var hash = window.location.hash.replace('#', '');
            if (hash == 'All' || hash == '') {
                this.projects.forEach((project) => {
                    project.hidden = false;
                });
            } else {
                this.projects.forEach((project) => {
                    if (project.categories.includes(hash)) {
                        project.hidden = false;
                    } else {
                        project.hidden = true;
                    }
                });
            }
        },
    },
    async mounted() {
        this.categories.push('All');
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
            await fetch('/projects/' + name + '.txt')
                .then((response) => response.text())
                .then((text) => {
                    var lines = text.split('\n');
                    var project: Project = {
                        title: name,
                        description: lines[1],
                        categories: lines[0].replace('\r', '').split(';'),
                        hidden: false,
                    };
                    project.categories.forEach((category) => {
                        if (!this.categories.includes(category)) {
                            this.categories.push(category);
                        }
                    });
                    this.projects.push(project);
                });
        }

        //Filter for categories
        this.refreshHash();
        window.addEventListener('hashchange', () => {
            this.refreshHash();
        });
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
    align-content: flex-start;
    flex-direction: row;
}

.project {
    margin: 0.5rem;
    width: 23%;
    width: 23rem;
    height: 23rem;
    padding: 5%;
    background-color: var(--color-background-soft);
    border-radius: 1rem;
    border: 2px solid var(--color-border);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.project:hover {
    border: 2px solid var(--color-border-hover);
}
.hidden {
    display: none;
}

.project img {
    position: relative;
    height: 50%;
    object-fit: contain;
    border-radius: 1rem;
}

.project h3 {
    font-size: 2rem;
    font-weight: 500;
    color: var(--color-heading);
    text-align: center;
    margin: 0;
}
.categoryList {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.categoryList a {
    font-size: 0.9rem;
    color: var(--color-text);
    margin: 0;
    padding: 0 0.5rem 0 0.5rem;
    border-radius: 1rem;
    background-color: var(--color-border);
    border: 2px solid var(--color-border);
}

.categoryList a:hover {
    border: 2px solid var(--color-border-hover);
}

.select a {
    font-size: 1.5rem;
    margin: 0 0.5rem 0 0.5rem;
    color: var(--color-text);
    padding: 0 0.5rem 0 0.5rem;
    border-radius: 1rem;
    border: 2px solid var(--color-border);
    background-color: var(--color-border);
}
.select a:hover {
    border: 2px solid var(--color-border-hover);
}
</style>

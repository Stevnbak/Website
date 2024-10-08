<template>
	<h2>Kasper Stevnbak</h2>
	<img src="/zebra-kasper.jpg" alt="Zebra image" />
	<h3 id="overviewHeading">Project overview</h3>
	<div class="categoryList select">
		<a v-for:="category in categories" :href="'#' + category">{{ category }}</a>
	</div>
	<br />
	<div class="projects">
		<a v-for:="project in projects" :class="project.hidden ? 'hidden' : ''" class="project" :href="project.link" :target="project.externalLink ? '_blank' : ''">
			<div>
			<h3>{{ project.title.replaceAll("_", " ") }}</h3>
				<div class="categoryList">
					<a v-for:="category in project.categories" :href="'#' + category">{{ category }}</a>
				</div>
			</div>
			<img :src="'/projects/' + project.title + '.png'" :alt="project.title.replaceAll('_', ' ') + ' image'" />
			<p>{{ project.description }}</p>
			<a class="github" :href="project.githubLink" v-if="project.githubLink" target="_blank"><font-awesome-icon icon="fa-brands fa-github" />GitHub</a>
		</a>
	</div>
</template>

<script lang="ts">
	import projectFiles from "../projects";

	//Type
	type Project = {
		title: string;
		description: string;
		categories: string[];
		link: string;
		externalLink: boolean;
		githubLink?: string;
		hidden: boolean;
	};
	//Vue component
	import {defineComponent} from "vue";
	export default defineComponent({
		name: "ProjectOverview",
		data: function () {
			return {
				projects: [] as Project[],
				categories: [] as string[]
			};
		},
		methods: {
			refreshHash: function () {
				var hash = window.location.hash.replace("#", "");
				if (hash == "All" || hash == "") {
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
				this.$forceUpdate();
			},
			loadProjects: async function () {
				//Create arrays
				let categories = ["All"] as string[];
				let projects = [] as Project[];
				//Load projects
				for (let name in projectFiles) {
					var lines = projectFiles[name as (keyof typeof projectFiles)].split("\n");
					let external;
					var link = lines[2];
					if (link.startsWith("link:")) {
						link = link.replace("link:", "");
						external = true;
					} else if (link.startsWith("github:")) {
						link = link.replace("github:", "");
						external = true;
					} else {
						link = "/Projects/" + name;
						external = false;
					}
					var githubLink = lines.find((l: string) => l.startsWith("github:"))?.replace("github:", "");
					var project: Project = {
						title: name,
						description: lines[1],
						categories: lines[0].replace("\r", "").split(";"),
						link: link,
						externalLink: external,
						githubLink: githubLink,
						hidden: false
					};
					project.categories.forEach((category) => {
						if (!categories.includes(category)) {
							categories.push(category);
						}
					});
					projects.push(project);
					//Refresh Hash
					this.refreshHash();
				}
				//Set data
				this.projects = projects;
				this.categories = categories;
				//Refresh Hash
				this.refreshHash();
			}
		},
		created() {
			this.loadProjects();
		},
		mounted() {
			this.loadProjects();
			window.addEventListener("hashchange", () => {
				this.refreshHash();
			});
		}
	});
</script>

<style scoped>
	h2 {
		font-size: 5rem;
		font-weight: 400;
		color: var(--color-heading);
		margin: 1rem;
	}
	img {
		width: 30%;
		max-height: 20rem;
		object-fit: contain;
	}
	h3 {
		font-size: 5rem;
		font-weight: 400;
		color: var(--color-heading);
		margin: 2rem;
		text-align: center;
		width: 100%;
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
		margin: 1rem;
		width: 22.5rem;
		height: 30rem;
		padding: 1.5rem;
		background-color: var(--color-background-soft);
		border-radius: 1rem;
		border: 0.25rem solid var(--color-border);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
	}
	.project:hover, .project .github:hover {
		border-color: var(--color-border-hover);
	}
	.hidden {
		display: none;
	}
	.project p {
		margin: 0;
	}
	.project img {
		position: relative;
		width: 75%;
		object-fit: contain;
		border-radius: 1rem;
		margin: 0;
	}
	.project h3 {
		font-size: 2rem;
		font-weight: 500;
		color: var(--color-heading);
		text-align: center;
		margin: 0;
	}
	.project .github {
		border: 0.2rem solid var(--color-border);
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
	}
	.project .github svg {
		padding-right: 10px;
	}

	.categoryList {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		margin-bottom: 0.25rem;
		padding: 0.25rem;
		width: 100%;
		margin: 0;
	}

	.categoryList a {
		font-size: 0.9rem;
		color: var(--color-text);
		margin: 0.25rem;
		padding: 0 0.5rem 0 0.5rem;
		min-width: 2.5rem;
		text-align: center;
		border-radius: 1rem;
		background-color: var(--color-border);
		border: 2px solid var(--color-border);
	}

	.categoryList a:hover {
		border: 2px solid var(--color-border-hover);
	}
	.select {
		border: 0.2rem solid var(--color-border);
		min-height: 5rem;
		justify-content: flex-start;
		width: 90%;
	}
	.select a {
		margin: 0.33rem;
		width: 15%;
		height: 2rem;
		flex: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.25rem;
	}
	@media screen and (max-width: 1070px) {
		.select a {
			font-size: 1rem;
		}
		.project {
			width: 15rem;
			height: 30rem;
		}
	}
</style>

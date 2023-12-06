<template>
	<div class="footer-content-left horizontal left">
		<img class="logo" src="/logo.png" alt="Logo Icon" />
		<p>Stevnbak © 2022</p>
	</div>
	<div class="footer-content-right">
		<a href="https://discordapp.com/users/307900989455859723" target="_blank">
			<font-awesome-icon icon="fa-brands fa-discord" />
		</a>
		<a href="https://twitter.com/stevnbk" target="_blank">
			<font-awesome-icon icon="fa-brands fa-twitter" />
		</a>
		<a href="https://github.com/stevnbak" target="_blank">
			<font-awesome-icon icon="fa-brands fa-github" />
		</a>
	</div>
</template>

<style scoped>
	.footer-content-left {
		height: 100%;
		align-items: center;
	}
	.logo {
		width: 5rem;
		margin-right: 1rem;
	}
	.footer-content-right {
		height: 100%;
		align-items: center;
	}

	.footer-content-right svg {
		width: 2.5rem;
		height: 100%;
		margin: 0.5rem;
	}
</style>

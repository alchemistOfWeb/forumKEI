<script>
	import jquery from 'jquery';
	// import { getCookie } from './Components/Global.svelte';
	import Router, { link } from "svelte-spa-router";
	import { routes } from "./routes.js";
	// import { setContext } from "svelte";

</script>
  
<Router {routes}/>
<!-- <h1><a href="/" use:link>Forum Kei</a></h1> -->

<style>
	@import "/node_modules/bootstrap/scss/bootstrap";
	
	@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

	:global(body) {
		margin: 0px;
		padding: 0px;
	}
	
	/* :global(a) {
		text-decoration: none;
		color: #551a8b;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}  */
</style>
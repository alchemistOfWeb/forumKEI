<script context="module">
	import jquery from 'jquery';
	import { getCookie, BACKEND_ROOT_URL, setCookie, deleteCookie } from './pages/Components/Global.svelte';
	import { getContext, setContext } from 'svelte';
	import Router, { link } from "svelte-spa-router";
	import { routes } from "./routes.js";
	// import { setContext } from "svelte";


	async function userRequest() {
		const authtoken = getCookie('access');
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        };

        if (authtoken) {
            console.log({authtoken: `Bearer ${authtoken}`})
            headers['Authorization'] = `Bearer ${authtoken}`;
        }

        return await fetch(BACKEND_ROOT_URL + `auth/users/`, {
            method: 'GET',
            headers
        })
		.then((resp)=>resp.json())
		.then((body)=>{
			const results = body?.results;
			console.log({results});
			console.log({body});

			if (results?.length == 1) {
				window.user = results[0];
				console.log(window.user);
				console.log({msg: 'user authenticated'});
				return {msg: 'user authenticated'};
			}

			console.log({msg: 'user is not authenticated or token expired'})
			deleteCookie('access');
			deleteCookie('refresh');
			return {msg: 'user is not authenticated or token expired'};
		});

		// return await fetch(BACKEND_ROOT_URL + `auth/jwt/create/`, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: data.username,
        //         password: data.password,
        //     })
        // })
	}
</script>

{#await userRequest()}
	<h1>Loading...</h1>
{:then user} 
	<Router {routes}/>
{/await}
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
<script context="module">
    import { BACKEND_ROOT_URL } from './Components/Global.svelte';
    import Navbar from './Components/Navbar.svelte';
    import { link } from "svelte-spa-router";
    // export let section = 1;
    // let page = 1;

    async function sectionsResponse(){
        return await fetch(BACKEND_ROOT_URL + `sections/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json());
    }
</script>
<!-- <h1>Home</h1> -->
<Navbar/>
<main class="container mt-3">

    {#await sectionsResponse()}
        <hr>
        <h3 class="text-secondary">Getting sections...</h3>
        <hr>
    {:then sections} 
        <ol class="list-group list-group-numbered">
        
        {#each sections as section}
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                        <a class="text-success" href="/{section.id}/topics" use:link>{section.title}</a>
                    </div>
                    section_id: {section.id}
                </div>
                <span class="badge bg-primary rounded-pill">14</span>
            </li>
        {/each}
        </ol>
    {:catch}
        <hr>
        <h3 class="text-danger">Request error</h3>
        <hr>
    {/await}
</main>
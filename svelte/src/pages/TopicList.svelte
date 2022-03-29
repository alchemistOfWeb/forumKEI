<script>
    import { BACKEND_ROOT_URL } from './Components/Global.svelte';
    import Navbar from './Components/Navbar.svelte';
    import { link } from "svelte-spa-router";
    export let params = {};

    let section = params.section;
    let page = 1;

    async function topicsResponse(section){
        return await fetch(BACKEND_ROOT_URL + `sections/${section}/topics/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json());
    }
</script>

<Navbar/>
<main class="container mt-3">
    {#await topicsResponse(section)}
    <hr>
    <h3 class="text-secondary text-center">Getting topics...</h3>
    <hr>
    {:then topics} 
        <ol class="list-group list-group-numbered">
            {#each topics as topic}
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">
                            <a 
                            class="text-success" 
                            href="/{section}/topics/{topic.id}" use:link
                            >
                                {topic.title}
                            </a>
                        </div>
                        topic_id: {topic.id}
                        blocked: {topic.is_blocked}
                        created_at: {topic.created_at}
                    </div>
                    <span class="badge bg-primary rounded-pill">{topic.total_comments}</span>
                </li>
            {/each}
        </ol>
    {:catch}
        <hr>
        <h3 class="text-danger">Request error</h3>
        <hr>
    {/await}        
</main>

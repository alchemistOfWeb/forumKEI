<script>
    import { BACKEND_ROOT_URL } from './Components/Global.svelte';
    export let section = 1;
    let page = 1;

    let topicsResponse = fetch(BACKEND_ROOT_URL + `${section}/topics?page=${page}`, {
        method: 'GET',
        headers: {}
    }).then((body) => {
        return body.json();
    })
</script>

{#await topicsResponse}
    <hr>
    <h3 class="text-secondary">Getting topics...</h3>
    <hr>
{:then topics} 
    {#each topics as topic}
        <hr>
        <h3 class="text-success">{topic.title}</h3>
        <h5>comments: {topic.comments}</h5>
        <h5>creating date: {topic.created_at}</h5>
    {/each}
    <hr>
{:catch}
    <hr>
    <h3 class="text-danger">Request error</h3>
    <hr>
{/await}
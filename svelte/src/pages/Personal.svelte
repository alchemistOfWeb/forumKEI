<script>
    import { BACKEND_DOMAIN } from './Components/Global.svelte';
    
    let userResponse = fetch(BACKEND_DOMAIN + '/peronal', {
        method: 'GET',
        headers: {}
    }).then((body) => {
        return body.json();
    })
</script>

{#await userResponse}
    <h3>Getting user...</h3>
{:then user} 
    <h3 class="text-success">user getted</h3>
    <h5>username: {user.name}</h5>
    <h5>email: {user.email}</h5>
    <h5>id: {user.id}</h5>
{/await}
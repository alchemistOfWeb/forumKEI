<script>
    import { BACKEND_DOMAIN, getCookie } from './Components/Global.svelte';
    import Navbar from './Components/Navbar.svelte';
    
    
    if (!getCookie('access')) window.location.href = '/';
    async function userRequest() {
        return await fetch(BACKEND_DOMAIN + '/auth/users', {
            method: 'GET',
            headers: {}
        }).then((body) => {
            return body.json();
        }).then((res) => {
            console.log(res);
            return res;
        });
    }
</script>

<Navbar/>
{#await userRequest()}
    <h3>Getting user...</h3>
{:then user} 
    <h3 class="text-success">user getted</h3>
    <h5>username: {user.name}</h5>
    <h5>email: {user.email}</h5>
    <h5>id: {user.id}</h5>
{:catch err}
    <h3 class="text-danger">Request error!</h3>
{/await}
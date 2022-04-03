<script>
    import { BACKEND_ROOT_URL, getCookie } from './Components/Global.svelte';
    import Navbar from './Components/Navbar.svelte';
    
    
    if (!getCookie('access')) window.location.href = '/';
    async function profileRequest() {
        const authtoken = getCookie('access');
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        };

        if (authtoken) {
            console.log({authtoken})
            headers['Authorization'] = `Bearer ${authtoken}`;
        }
        
        return await fetch(BACKEND_ROOT_URL + 'profile/', {
            method: 'GET',
            headers
        }).then((body) => {
            return body.json();
        }).then((res) => {
            console.log(res);
            return res;
        });
    }
</script>

<Navbar/>
{#await profileRequest()}
    <h3>Getting user...</h3>
{:then profile} 
    <h3 class="text-success">user getted</h3>
    <h5>username: {window.user.username}</h5>
    <h5>email: {window.user.email}</h5>
    <h5>id: {window.user.id}</h5>
{:catch err}
    <h3 class="text-danger">Request error!</h3>
    <span>{err}</span>
{/await}
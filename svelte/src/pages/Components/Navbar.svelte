<script>
    import { link } from "svelte-spa-router";
    import { getContext, setContext } from 'svelte';
    import { getCookie, setCookie, deleteCookie } from './Global.svelte';

    function handleLogout() {
        if (confirm('Do you really want to logout?')) {
            // logoutResponse();
            window.user = undefined;
            window.location.href = '/';
            deleteCookie('access');
            deleteCookie('refresh');
        }
    }
</script>
<header class="p-3 bg-dark text-white">
    <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <!-- <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
            </a> -->

            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" use:link class="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" class="nav-link px-2 text-white">About</a></li>
            </ul>

            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
            </form>

            <div class="text-end">
                {#if (window.user)}
                    <a href="/personal" type="button" 
                    class="btn btn-outline-light me-2 text-decoration-none btn-dark-light"
                    role="button" id="personal-btn" use:link>profile</a>
                    <a href="#logout" type="button" 
                    class="btn btn-warning text-dark text-decoration-none"
                    role="button" id="logout-btn" on:click={handleLogout}>Logout</a>
                {:else}
                    <a href="/signin" use:link type="button" 
                    class="btn btn-outline-light me-2 text-decoration-none btn-dark-light"
                    role="button" id="signin-btn">Login</a>
                    <a href="/signup" use:link type="button" 
                    class="btn btn-warning text-dark text-decoration-none" 
                    role="button">Signup</a>
                {/if}
            </div>
        </div>
    </div>
</header>

<style>
    .btn-dark-light {
        text-decoration: none;
        color: white;
    }
    .btn-dark-light:hover {
        color: rgb(26, 25, 25);
    }

</style>
<script>
    import { BACKEND_ROOT_URL } from './Components/Global.svelte';
    import Navbar from './Components/Navbar.svelte';
    import { link } from "svelte-spa-router";
    export let params = {};

    console.log(params);

    // async function topicsResponse(section){
    //     return await fetch(BACKEND_ROOT_URL + `sections/${section}/topics/`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     .then(response => response.json());
    // }
</script>

<Navbar/>
<main class="container mt-3 d-flex justify-content-center">
    <form class="col-6 col-sm-4">
        <h1 class="h3 mb-3 font-weight-normal text-center">Register</h1>
        <div class="mb-3">
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
            <!-- <label for="inputEmail">Email address</label> -->
        </div>
        <div class="mb-3">
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
            <!-- <label for="inputPassword">Password</label> -->
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <p>Have already registered? You can <a href="/signin" use:link>signin</a></p>
        <div class="d-flex justify-content-center">
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </div>
        <p class="mt-5 mb-3 text-muted">© 1917-2022</p>
      </form>  
</main>
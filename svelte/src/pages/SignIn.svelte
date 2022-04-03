<script>
    import { BACKEND_ROOT_URL, getCookie, setCookie } from './Components/Global.svelte';
    import Navbar from './Components/Navbar.svelte';
    import { link, replace } from "svelte-spa-router";
    import jquery from "jquery";


    // export let params = {};
    
    if (getCookie('access')) window.location.href = '/';

    let inputErrors = {
        inputUsername: [],
        inputPassword: [],
    }

    function eraseErrors() {
        jquery('.error-list').html('');
    }

    function drawErrors() {
        for (var key in inputErrors) {
            if (inputErrors.hasOwnProperty(key)) {
                let errorEls = [];
                
                inputErrors[key].forEach(msg => {
                    console.log({msg});
                    let errEl = jquery('<span>');
                    errEl.addClass('text-danger');
                    errEl.html(msg);
                    errorEls.push(errEl);
                });
                inputErrors[key] = [];

                jquery(`#${key}+.error-list`).append(...errorEls);
            }
        }
        setTimeout(eraseErrors, 3000);
    }

    function handleSigninBtn() {
        const username = jquery('#inputUsername').val();
        const password = jquery('#inputPassword').val();
        
        if (!username || !password) {
            // console.log('password field is empty');
            // inputErrors.inputPassword.push('password field is empty');
            return;
        }
        console.log({username, password});
        let data = {username, password};
        
        signinResponse(data)
            .then((res)=>{
                console.log(res);
                console.log(res.access);
                if (res.access) {
                    setCookie('access', res.access);
                    setCookie('refresh', res.refresh);
                    window.location.href = '/';
                }
            })
            .catch((err) => {
                console.log({err});
            });
    }

    async function signinResponse(data){
        console.log('signinResponse...');
        return await fetch(BACKEND_ROOT_URL + `auth/jwt/create/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            })
        })
        .then(response => response.json());
    }
</script>

<Navbar/>
<main class="container mt-3 d-flex justify-content-center">
    <form class="col-6 col-sm-4" on:submit={()=>false}>
        <h1 class="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
        <div class="mb-3">
            <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus="">
            <div class="error-list d-flex flex-column"></div>
        </div>
        <div class="mb-3">
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <div class="error-list d-flex flex-column"></div>
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <p>Have not registered yet? You can do this now - <a href="/signup" use:link>signup</a></p>
        <div class="d-flex justify-content-center">
            <button class="btn btn-lg btn-primary btn-block" id="signin-submit" on:click={handleSigninBtn}>Sign in</button>
        </div>
        <p class="mt-5 mb-3 text-muted">© 1917-2022</p>
    </form>  
</main>
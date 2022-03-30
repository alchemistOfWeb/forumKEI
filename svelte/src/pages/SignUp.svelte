<script>
    import { BACKEND_ROOT_URL, getCookie } from './Components/Global.svelte';
    import Navbar from './Components/Navbar.svelte';
    import { link, replace } from "svelte-spa-router";
    import jquery from 'jquery';

    if (getCookie('access')) window.location.href = '/';

    let inputErrors = {
        inputPassword: [],
        inputEmail: [],
        inputUsername: [],
    };

    function eraseErrors() {
        jquery('.error-list').html('');
    }

    function drawErrors() {
        for (var key in inputErrors) {
            if (inputErrors.hasOwnProperty(key)) {
                let errorEls = [];

                inputErrors[key].forEach(msg => {
                    console.log(msg);
                    let errEl = jquery('<span>');
                    errEl.addClass('text-danger');
                    errEl.html(msg);
                    errorEls.push(errEl);
                });

                jquery(`#${key} > .error-list`).append(...errorEls);
            }
        }
        setTimeout(eraseErrors, 3000);
    }

    function validatePassword(password1, password2) {
        if (password1 !== password2) {
            inputErrors.inputPassword.push('Second password must be simular to first');
        }
    }

    function handleSignupBtn(e) {
        const password1 = jquery('#inputPassword').val();
        const password2 = jquery('#inputPassword2').val();

        validatePassword(password1, password2);

        if (inputErrors.inputPassword.length > 0 
            || 
            inputErrors.inputUsername.length > 0
            ||
            inputErrors.inputEmail.length > 0
        ) {
            drawErrors();
            inputErrors = {};
            return;
        }
        console.log({inputErrors});
        
        let userdata = {
            username: jquery('#inputUsername').val(),
            password: password1,
            email: jquery('#inputEmail').val(),
        };
        console.log({userdata});

        signupResponse(userdata)
            .then((res)=>{
                console.log(res);

                if (res.id) {
                    replace('/signin/');
                }
            })
            .catch((err) => {
                console.log({err});
            });
    }

    async function signupResponse(data){
        console.log({databeforerequest: data});
        return await fetch(BACKEND_ROOT_URL + `auth/users/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',                
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
                email: data.email,
            })
        })
        .then(response => response.json());
    }
</script>

<Navbar/>
<main class="container mt-3 d-flex justify-content-center">
    <form class="col-6 col-sm-4" on:submit={()=>false}>
        <h1 class="h3 mb-3 font-weight-normal text-center">Register</h1>
        <div class="mb-3">
            <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus="">
            <div class="error-list  d-flex flex-column">
                <!-- <span class="text-danger">Error: incorrect input</span> -->
            </div>
        </div>
        <div class="mb-3">
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus="">
            <div class="error-list d-flex flex-column"></div>
        </div>
        <div class="mb-3">
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <div class="error-list d-flex flex-column"></div>
        </div>
        <div class="mb-3">
            <input type="password" id="inputPassword2" class="form-control" placeholder="Repeat password" required>
            <div class="error-list d-flex flex-column"></div>
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <p>Have already registered? You can <a href="/signin" use:link>signin</a></p>
        <div class="d-flex justify-content-center">
            <button
            class="btn btn-lg btn-primary btn-block" on:click={handleSignupBtn}>Sign up</button>
        </div>
        <p class="mt-5 mb-3 text-muted">© 1917-2022</p>
      </form>  
</main>
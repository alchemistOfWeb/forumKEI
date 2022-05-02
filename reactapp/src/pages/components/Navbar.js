import { Link } from "react-router-dom"
import { crdRequest } from "../../functions";


async function logoutResponse () {
    let headers = {'Authorization': getCookie('access_token')};
    let url = `${BACKEND_ROOT_URL}auth/token/logout/`;
    const res = await crdRequest('POST', url, {}, headers);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

function handleLogout() {
    if (confirm('Do you really want to logout?')) {
        logoutResponse();        
        window.user = undefined;
        window.location.href = '/';
        deleteCookie('access-token');
    }
}

export default function Navbar() {
    let userBtns = null;
    if (window.user) {
        userBtns = (
            <>
                <a href="/personal" type="button" 
                class="btn btn-outline-light me-2 text-decoration-none btn-dark-light"
                role="button" id="personal-btn" use:link>profile</a>
                <a href="#logout" type="button" 
                class="btn btn-warning text-dark text-decoration-none"
                role="button" id="logout-btn" on:click={handleLogout}>Logout</a>
                <Link 
                    to="/personal" 
                    role="button"
                    className="btn btn-outline-light me-2 text-decoration-none btn-dark-light"
                    id="personal-btn"
                >
                    Profile
                </Link>
                <Link 
                    to="#logout" 
                    role="button"
                    className="btn btn-warning text-dark text-decoration-none"
                    id="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </Link>
            </>
        )
    } else {
        userBtns = (
            <>
                <Link 
                    to="/signin" 
                    role="button"
                    className="btn btn-outline-light me-2 text-decoration-none btn-dark-light"
                    id="signin-btn"
                >
                    Login
                </Link>
                <Link 
                    to="/signup" 
                    role="button"
                    className="btn btn-warning text-dark text-decoration-none"
                    id="signup-btn"
                >
                    Signup
                </Link>
            </>
        )
    }

    return (
        <header class="p-3 bg-dark text-white">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <Link to="/" className="nav-link px-2 text-secondary">Home</Link>
                    </li>
                    <li>
                        <a href="#" class="nav-link px-2 text-white">FAQs</a>
                    </li>
                    <li>
                        <a href="#" class="nav-link px-2 text-white">About</a>
                    </li>
                    </ul>

                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                    <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
                    </form>

                    <div class="text-end">
                        {userBtns}
                    </div>
                </div>
            </div>
        </header>
    )
}
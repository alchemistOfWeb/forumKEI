export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

export const getCSRFtoken = function() {
    return getCookie("csrftoken")
}

export async function crdRequest(method, path, data, headers={}) {
    let headers = {
        "X-CSRFToken": getCSRFtoken(),
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
        ...headers
    }
    return await request(method, path, data, headers)
}

export async function request(method, path, data, headers={}) {
    return await fetch(path, {
        method: method,
        headers: {
            ...headers
        },
        body: lib.stringify({ ...data }),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
}

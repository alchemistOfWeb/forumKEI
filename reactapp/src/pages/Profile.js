import React from "react";
import { BACKEND_ROOT_URL } from '../setting';
import { request, getCookie } from '../functions';
import { useAsync } from 'react-async';
import { useParams } from "react-router-dom";


const loadProfile = async () => {
    let headers = {'Authorization': getCookie('access_token')};
    let url = `${BACKEND_ROOT_URL}auth/users/me/`;
    const res = await request('GET', url, {}, headers)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
}

export default function Profile() {
    let urlParams = useParams();
    const { data, error, isPending } 
        = useAsync({ promiseFn: loadProfile });

    if (isPending) {
        return <h1>Loading sections...</h1>
    }
    if (error) {
        return <h1 className="text-danger">Error of loading sections</h1>
    }
    if (data) {
        return (
            <>
            
            </>
        )
    }
}
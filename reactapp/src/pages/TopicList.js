import { BACKEND_ROOT_URL } from "../setting";
import { request, getCookie } from '../functions';
import { useParams } from "react-router-dom";
import React from 'react';
import { useAsync } from 'react-async';
import Topic from './components/Topic'


const loadTopicList = async (sectionId) => {
    let headers = {'Authorization': getCookie('access_token')};
    let url = `${BACKEND_ROOT_URL}sections/${sectionId}/topics/`;
    const res = await request('GET', url, {}, headers)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
}


export default function TopicList() {
    let urlParams = useParams();
    const { data, error, isPending } 
        = useAsync({ 
            promiseFn: loadTopicList, 
            sectionId: urlParams.sectionId
        });

    if (isPending) {
        return <h1>Loading topics...</h1>
    }
    if (error) {
        return <h1 className="text-danger">Error of loading topics</h1>
    }
    if (data) {
        let topics = data.topics;
        return (
            <ol className="list-group list-group-numbered">
                { 
                    topics.length > 0 
                    ?
                    topics.map(
                        (topic, ind) => <Topic topic={topic} key={ind} />) 
                    :
                    "There are no topics in this section yet."
                }
            </ol>
        );
    }
}
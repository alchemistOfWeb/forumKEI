import { BACKEND_ROOT_URL } from "../setting";
import { request, getCookie } from '../functions';
import { useParams } from "react-router-dom";
import React from 'react';
import { useAsync } from 'react-async';
import Comment from './components/Comment'


const loadTopic = async ({sectionId, topicId}, options) => {
    let headers = {'Authorization': getCookie('access_token')};
    let url = `${BACKEND_ROOT_URL}sections/${sectionId}/topics/${topicId}/comments/`;
    const res = await request('GET', url, {}, headers, {signal: options.signal});
    console.log({res})
    return res;
}


export default function TopicDetail() {
    let urlParams = useParams();
    const { data, error, isPending } 
        = useAsync({ 
            promiseFn: loadTopic, 
            sectionId: urlParams.sectionId, 
            topicId: urlParams.topicId 
        });

    if (isPending) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1 className="text-danger">Error</h1>
    }
    if (data) {
        console.log(data);
        const comments = data.comments;
        const topic = data.topic;
        return (
            <>
                <hr/>
                <h3>Disscusing on {topic.title}</h3>
                <h4>Comments count: {topic.total_comments}</h4>
                <hr/>

                <ul className="list-group comment-list">
                { 
                comments.length > 0 
                ?
                comments.map(
                    (comment, ind) => <Comment comment={comment} key={ind} />) 
                :
                "There are no comments on this topic yet."
                }
                </ul>
            </>
        );
    }
}

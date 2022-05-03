import { BACKEND_ROOT_URL } from "../setting";
import { request, getCookie } from '../functions';
import { useParams } from "react-router-dom";
import React from 'react';
import { useAsync } from 'react-async';
import Comment from './components/Comment'


const loadTopic = async (sectionId, topicId) => {
    let headers = {'Authorization': getCookie('access_token')};
    let url = `${BACKEND_ROOT_URL}sections/${sectionId}/topics/${topicId}/comments/`;
    const res = await request('GET', url, {}, headers)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
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
        let comments = data.comments;
        return (
            <>
                <hr/>
                <h3>{data.topic.title}</h3>
                <h4>{data.topic.total_comments}</h4>
                <hr/>

                <div className="container my-5 py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10 col-xl-8">
                            { 
                            comments.length > 0 
                            ?
                            comments.map(
                                (comment, ind) => <Comment comment={comment} key={ind} />) 
                            :
                            "There are no comments on this topic yet."
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

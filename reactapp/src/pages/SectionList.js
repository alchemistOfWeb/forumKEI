import BACKEND_ROOT_URL from '../setting';
import { request, getCookie } from '../functions';
import { useParams } from "react-router-dom";
import React from 'react';
import { useAsync } from 'react-async';
import Section from './components/Section';


const loadSectionList = async (sectionId) => {
    let headers = {'Authorization': getCookie('access_token')};
    let url = `${BACKEND_ROOT_URL}sections/${sectionId}/topics/`;
    const res = await request('GET', url, {}, headers)
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
}


export default function SectionList() {
    let urlParams = useParams();
    const { data, error, isPending } 
        = useAsync({ promiseFn: loadTopicList, sectionId: urlParams.topicId });

    if (isPending) {
        return <h1>Loading sections...</h1>
    }
    if (error) {
        return <h1 className="text-danger">Error of loading sections</h1>
    }
    if (data) {
        let sections = data.sections;
        return (
            <ol className="list-group list-group-numbered">
                { 
                    sections.length > 0 
                    ?
                    sections.map(
                        (topic, ind) => <Topic topic={topic} key={ind} />) 
                    :
                    "There are no sections in this section yet."
                }
            </ol>
        );
    }
}
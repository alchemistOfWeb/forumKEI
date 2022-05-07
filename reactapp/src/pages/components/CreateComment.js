import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_DOMAIN } from "../../setting";
import { postRequest } from "../../functions";


const createReportRequest = async ({sectionId, topicId, content}) => {
    let uri = `sections/${sectionId}/topics/${topicId}/comments/`;
    return await postRequest(uri, {content});
}


export default function CreateComment({topic}) {
    const [report, setReport] = useState("");
    let urlParams = useParams();

    const handleCreateComment = (e) => {
        e.preventDefault();
        console.log('create comment');
        console.log({report})
        const sectionId = urlParams.sectionId;
        const topicId = urlParams.topicId;

        createReportRequest({sectionId, topicId, content: report})
            .then((res)=>{
                window.location.reload();
            })
            .catch((err)=>{
                console.error(err);
            });
    }

    var commentForm = <span>To leave comments you should signin</span>
    if (window.user) {
        let curr_profile = window.user.profile;
        var curr_profile_img = 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp';;
        if (curr_profile.image_sm) {
            curr_profile_img = `${BACKEND_DOMAIN}${curr_profile.image_sm}`;
        }

        commentForm = (
            <form 
                className="card-footer py-3 border-0 comment-reply"
                onSubmit={handleCreateComment}               
            >
                <div className="d-flex flex-start w-100">
                <img 
                    className="rounded-circle shadow-1-strong me-3"
                    src={curr_profile_img} alt="avatar" width="40"
                    height="40" 
                />
                <div className="form-outline w-100">
                    <textarea 
                        className="form-control"                         
                        rows="4"
                        style={{background: "#fff"}}
                        value={report} 
                        onChange={e => setReport(e.target.value)}
                        placeholder="Write your report here"
                    />                 
                </div>
                </div>
                <div className="float-end mt-2 pt-1">
                    <button type="submit" className="btn btn-primary btn-sm me-2">Post comment</button>
                    <button type="button" className="btn btn-outline-warning btn-sm">Cancel</button>
                </div>
            </form>
        )
    }
    return (
        <>
        {commentForm}
        </>
    )
}

import React from "react";


export default function Comment(comment) {
    return (
        <div className="card" data-comment-id={comment.id}>
            <div className="card-body">
                <div className="d-flex flex-start align-items-center">
                    <img className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="60"
                        height="60" />
                    <div>
                        <h6 className="fw-bold text-primary mb-1">{comment.author.username}</h6>
                        <p className="text-muted small mb-0">
                        Shared publicly - Jan 2020
                        </p>
                    </div>
                </div>
    
                <p className="mt-3 mb-4 pb-2">
                {comment.content}
                </p>
    
                <div className="small d-flex justify-content-start">
                    <a href="#!" className="d-flex align-items-center me-3 comment-like">
                        <i className="far fa-thumbs-up me-2"></i>
                        <p className="mb-0">Like</p>
                    </a>
                    <a href="#!" className="d-flex align-items-center me-3">
                        <i className="far fa-comment-dots me-2"></i>
                        <p className="mb-0">Comment</p>
                    </a>
                </div>
            </div>
            <div 
                className="card-footer py-3 border-0 comment-reply" 
                style="background-color: #f8f9fa;"
            >
                <div className="d-flex flex-start w-100">
                <img 
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                    height="40" 
                />
                <div className="form-outline w-100">
                    <textarea className="form-control" id="textAreaExample" rows="4"
                    style="background: #fff;"></textarea>
                    <label className="form-label" for="textAreaExample">Message</label>
                </div>
                </div>
                <div className="float-end mt-2 pt-1">
                <button type="button" className="btn btn-primary btn-sm">Post comment</button>
                <button type="button" className="btn btn-outline-primary btn-sm">Cancel</button>
                </div>
            </div>
        </div>
    )
}
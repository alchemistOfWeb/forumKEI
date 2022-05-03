import { Link } from 'react-router-dom';
import React from "react";


export default function Section({section}) {    
    let linkToDetail = `/sections/${section.id}/topics`;

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    <Link className="text-success" to={linkToDetail}>
                        {section.title}
                    </Link>
                </div>
                section_id: {section.id} <span className="text-secondary">last comment...</span>
            </div>
            <span className="badge bg-primary rounded-pill">{section.total_topics}</span>
        </li>        
    )
}
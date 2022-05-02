import { Link } from 'react-router-dom';

export default function Topic(sectionId, topicId) {
    let linkToDetail = `/sections/${sectionId}/topics/${topic.id}`;
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    <Link className="text-success" to={linkToDetail}>
                        {topic.title}
                    </Link>
                </div>
                topic_id: {topic.id}
                blocked: {topic.is_blocked}
                created_at: {topic.created_at}
            </div>
            <span className="badge bg-primary rounded-pill">{topic.total_comments}</span>
        </li>
    )
}

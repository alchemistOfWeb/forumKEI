<script>
    import { BACKEND_ROOT_URL, getCookie } from './Components/Global.svelte';
    import Navbar from './Components/Navbar.svelte';
    import { link } from "svelte-spa-router";
    export let params = {};

    let section = params.section;
    let topic = params.topic;
    let page = 1;

    async function commentsResponse(topic){
        const authtoken = getCookie('access');
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        };
        
        if (authtoken) {
            console.log({authtoken})
            headers['Authorization'] = `Bearer ${getCookie('access')}`;
        }
        
        return await fetch(BACKEND_ROOT_URL + `sections/${section}/topics/${topic}/comments/`, {
            method: 'GET',
            headers
        })
        .then(response => response.json());
    }
</script>

<Navbar/>
<main class="container mt-3">
    {#await commentsResponse(section, topic)}
    <hr>
    <h3 class="text-secondary text-center">Getting comments...</h3>
    <hr>
    {:then data} 
        <hr>
        <h3>{data.topic.title}</h3>
        <h4>{data.topic.total_comments}</h4>
        <hr>

        <div class="container my-5 py-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-12 col-lg-10 col-xl-8">
                    {#if data.comments.length !== 0}
                        {#each data.comments as comment}
                        <div class="card" data-comment-id={comment.id}>
                            <div class="card-body">
                                <div class="d-flex flex-start align-items-center">
                                    <img class="rounded-circle shadow-1-strong me-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="60"
                                        height="60" />
                                    <div>
                                        <h6 class="fw-bold text-primary mb-1">{comment.author.username}</h6>
                                        <p class="text-muted small mb-0">
                                        Shared publicly - Jan 2020
                                        </p>
                                    </div>
                                </div>
                    
                                <p class="mt-3 mb-4 pb-2">
                                {comment.content}
                                </p>
                    
                                <div class="small d-flex justify-content-start">
                                    <a href="#!" class="d-flex align-items-center me-3 comment-like">
                                        <i class="far fa-thumbs-up me-2"></i>
                                        <p class="mb-0">Like</p>
                                    </a>
                                    <a href="#!" class="d-flex align-items-center me-3">
                                        <i class="far fa-comment-dots me-2"></i>
                                        <p class="mb-0">Comment</p>
                                    </a>
                                    <!-- <a href="#!" class="d-flex align-items-center me-3">
                                        <i class="fas fa-share me-2"></i>
                                        <p class="mb-0">Share</p>
                                    </a> -->
                                </div>
                            </div>
                            <div class="card-footer py-3 border-0 comment-reply" style="background-color: #f8f9fa;">
                                <div class="d-flex flex-start w-100">
                                <img class="rounded-circle shadow-1-strong me-3"
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                                    height="40" />
                                <div class="form-outline w-100">
                                    <textarea class="form-control" id="textAreaExample" rows="4"
                                    style="background: #fff;"></textarea>
                                    <label class="form-label" for="textAreaExample">Message</label>
                                </div>
                                </div>
                                <div class="float-end mt-2 pt-1">
                                <button type="button" class="btn btn-primary btn-sm">Post comment</button>
                                <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
                                </div>
                            </div>
                        </div>
                        {/each}
                    {:else}
                        <h4>There is no comments on this topic yet. You can leave one first</h4>
                    {/if}
                </div>
            </div>
        </div>


        <!-- <ol class="list-group list-group-numbered">
            
            {#if data.comments.length !== 0}
                {#each data.comments as comment}
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">
                                <a 
                                class="text-success" 
                                href="/{section}/topics/{topic.id}" use:link
                                >
                                    {topic.title}
                                </a>
                            </div>
                            topic_id: {topic.id}
                            blocked: {topic.is_blocked}
                            created_at: {topic.created_at}
                        </div>
                        <span class="badge bg-primary rounded-pill">{topic.total_comments}</span>
                    </li>
                {/each}
            {:else}
                <h4>There is no comments on this topic yet. You can leave one first</h4>
            {/if}
        </ol> -->
    {:catch}
        <hr>
        <h3 class="text-danger">Request error</h3>
        <hr>
    {/await}
</main>
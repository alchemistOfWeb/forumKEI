import Home from "./pages/Home.svelte";
import Personal from "./pages/Personal.svelte";
import TopicList from "./pages/TopicList.svelte";
import TopicDetail from "./pages/TopicDetail.svelte";
import NotFound from "./pages/NotFound.svelte";
import SignIn from "./pages/SignIn.svelte";
import SignUp from "./pages/SignUp.svelte";

export const routes = {
    "/": Home,
    "/signin": SignIn,
    "/signup": SignUp,
    "/:section/topics": TopicList,
    "/:section/topics/:topic": TopicDetail,
    "/personal": Personal,
    "*": NotFound
};
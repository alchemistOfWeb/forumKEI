import React from 'react';
import ReactDOM from 'react-dom/client';
// "npm i -D react-router-dom" - write for install router
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SectionList from './pages/SectionList';
import TopicList from './pages/TopicList';
import TopicCreate from './pages/TopicCreate';
import TopicDetail from './pages/TopicDetail';
import Profile from './pages/Profile';
import Rules from './pages/Rules';

import NoPage from './pages/NoPage';

import reportWebVitals from './reportWebVitals';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="rules" element={<Rules />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="personal" element={<Profile />} />
          <Route path="sections" element={<SectionList/>} />
          <Route path="sections/:sectionId/topics" element={<TopicList/>} />
          <Route path="sections/:sectionId/topics/create" element={<TopicCreate/>} />
          <Route path="sections/:sectionId/topics/:topicId" element={<TopicDetail/>} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Details from "./components/Details";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [error, setError] = useState(false);
  const [getDet, setGetDet] = useState();

  return (
    <div className="bg-[url('./wallpaper-2.jpg')] bg-cover w-screen h-screen">
      <Routes>
        <Route
          path="/home"
          element={
            <Home
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              loading={loading}
              setLoading={setLoading}
              post={post}
              setPost={setPost}
              error={error}
              setError={setError}
              getDet={getDet}
              setGetDet={setGetDet}
            />
          }
        />

        <Route
          path="/details/:apiNum"
          exact
          element={
            <Details getDet={getDet}  />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

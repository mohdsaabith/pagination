import { getByTitle } from "@testing-library/react";
import { data } from "autoprefixer";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  const handlePageClick = (clickData) => {
    console.log(clickData.selected);
    setCurrentPage(clickData.selected);
    getApiData();
  };

  const getApiData = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://api.jikan.moe/v4/anime?page=${currentPage}`
    );
    setPost(res.data.data);
    setLoading(false);
    console.log(res.data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  if (loading && post.length == 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div className="App">
        <div className="overflow-auto m-9">
          <table class="table-auto w-full ">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm tracking-wide text-left">
                  Movie Name
                </th>
                <th className="p-3 text-sm tracking-wide text-left">Rank</th>
                <th className="p-3 text-sm tracking-wide text-left">Source</th>
                <th className="p-3 text-sm tracking-wide text-left">Theme</th>
                <th className="p-3 text-sm tracking-wide text-left">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {post.map((content) => (
                <tr>
                  <td>{content.title_english}</td>
                  <td>{content.rank}</td>
                  <td>{content.source}</td>
                  <td>{content.popularity}</td>
                  <td>{content.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="m-9 items-center ">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={1022}
            marginPagesDisplayed={4}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex"}
            pageClassName={"border-2 w-12 h-8 text-center hover:bg-gray-500 "}
            pageLinkClassName={"text-blue"}
            className={
              "text-blue-900  flex text-center items-center justify-center"
            }
            previousClassName={
              "border-2 w-12 h-8 text-center hover:bg-gray-500"
            }
            nextClassName={"border-2 w-12 h-8 text-center hover:bg-gray-500"}
            breakClassName={"border-2 w-12 h-8 text-center hover:bg-gray-500"}
            activeClassName={"bg-cyan-600 font-bold hover:text-white"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

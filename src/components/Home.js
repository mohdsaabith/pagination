import axios from "axios";
import React from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";

import { Link } from "react-router-dom";

const Home = ({
  loading,
  setLoading,
  post,
  setPost,
  currentPage,
  setCurrentPage,
  error,
  setError,
  getDet,
  setGetDet,
}) => {
  const handlePageClick = (clickData) => {
    setCurrentPage(clickData.selected + 1);
  };

  const getApiData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.jikan.moe/v4/anime?page=${currentPage}`
      );
      setPost(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, [currentPage]);

  if (loading && post.length === 0) {
    return (
      <div className="flex w-screen h-screen items-center  justify-center">
        <ReactLoading type="bars" color="white" height={80} width={100} />
      </div>
    );
  }

  return (
    <div>
      <div className="text-[15.19px]">
        <div className="p-2 ">
          {loading ? (
            <>
              <div className="w-screen h-screen flex justify-center items-center ">
                <ReactLoading
                  type="bars"
                  color="white"
                  height={80}
                  width={100}
                />
              </div>
            </>
          ) : (
            <>
              <table class="table-auto w-full  rounded-lg bg-white bg-opacity-50 ">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th>Mal_id</th>
                    <th className="p-3 text-sm tracking-wide text-red-800 text-left">
                      Movie Name
                    </th>
                    <th className="p-3 text-sm tracking-wide text-left">
                      Rank
                    </th>
                    <th className="p-3 text-sm tracking-wide text-left">
                      Source
                    </th>
                    <th className="p-3 text-sm tracking-wide text-left">
                      Theme
                    </th>
                    <th className="p-3 text-sm tracking-wide text-left">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {post.map((content) => (
                    <tr>
                      <td>{content.mal_id}</td>
                      <td className="font-bold">
                        <Link
                          to={`/details/${content.mal_id}`}
                          onClick={() => {
                            setGetDet(content.mal_id);
                          }}>
                          {content.title_english}
                        </Link>
                      </td>
                      <td>{content.rank}</td>
                      <td>{content.source}</td>
                      <td>{content.popularity}</td>
                      <td>{content.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {error ? (
            <>
              <p className="flex justify-center items-center">Got an error</p>
            </>
          ) : null}
          <div className="mx-9 items-center ">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={1022}
              marginPagesDisplayed={4}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={
                "flex bg-white rounded-xl bg-opacity-0 font-bold text-blue-900 mx-auto flex text-center items-center justify-center"
              }
              pageClassName={"border-2 w-12 h-8 text-center hover:bg-gray-500 "}
              pageLinkClassName={"text-blue"}
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
    </div>
  );
};

export default Home;

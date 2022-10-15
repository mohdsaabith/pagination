import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
const Details = ({ post, getDet }) => {
  const [error, setError] = useState(false);
  const [postApi, SetPostApi] = useState();
  const [loading, setLoading] = useState(false);

  const { apiNum } = useParams();
  console.log(apiNum);

  const getSecondApi = async () => {
    try {
      setLoading(true);
      const secondRes = await axios.get(
        `https://api.jikan.moe/v4/anime/${apiNum}/full`
      );
      SetPostApi(secondRes.data.data);
      console.log(secondRes.data.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getSecondApi();
  }, []);

  return (
    <div>
      <div className="items-center flex text-center justify-center w-screen h-screen ">
        <div className="bg-white w-[40rem] h-[30rem] mx-auto bg-opacity-60 ">
          <div>
            {postApi ? (
              <h1 className="pt-8 font-bold text-5xl ">
                {postApi.title_english}
              </h1>
            ) : null}
          </div>
          <div className="flex justify-center items-center pt-[2rem]">
            {postApi ? (
              <img src={postApi.images.jpg.image_url} width="150" alt="" />
            ) : null}
          </div>
          <div>
            {postApi ? (
              <div className="text-[18px] pt-[1rem] mx-2 ">
                <div className="">
                  <p>Year:- {postApi.year}</p>
                  <p>Episodes:-{postApi.episodes}</p>
                </div>
                
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

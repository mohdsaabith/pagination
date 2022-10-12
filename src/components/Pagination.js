import React, { useEffect, useState } from "react";

const Pagination = ({ pages = 1022, setCurrentPage }) => {
  const numberOfPage = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPage.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);

  const [arrOfCurrBtn, settArrOfCurrBtn] = useState([]);

  useEffect(() => {
    let tempNumberOfPage = [...arrOfCurrBtn];

    let dotsIntial = "...";
    let dotright = "...";
    let dotleft = "...";

    if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPage = [1, 2, 3, 4, dotsIntial, numberOfPage.length];
    } else if (currentButton == 4) {
      const sliced = numberOfPage.slice(0, 5);
      tempNumberOfPage = [...sliced, dotsIntial, numberOfPage.length];
    } else if (currentButton > 4 && currentButton < numberOfPage.length - 2) {
      const sliced1 = numberOfPage.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPage.slice(currentButton, currentButton + 1);
      tempNumberOfPage = [
        1,
        dotleft,
        ...sliced1,
        ...sliced2,
        dotright,
        numberOfPage.length,
      ];
    } else if (currentButton == dotsIntial) {
      setCurrentButton(arrOfCurrBtn[arrOfCurrBtn.length - 3] + 1);
    } else if (currentButton == dotright) {
      setCurrentButton(arrOfCurrBtn[3] + 2);
    } else if (currentButton == dotleft) {
      setCurrentButton(arrOfCurrBtn[3] - 2);
    }

    settArrOfCurrBtn(tempNumberOfPage);
    setCurrentPage(currentButton);
  }, [currentButton]);

  return (
    <div>
      <div className="flex justify-center items-center font-[500] w-[100%] h-[100%] text-[15px]">
        <a
          href="#"
          className="flex justify-center items-center text-black h-[40px] w-[40px] border-2 border-[#ddd] cursor-pointer no-underline">
          Prev
        </a>

        {arrOfCurrBtn.map((item, index) => {
          return (
            <a
              href="#"
              key={index}
              className={`${
                currentButton === item ? "active " : ""
              }flex justify-center items-center text-black h-[40px] w-[60px] border-2 border-[#ddd] cursor-pointer no-underline`}
              onClick={() => setCurrentButton(item)}>
              {item}
            </a>
          );
        })}

        <a
          href="#"
          className="flex justify-center items-center text-black h-[40px] w-[40px] border-2 border-[#ddd] cursor-pointer no-underline">
          Next
        </a>
      </div>
    </div>
  );
};

export default Pagination;

export default function SearchResultCard({ cardData }) {
  //   console.log(cardData);
  const { title, previewCards, image, cardsCount, tags } = cardData;
  return (
    <div className="w-[416px] h-[212px] relative bg-white rounded-lg shadow-lg">
      <div className="left-[17px] top-[21px] absolute flex-col justify-start items-start gap-3 inline-flex">
        <div className="text-blue-950 text-[18px] font-semibold">{title}</div>
        <div className="pb-[3px] justify-center items-start gap-4 inline-flex">
          <div>
            <span className="text-blue-950 text-[14px] font-semibold">
              {cardsCount}
            </span>
            <span className="text-neutral-400 text-[14px] font-semibold">
              {" "}
              Cards
            </span>
          </div>
          <div>
            <span className="text-blue-950 text-[14px] font-semibold">23</span>
            <span className="text-neutral-400 text-[14px] font-semibold">
              {" "}
              Saves
            </span>
          </div>
        </div>
        <div className=" justify-center items-center gap-1 inline-flex">
          <div>
            <span className="text-blue-950 text-[14px] font-semibold">
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline mr-1"
              >
                <path
                  d="M6.83426 1.04893C7.04381 0.404017 7.95619 0.404018 8.16574 1.04894L9.25121 4.38967C9.34492 4.67808 9.61369 4.87336 9.91695 4.87336L13.4296 4.87336C14.1077 4.87336 14.3897 5.74109 13.8411 6.13967L10.9993 8.20435C10.7539 8.3826 10.6513 8.69856 10.745 8.98698L11.8304 12.3277C12.04 12.9726 11.3018 13.5089 10.7532 13.1103L7.91145 11.0456C7.66611 10.8674 7.33389 10.8674 7.08855 11.0456L4.24675 13.1103C3.69815 13.5089 2.96002 12.9726 3.16956 12.3277L4.25503 8.98698C4.34875 8.69856 4.24609 8.3826 4.00074 8.20435L1.15895 6.13967C0.610348 5.74109 0.892291 4.87336 1.5704 4.87336L5.08305 4.87336C5.38631 4.87336 5.65508 4.67808 5.74879 4.38967L6.83426 1.04893Z"
                  fill="#FFCD1F"
                />
              </svg>
              3.0{" "}
            </span>
            <span className="text-neutral-400 text-[14px] font-semibold">
              (4 Reviews)
            </span>
          </div>
        </div>
      </div>
      <div className="w-[381px] left-[17px] top-[100px] absolute justify-end items-center gap-2.5 inline-flex">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 13L7 7L1 1"
            stroke="#A5A5A5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="w-[381px] h-[37px] left-[17px] top-[154px] absolute">
        <div className=" h-[37px] left-0 top-0 absolute bg-stone-50 rounded-xl justify-center items-center gap-[5.06px] inline-flex">
          <img
            className="w-[20.22px] h-[20.22px] rounded-[37.92px]"
            src="https://via.placeholder.com/20x20"
          />
          <div className="justify-start items-center gap-[2.53px] flex">
            <div className="text-blue-950 text-[12px] font-semibold">
              hamchu
            </div>
          </div>
        </div>
        <div className="left-[285px] top-[8.50px] absolute justify-end items-center gap-1 inline-flex">
          <div className="h-5 px-[1.67px] py-[4.17px] justify-center items-center flex" />
          <div className="text-neutral-400 text-[14px] font-semibold">
            526 Views
          </div>
        </div>
        <div className="h-[27px] left-[119px] top-[5px] absolute bg-stone-50 rounded-xl justify-center items-center gap-[5.06px] inline-flex">
          <div className="justify-start items-center gap-[2.53px] flex">
            <div className="text-blue-950 text-[12px] font-semibold">
              Grade 7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

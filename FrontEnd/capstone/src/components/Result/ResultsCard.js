import * as React from "react";

function ResultsCard() {
  return (
    <div className="flex flex-col justify-center shadow-sm max-w-[950px]">
      <div className="flex flex-col justify-center w-full shadow-sm bg-slate-100 max-md:max-w-full">
        <div className="px-4 pt-12 pb-4 w-full bg-white max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[71%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 justify-between w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                <div className="gap-1.5 my-auto text-sm leading-4 text-sky-950">
                  Air Canada
                </div>
                <div className="flex gap-5 justify-between items-start">
                  <div className="flex flex-col self-stretch my-auto">
                    <div className="text-xl font-semibold leading-6 text-sky-950">
                      10:45
                    </div>
                    <div className="mt-3 text-xs leading-5 text-center text-slate-400">
                      YVR M
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-xs leading-4 text-slate-400">
                    <div>12h 20m</div>
                    <img
                      src={'/images/icon1.png'}
                      alt="My Image"
                      className="mt-1 aspect-[8.33] w-[148px]"
                    />
                    <div className="mt-1.5">Nonstop</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-px text-xl font-semibold leading-6 whitespace-nowrap text-sky-950">
                      <div className="grow">16:45</div>
                      <img
                        src={'/images/Plus1day.jpg'}
                        alt="My Image"
                        className="shrink-0 self-start aspect-[0.83] w-[15px]"
                      />
                    </div>
                    <div className="mt-3 text-xs leading-5 text-center text-slate-400">
                      PVG T2
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[29%] max-md:ml-0 max-md:w-full">
              <div className="flex gap-5 justify-between max-md:mt-10">
                <div className="justify-center my-auto text-xl font-semibold leading-5 text-right text-sky-950">
                  CAD1,828
                </div>
                <button className="justify-center px-8 py-3.5 text-base font-medium leading-6 text-center text-gray-500 whitespace-nowrap bg-sky-200 rounded max-md:px-5">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailButton from "../Common/DetailButton";

function formatDuration(duration) {
  if (!duration) return "N/A";
  const matches = duration.match(/PT(\d+H)?(\d+M)?/);
  const hours = matches[1] ? parseInt(matches[1].replace('H', ''), 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2].replace('M', ''), 10) : 0;
  return `${hours}h${minutes}m`;
}

function ResultsCard({
  airline,
  flightNumber,
  departureTime,
  arrivalTime,
  departureLocation,
  arrivalLocation,
  duration,
  numberOfStops,
  stopLocations = [], // Ensure this prop is an array
  price,
  totalPassengerPrice,
  hasCheckedBags,
  passenger
}) {
  const totalPrice = parseFloat(price);
  const [convertedPrice, setConvertedPrice] = useState(null);

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/EUR');
        const rate = response.data.rates.CAD;
        setConvertedPrice(Math.floor(totalPrice * rate));
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    if (totalPrice) {
      convertCurrency();
    }
  }, [totalPrice]);

  const departureDate = new Date(departureTime);
  const arrivalDate = new Date(arrivalTime);
  const dayDifference = arrivalDate.getDate() - departureDate.getDate();

  return (
    <div className="flex flex-col justify-center shadow-sm w-[850px] mb-4">
      <div className="flex flex-col justify-center w-full shadow-sm bg-slate-100 max-md:max-w-full">
        <div className="px-4 py-4 w-full bg-white max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[75%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-3 items-start mt-7 max-md:flex-wrap max-md:mt-10">
                <div className="flex flex-auto gap-5 justify-between mt-1.5 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-1.5 self-start text-sm leading-4 text-sky-950">
                    <div className="my-auto truncate">{airline}</div>
                  </div>
                  <div className="flex gap-5 justify-between items-start">
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold leading-6 text-sky-950">
                        {departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="mt-3 text-xs leading-5 text-center text-slate-400">
                        {departureLocation}
                      </div>
                    </div>
                    <div className="flex flex-col items-center self-stretch text-[10px] leading-4 text-slate-400">
                      <div>{formatDuration(duration)}</div>
                      <img src="./images/icon1.png" className="mt-1 aspect-[8.33] w-[148px]"/>
                      <div className="mt-1.5">
                        {numberOfStops === 0 ? 'Nonstop' : `${stopLocations.join(', ')}`}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold leading-6 text-sky-950">
                        {arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="self-start mt-3 ml-2.5 text-xs leading-5 text-center text-slate-400">
                        {arrivalLocation}
                      </div>
                    </div>
                  </div>
                </div>
                {dayDifference > 0 && (
                  <div className="text-xs leading-5 text-center text-amber-400">
                    +{dayDifference} day{dayDifference > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[29%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10">
                {hasCheckedBags ? (
                  <div className="justify-center self-start px-2 py-px ml-4 text-xs leading-6 text-center text-lime-700 capitalize rounded-lg bg-green-300 bg-opacity-60 max-md:ml-2.5">
                    check-in bag
                  </div>
                ) : (
                  <div className="justify-center self-start px-2 py-px ml-4 text-xs leading-6 text-center text-red-500 capitalize rounded-lg bg-[#FFF2F2] max-md:ml-2.5">
                    no check-in bag
                  </div>
                )}
                <div className="flex gap-5 mt-3">
                  <div className="flex flex-col">
                    <div className="flex-auto my-auto text-xl font-semibold leading-5 text-right text-sky-950">
                      ${convertedPrice || 'N/A'}
                    </div>
                    {passenger > 1 && (  
                      <div className="right-5 bottom-5 self-end mt-4 text-base leading-5 text-right text-slate-400">
                        Total:${Math.floor(totalPassengerPrice) || 'N/A'}
                      </div>
                     )}
                  </div>
                  <DetailButton/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;

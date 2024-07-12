import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailButton from "../Common/DetailButton";
import DetailDropdown from "../Common/DetailDropdown"; // Import the new component

function formatDuration(duration) {
  if (!duration) return "N/A";
  const matches = duration.match(/PT(\d+H)?(\d+M)?/);
  const hours = matches[1] ? parseInt(matches[1].replace('H', ''), 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2].replace('M', ''), 10) : 0;
  return `${hours}h${minutes}m`;
}

function ResultRight({
  airline,
  flightNumber,
  departureTime,
  arrivalTime,
  departureLocation,
  arrivalLocation,
  duration,
  numberOfStops,
  stopLocations = [],
  price,
  hasCarryOnbags,
  goPrice,
  cabin,
  validatingAirlineCodes,
  airlineNumber,
  numberOfBookableSeats,
  checkInWeight,
  refund,
  restrict,
  penalty,
  leftDetails,
  rightDetails,
}) {
  const totalPrice = parseFloat(price);
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/EUR');
        const rate = response.data.rates.CAD;
        const goPriceNumber = parseFloat(goPrice);
        setConvertedPrice(Math.floor(totalPrice - goPriceNumber) * rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
  
    if (totalPrice) {
      convertCurrency();
    }
  }, [totalPrice, goPrice]);

  const departureDate = new Date(departureTime);
  const arrivalDate = new Date(arrivalTime);
  const dayDifference = arrivalDate.getDate() - departureDate.getDate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  return (
    <div className="relative px-6 pt-1.5 pb-5 bg-white shadow-sm w-[460px] max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex grow gap-1.5 items-start max-md:mt-8">
          <div className="flex flex-col mt-2.5">
            <div className="justify-center text-sm leading-4 text-sky-950">
              <div className="my-auto truncate">{airline}</div>
            </div>
            <div className="flex gap-2.5 justify-between items-start mt-0.5">
              <div className="flex flex-col self-stretch my-auto">
                <div className="text-base font-semibold leading-6 text-sky-950">
                  {departureDate.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="mt-2 text-xs leading-5 text-center text-slate-400">
                  {departureLocation}
                </div>
              </div>
              <div className="flex flex-col items-center mt-1.5 text-xs leading-4 text-slate-400">
                <div>{formatDuration(duration)}</div>
                <img src="./images/icon1.png" className="mt-1 aspect-[8.33] w-[148px]" />
                <div className="mt-1.5">
                  {numberOfStops === 0 ? 'Nonstop' : `${stopLocations.join(', ')}`}
                </div>
              </div>
              <div className="flex gap-0 items-start">
                <div className="flex flex-col mt-3">
                  <div className="text-base font-semibold leading-6 text-sky-950">
                    {arrivalDate.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="mt-1.5 text-xs leading-5 text-center text-slate-400">
                    {arrivalLocation}
                  </div>
                </div>
                <div className="text-xs leading-5 text-center text-amber-400">
                  {dayDifference > 0 && (
                    <div className="text-xs leading-5 text-center text-amber-400 whitespace-nowrap">
                      +{dayDifference} day{dayDifference > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-7 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-10">
              {hasCarryOnbags ? (
                <div className="justify-center self-start px-2 py-px ml-4 text-xs leading-6 text-center text-lime-700 capitalize rounded-lg bg-green-300 bg-opacity-60 max-md:ml-2.5 whitespace-nowrap">
                  carry-on bag
                </div>
              ) : (
                <div className="justify-center self-start px-2 py-px ml-4 text-xs leading-6 text-center text-red-500 capitalize rounded-lg bg-[#FFF2F2] max-md:ml-2.5 whitespace-nowrap">
                  no carry-on bag
                </div>
              )}
              <div className="flex gap-4 mt-3 items-center">
                <div className="flex-col">
                  <div className="flex-auto my-auto text-base font-semibold leading-5 text-right text-sky-950">
                    +${convertedPrice}
                  </div>
                </div>
                <DetailButton onClick={toggleDropdown} showDetails={showDropdown} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailDropdown 
        visible={showDropdown}
        cabin={cabin}
        validatingAirlineCodes={validatingAirlineCodes}
        airlineNumber={airlineNumber}
        numberOfBookableSeats={numberOfBookableSeats}
        checkInWeight={checkInWeight}
        refund={refund}
        restrict={restrict}
        penalty={penalty}
        leftDetails={leftDetails}
        rightDetails={rightDetails}
      />
    </div>
  );
}

export default ResultRight;

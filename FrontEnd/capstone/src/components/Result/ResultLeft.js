import React, { useEffect, useState } from "react";
import axios from "axios";

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
  passenger,
  hasCheckedBags,
  onClick,
  isSelected,
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
    <div onClick={onClick} className={`relative px-6 pt-1.5 pb-5 shadow-sm w-[390px] max-md:px-5 hover:bg-gray-100 ${isSelected ? 'bg-gray-100' : ''}`}>
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex grow gap-1.5 items-start max-md:mt-8">
          <div className="flex flex-col mt-2.5">
            <div className="text-sm leading-4 text-sky-950">
              <div className="truncate">{airline}</div>
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
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/070d9972c3125d39f54cee77a30bac328c43b206a4eb957f4a205f2e8262c3e3?apiKey=bfbc62932a264251916c1c27ced3ccfe&" 
                  className="mt-1 aspect-[8.33] w-[148px]" />
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
                {dayDifference > 0 && (
                  <div className="text-xs leading-5 text-center text-amber-400 ml-1"> {/* Adjusted margin for "+1 day" */}
                    +{dayDifference} day{dayDifference > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-center text-xs leading-6 text-center text-red-700 capitalize">
              <div className="absolute right-7 top-1.5 justify-center px-2 py-px mt-1.5 bg-red-50 rounded-lg">
                {hasCheckedBags ? (
                  <div className="bg-green-300 bg-opacity-60">
                    check-in bag
                  </div>
                ) : (
                  <div className="text-red-500 bg-[#FFF2F2]">
                    no check-in bag
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="absolute right-5 top-10 self-end mt-4 text-base font-semibold leading-5 text-right text-sky-950">
                ${convertedPrice || 'N/A'}
              </div>
              {passenger > 1 && (  
                <div className="absolute right-5 top-13 right-5 bottom-5 self-end mt-4 text-xs leading-5 text-right text-slate-400">
                  Total:${Math.floor(totalPassengerPrice) || 'N/A'}
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;

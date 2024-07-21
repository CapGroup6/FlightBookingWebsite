import React, { useState, useEffect } from 'react';
import DateSelector from '../searchForm/DateSelector';
import LocationSelector from '../searchForm/LocationSelector';
import TripType from '../searchForm/TripType';
import CabinClass from '../searchForm/CabinClass';
import PassengerCount from '../searchForm/PassengerCount';
import axios from 'axios';
import styles from '../../styles/SearchForm.module.css';
import ResultCardLogic from '../Result/ResultCardLogic';
import ResultLeftLogic from '../Result/ResultLeftLogic';
import ResultRightLogic from '../Result/ResultRightLogic';
import Filter from '../Result/filter';
import Sort from '../Result/Sort';



const SearchForm = ({ onSearch }) => {
  const [tripType, setTripType] = useState({ label: 'Round-Trip', value: 'Round-Trip' });
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [userInputDeparture, setUserInputDeparture] = useState('');
  const [userInputDestination, setUserInputDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState({ label: 'Economy', value: 'ECONOMY' });
  const [apiResults, setApiResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [matchingItineraries, setMatchingItineraries] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [leftDetails, setLeftDetails] = useState(null);
  const [rightDetails, setRightDetails] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (departure && destination && departure.label === destination.label) {
      alert('Departure and destination cannot be the same city.');
      return;
    }

    setLoading(true);
    setShowFilter(true);
    setButtonClicked(true);

    const params = {
      origin: departure ? departure.iataCode : '',
      destination: destination ? destination.iataCode : '',
      departureDate,
      returnDate: tripType.value === 'Round-Trip' ? returnDate : '',
      adults,
      children,
      infants,
      cabinClass: cabinClass.value,
    };

    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    try {
      const response = await axios.get(`http://localhost:8080/api/flights?${queryString}`);
      setApiResults(response.data);
      onSearch(params);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setApiResults([]); // Reset results on error
    } finally {
      setLoading(false);
      setTimeout(() => setButtonClicked(false), 300); // Remove the click effect after 300ms
    }
  };

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
    setSelectedPrice(selectedCard.travelerPricings[0].price.total);
    // Filter matching results
    const matches = apiResults.filter(result =>
      result.itineraries[0].segments[0].id === selectedCard.itineraries[0].segments[0].id
    );

    setMatchingItineraries(matches);
    const segments = selectedCard.itineraries[0].segments;

    // Extract left details from selectedCard
    const leftDetails = {
      cabin: selectedCard.travelerPricings[0].fareDetailsBySegment[0].cabin,
      validatingAirlineCodes: selectedCard.validatingAirlineCodes,
      airlineNumber: segments.map(segment => segment.number),
      numberOfBookableSeats: selectedCard.numberOfBookableSeats,
      checkInWeight: selectedCard.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight,
      refund: selectedCard.pricingOptions.refundableFare,
      restrict: selectedCard.pricingOptions.noRestrictionFare,
      penalty: selectedCard.pricingOptions.noPenaltyFare,
    };
    setLeftDetails(leftDetails);
  };

  const handleRightDetails = (rightDetails) => {
    setRightDetails(rightDetails);
  };

  const updateResults = (updatedResults) => {
    setApiResults(updatedResults);
  };


  useEffect(() => {
    if (apiResults.length > 0) {
      // Handle submit logic if needed
      handleSubmit(new Event('submit'));
    }
  }, [departure, destination, departureDate, returnDate, adults, children, infants, cabinClass]);

  useEffect(() => {
    if (apiResults.length > 0) {
      handleCardClick(apiResults[0]);
    }
  }, [apiResults]);

  const passengersCount = adults + children + infants;

  return (
    <div className="relative flex flex-col pt-20 ">
      <form onSubmit={handleSubmit} className={`flex gap-2 justify-between items-end pr-6 pb-3 pl-2.5 mt-48 bg-white rounded-lg shadow-sm ${styles.searchFormContainer} max-md:flex-wrap max-md:pr-5 max-md:mt-7`}>
        <div className="flex flex-col self-stretch gap-0.5 max-md:max-w-full">
          <div className={`flex z-10 gap-1 py-1 pr-20 pl-3 w-full text-sm leading-2 text-sky-950 ${styles.searchFormInner} max-md:flex-wrap max-md:pr-5 max-md:max-w-full`}>
            <div className="flex gap-1.5 justify-center py-px whitespace-nowrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6283ab735092d6ee58978d7bc83f0d04294b046ac513d55abccb6c17a478935f?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                className="shrink-0 w-4 aspect-square"
              />
              <TripType
                tripType={tripType}
                setTripType={setTripType}
              />
            </div>
            <div className="flex gap-1.5 justify-center items-center py-px">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3beeaee9d59b10c510bde73699c311161dd6f550e85e6365c9527bfde14dda4f?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                className="shrink-0 self-stretch w-4 aspect-square"
              />
              <PassengerCount
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                infants={infants}
                setInfants={setInfants}
              />
              <div className="flex gap-1.5 justify-center py-px whitespace-nowrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/86086eb472a749833dc8fd365a46723d001bb455fe85da08afecafb9ca8254c6?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                  className="shrink-0 w-4 aspect-square"
                />
                <CabinClass
                  cabinClass={cabinClass}
                  setCabinClass={setCabinClass}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-row item-center self-stretch gap-3 max-md:max-w-full'>
            <div className="flex flex-row gap-3 items-center justify-center h-10 px-4 text-sm font-bold leading-6 text-center text-gray-500 capitalize whitespace-nowrap rounded-lg max-md:mt-0 ${styles.imgContainer}">
              <LocationSelector
                userInput={userInputDeparture}
                setUserInput={setUserInputDeparture}
                setLocation={setDeparture}
                locationType="departure"
              />
              <div className="shrink-0 w-4 aspect-square self-stretch flex flex-col items-center justify-center">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                  className="img"
                />
                {tripType.value === 'Round-Trip' ? (
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                    className="img"
                  />
                ) : (null)
                }
              </div>
              <LocationSelector
                userInput={userInputDestination}
                setUserInput={setUserInputDestination}
                setLocation={setDestination}
                locationType="destination"
              />
            </div>
            <div className="flex flex-row items-center justify-center h-10 px-4 text-sm font-bold leading-6 text-center text-gray-500 capitalize whitespace-nowrap rounded-lg max-md:mt-0">
              <DateSelector
                tripType={tripType}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />
            </div>
            <div className="absolute right-5 h-10 px-4 text-sm font-bold leading-6 text-center text-gray-500 capitalize whitespace-nowrap bg-sky-200 hover:bg-sky-300 rounded-lg max-md:mt-0">
              <button type="submit" className={`h-10 px-7 max-md:px-5  ${buttonClicked ? 'btn-clicked' : ''}`}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div>
        {!showFilter &&
          <div className="flex justify-center items-center h-80">
            <div className="flex m-50">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e893a466a5127afac788e7257ebec62963300ee85e5a0d660b172777b5d3967a?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
                alt="Logo"
                className="w-20 h-20"
              />
              <h1 className="ml-4 text-6xl font-bold text-black">
                Flight<span>Searching</span>
              </h1>
            </div>
          </div>
        }
        {apiResults.length > 0 && tripType.value === 'One-Way' ? (
          <div className="flex flex-row gap-5">
            <div className="w-[80%] relative max-w-[350px]">
              {showFilter && <Sort updateResults={updateResults} />}
              {showFilter && <Filter tripType={tripType.value} apiResult={apiResults} buttonClicked={buttonClicked} onFilterChange={updateResults}/>}
            </div>
            <div>
              <ResultCardLogic
                apiResults={apiResults.filter(result => result.itineraries.length === 1)}
                passenger={passengersCount}
                tripType={tripType.value} />
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-5">
            <div className="w-[80%] relative max-w-[350px]">
              {showFilter && <Sort updateResults={updateResults} />}
              {showFilter && <Filter tripType={tripType.value} apiResult={apiResults} buttonClicked={buttonClicked} onFilterChange={updateResults}/>}
            </div>
            <div className='flex flex-1 items-start justify-end'>
              <div className='flex flex-row'>
                <div className='flex flex-col'>
                  <ResultLeftLogic
                    apiResults={apiResults.filter(result => result.itineraries.length === 2)}
                    handleCardClick={handleCardClick}
                    passenger={passengersCount}
                    selectedCard={selectedCard}
                  />
                </div>
                <div className='flex flex-col'>
                  <ResultRightLogic
                    matchingItineraries={matchingItineraries.filter(result => result.itineraries.length === 2)}
                    price={selectedPrice}
                    tripType={tripType.value}
                    leftDetails={leftDetails} // Pass left details as a prop
                    onRightDetailsUpdate={handleRightDetails} // Callback to update right details
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;

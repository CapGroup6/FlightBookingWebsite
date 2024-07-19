import React from "react";
import ResultRight from "./ResultRight";

const ResultRightLogic = ({ matchingItineraries, price, leftDetails, onRightDetailsUpdate, tripType }) => {
  const capitalizeWords = (str) => {
    try {
      if (!str) {
        throw new Error("Input string is empty or null");
      }
      return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    } catch (error) {
      console.error(error.message);
      return "";
    }
  };

  const calculateStopoverDuration = (segments) => {
    return segments.slice(0, -1).map((segment, index) => {
      const nextSegment = segments[index + 1];
      const arrivalTime = new Date(segment.arrival.at);
      const departureTime = new Date(nextSegment.departure.at);
      const stopoverDurationMs = Math.abs(departureTime - arrivalTime); // Duration in milliseconds
      const stopoverDurationMinutes = Math.floor(stopoverDurationMs / (1000 * 60)); // Convert to minutes
      const hours = Math.floor(stopoverDurationMinutes / 60);
      const minutes = stopoverDurationMinutes % 60;
      return `${hours}h${minutes}m`;
    });
  };

  return (
    <div>
      {matchingItineraries.map((result, idx) => {
        let stopLocations = [];
        //for so many airline numbers
        const itineraries = result.itineraries;
        const segments = result.itineraries[1].segments;
        const firstSegment = segments[0];
        const lastSegment = segments[segments.length - 1];

        segments.slice(0, -1).forEach(segment => stopLocations.push(capitalizeWords(segment.arrival.cityName)));

        const stopoverDurations = calculateStopoverDuration(segments);

        const travelerPricing = result.travelerPricings[0];
        const hasCarryOnbags = result.pricingOptions.includedCheckedBagsOnly;

        stopLocations = Array.isArray(stopLocations) ? stopLocations : [];
        const formattedStopLocations = stopLocations.map((location, index) => `${stopoverDurations[index]} at ${location}`);

        const rightDetails = {
          airline: capitalizeWords(lastSegment.airlineName),
          flightNumber: firstSegment.number,
          departureTime: firstSegment.departure.at,
          arrivalTime: lastSegment.arrival.at,
          departureLocation: firstSegment.departure.iataCode,
          arrivalLocation: lastSegment.arrival.iataCode,
          cabin: travelerPricing.fareDetailsBySegment[0].cabin,
          validatingAirlineCodes: result.validatingAirlineCodes,
          //so many airline numbers; fix the bug
          airlineNumber: itineraries[1].segments.map(segment => segment.number),
          numberOfBookableSeats: result.numberOfBookableSeats,
          checkInWeight: travelerPricing.fareDetailsBySegment[0].includedCheckedBags.weight,
          refund: result.pricingOptions.refundableFare,
          restrict: result.pricingOptions.noRestrictionFare,
          penalty: result.pricingOptions.noPenaltyFare,
        };


        return (
          <ResultRight
            key={`result-right-${idx}`}
            airline={rightDetails.airline}
            flightNumber={rightDetails.flightNumber}
            departureTime={rightDetails.departureTime}
            arrivalTime={rightDetails.arrivalTime}
            departureLocation={rightDetails.departureLocation}
            arrivalLocation={rightDetails.arrivalLocation}
            duration={result.itineraries[1].duration}
            numberOfStops={segments.length - 1}
            stopLocations={formattedStopLocations}
            price={`${travelerPricing.price.total}`}
            hasCarryOnbags={!hasCarryOnbags}
            goPrice={price}
            showDropdown={rightDetails.showDropdown}
            toggleDropdown={rightDetails.toggleDropdown}
            tripType={tripType}
            leftDetails={leftDetails} // Pass left details as a prop
            rightDetails={rightDetails}

          />
        );
      })}
    </div>
  );
};

export default ResultRightLogic;

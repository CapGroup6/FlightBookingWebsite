import React, { useState } from "react";
import ResultsCard from "./ResultsCard"; // UI component for left results

const ResultCardLogic = ({ apiResults, passenger }) => {
  
//transfer airline capiatalize
  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
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
      {apiResults.map((result, index) => (
        result.itineraries.map((itinerary, itineraryIndex) => {
          let stopLocations = [];
          const segments = itinerary.segments;
          const firstSegment = segments[0];
          const lastSegment = segments[segments.length - 1];

          segments.slice(0, -1).forEach(segment => stopLocations.push(capitalizeWords(segment.arrival.cityName)));

          const stopoverDurations = calculateStopoverDuration(segments);

          const travelerPricing = result.travelerPricings[0]; 
          const hasCheckedBags = segments.some(segment => {
            const fareDetails = travelerPricing.fareDetailsBySegment.find(fd => fd.segmentId === segment.id);
            return fareDetails?.includedCheckedBags && fareDetails.includedCheckedBags.weight > 0;
          });

          stopLocations = Array.isArray(stopLocations) ? stopLocations : [];
          const formattedStopLocations = stopLocations.map((location, index) => `${stopoverDurations[index]} at ${location}`);

          return (
            <ResultsCard
              key={`${index}-${itineraryIndex}`}
              airline={capitalizeWords(firstSegment.airlineName)}
              flightNumber={firstSegment.number}
              departureTime={firstSegment.departure.at}
              arrivalTime={lastSegment.arrival.at}
              departureLocation={firstSegment.departure.iataCode}
              arrivalLocation={lastSegment.arrival.iataCode}
              duration={itinerary.duration}
              numberOfStops={segments.length - 1}
              stopLocations={formattedStopLocations}
              price={`${travelerPricing.price.total}`}
              hasCheckedBags={hasCheckedBags}
              totalPassengerPrice={result.price.total}
              passenger={passenger}
            />
          );
        })
      ))}
    </div>
  );
};

export default ResultCardLogic;

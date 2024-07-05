import React from 'react';
import ResultLeft from './ResultLeft';


const ResultLeftLogic = ({ apiResults, handleCardClick, passenger, selectedCard }) => {
  const renderedCards = [];
  const seenIds = new Set();

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

  apiResults.forEach((result, index) => {
    const segments = result.itineraries[0].segments;
    const firstSegment = segments[0];

    if (seenIds.has(firstSegment.id)) {
      return; // Skip if we've already rendered a card with this id
    }

    seenIds.add(firstSegment.id);

    let stopLocations = [];
    const lastSegment = segments[segments.length - 1];
    segments.slice(0, -1).forEach(segment => stopLocations.push(capitalizeWords(segment.arrival.cityName)));

    const stopoverDurations = calculateStopoverDuration(segments);

    const travelerPricing = result.travelerPricings ? result.travelerPricings[0] : null;
    const hasCheckedBags = segments.some(segment => {
      const fareDetails = travelerPricing ? travelerPricing.fareDetailsBySegment.find(fd => fd.segmentId === segment.id) : null;
      return fareDetails?.includedCheckedBags && fareDetails.includedCheckedBags.weight > 0;
    });

    stopLocations = Array.isArray(stopLocations) ? stopLocations : [];
    const formattedStopLocations = stopLocations.map((location, index) => `${stopoverDurations[index]} at ${location}`);

    renderedCards.push(
      <ResultLeft
        key={`${index}`}
        airline={capitalizeWords(firstSegment.airlineName)}
        flightNumber={firstSegment.number}
        departureTime={firstSegment.departure.at}
        arrivalTime={lastSegment.arrival.at}
        departureLocation={firstSegment.departure.iataCode}
        arrivalLocation={lastSegment.arrival.iataCode}
        duration={result.itineraries[0].duration}
        numberOfStops={segments.length - 1}
        stopLocations={formattedStopLocations}
        price={`${travelerPricing.price.total}`}
        totalPassengerPrice={result.price.total}
        hasCheckedBags={hasCheckedBags}
        onClick={() => handleCardClick(result)}
        passenger={passenger}
        isSelected={result === selectedCard}
      />
    );
  });

  return <>{renderedCards}</>;
};

export default ResultLeftLogic;

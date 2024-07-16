import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const calculateTotalDuration = (segments) => {
    const totalMinutes = segments.reduce((acc, segment) => {
        const duration = segment.duration.match(/PT(\d+H)?(\d+M)?/);
        const hours = duration[1] ? parseInt(duration[1].replace('H', ''), 10) : 0;
        const minutes = duration[2] ? parseInt(duration[2].replace('M', ''), 10) : 0;
        return acc + (hours * 60) + minutes;
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes}m`;
};

const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const convertPriceToCAD = async (price) => {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/EUR');
        return Math.floor(price * response.data.rates.CAD);
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
    }
};

const FlightDetails = ({ flightOffers }) => {
    const [convertedPrices, setConvertedPrices] = useState([]);

    useEffect(() => {
        const fetchConvertedPrices = async () => {
            const prices = await Promise.all(
                flightOffers.slice(0, 3).map(result => convertPriceToCAD(result.price.total))
            );
            setConvertedPrices(prices);
        };
        fetchConvertedPrices();
    }, [flightOffers]);

    return flightOffers.slice(0, 3).map((result, index) => {
        const segmentsDetails = result.itineraries.map((itinerary, itineraryIndex) => {
            let stopLocations = [];
            const segments = itinerary.segments;
            const firstSegment = segments[0];
            const lastSegment = segments[segments.length - 1];

            segments.slice(0, -1).forEach(segment => stopLocations.push(capitalizeWords(segment.arrival.cityName)));

            const stopoverDurations = calculateStopoverDuration(segments);
            const totalDuration = calculateTotalDuration(segments);

            stopLocations = Array.isArray(stopLocations) ? stopLocations : [];
            const formattedStopLocations = stopLocations.map((location, index) => `${stopoverDurations[index]} at ${location}`);

            const airlineNumbers = segments.map(segment => segment.number);

            return (
                <ul key={itineraryIndex}>
                    {result.itineraries.length > 1 && <li><strong><em>{itineraryIndex === 0 ? 'Outbound Flight:' : 'Return Flight:'}</em></strong></li>}
                    <li><strong>Airline:</strong> {capitalizeWords(firstSegment.airlineName)}</li>
                    <li>
                        {airlineNumbers.length > 1 ? (
                            airlineNumbers.map((number, index) => (
                                <li key={index}><strong>Flight {index + 1} number: </strong>{result.validatingAirlineCodes.join(', ')} {number}</li>
                            ))
                        ) : (
                            <li><strong>Flight number: </strong>{result.validatingAirlineCodes.join(', ')} {airlineNumbers[0]}</li>
                        )}
                    </li>
                    <li><strong>Departure:</strong> {capitalizeWords(firstSegment.departure.cityName)} ({firstSegment.departure.iataCode}) at {formatTime(firstSegment.departure.at)}</li>
                    <li><strong>Arrival:</strong> {capitalizeWords(lastSegment.arrival.cityName)} ({lastSegment.arrival.iataCode}) at {formatTime(lastSegment.arrival.at)}</li>
                    <li><strong>Duration:</strong> {totalDuration}</li>
                    <li><strong>Number of Stops:</strong> {segments.length - 1}</li>
                    {segments.length > 1 && <li><strong>Stopover Locations:</strong> {formattedStopLocations.join(', ')}</li>}
                </ul>
            );
        });

        return (
            <div key={index} style={{ marginBottom: '20px' }}>
                {segmentsDetails}
                <ul>
                    <li><strong>Number of Bookable Seats:</strong> {result.numberOfBookableSeats}</li>
                    <li><strong>Total Price:</strong> CAD {convertedPrices[index]}</li>
                </ul>
            </div>
        );
    });
};

export const formatFlightDetails = (flightOffers) => {
    return <FlightDetails flightOffers={flightOffers} />;
};

import { IFlight, IFlightLeg, IFlightSegment } from '../types';
import { ICarrier } from '../store/reducers/filters';

export const getUniqueCarriers = (flights: IFlight[]) => {
  return flights.reduce<{[name: string]: ICarrier}>((acc, flight) => {
    const airline = flight?.departInfo?.departure?.airline;

    if (!airline) {
      return acc;
    }

    const existingCarrier = acc[airline];

    if (existingCarrier) {
      if (flight.price < existingCarrier.minPrice) {
        existingCarrier.minPrice = flight.price;
      }
    } else {
      acc[airline] = {
        id: airline,
        name: airline,
        value: airline,
        minPrice: flight.price,
        checked: true,
      };
    }

    return acc;
  }, {});
};

export const getSegmentInfo = (
  segment,
  flightType: 'arrival' | 'departure'
): IFlightSegment => {
  return {
    date: segment[flightType + 'Date'],
    city: segment[flightType + 'City']?.caption || '',
    airport: {
      name: segment[flightType + 'Airport'].caption,
      iata: segment[flightType + 'Airport'].uid,
    },
    airline: segment.airline.caption,
  };
};

export const getLegInfo = (leg): IFlightLeg => {
  return {
    duration: Number(leg.duration),
    transfersCount: leg.segments.length - 1,
    departure: getSegmentInfo(leg.segments[0], 'departure'),
    arrival: getSegmentInfo(leg.segments[leg.segments.length - 1], 'arrival'),
  };
};

export const parseFlights = (flightsData): IFlight[] => {
  const flights = flightsData.result.flights;

  return flights.map(
    ({ flight }): IFlight => ({
      price: Number(flight.price.total.amount),
      departInfo: getLegInfo(flight.legs[0]),
      returnInfo: getLegInfo(flight.legs[1]),
    })
  );
};

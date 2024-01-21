export interface FlightSegment {
  date: string;
  city: string;
  airport: {
    name: string;
    iata: string;
  };
  airline: string;
}

export interface FlightLeg {
  duration: number;
  layoversCount: number;
  departure: FlightSegment;
  arrival: FlightSegment;
}

export interface Flight {
  price: number;
  departInfo: FlightLeg;
  returnInfo: FlightLeg;
}

export interface IFlightSegment {
  date: string;
  city: string;
  airport: {
    name: string;
    iata: string;
  };
  airline: string;
}

export interface IFlightLeg {
  duration: number;
  transfersCount: number;
  departure: IFlightSegment;
  arrival: IFlightSegment;
}

export interface IFlight {
  price: number;
  departInfo: IFlightLeg;
  returnInfo: IFlightLeg;
}

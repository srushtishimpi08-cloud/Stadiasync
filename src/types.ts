
export interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: number;
  lat: number;
  lng: number;
}

export interface Match {
  id: string;
  stadiumId: string;
  teams: string[];
  score: string;
  target: string;
  prob: string;
  status: string;
  predictedEndTime: string;
  crr?: string;
  rrr?: string;
  pace?: string;
}

export interface TransitOption {
  type: string;
  route: string;
  nextTrain?: string;
  nextBus?: string;
  frequency: string;
  status: string;
  availableVehicles?: string[];
}

export interface NearbyService {
  name: string;
  type: string;
  rating: number;
  dist: string;
}

export interface StadiumTransitData {
  stadiumName: string;
  predictedMatchEnd: string;
  crowdDensity: string;
  transitOptions: TransitOption[];
}

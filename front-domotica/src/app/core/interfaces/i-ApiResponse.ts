import { iActuatorsData } from './i-ActuatorsData.interface';
import { iSensorsData } from './iSensorsData.interface';

export interface iApiResponse {
  success: boolean;
  sensorsData?: iSensorsData[];
  actuatorsData?: iActuatorsData[];
  roomsNames?: {
    bedrooms: string[];
    bathrooms: string[];
    garages: string[];
    kitchens: string[];
    livingrooms: string[];
  };
  lastRecord?: any;
  error?: any;
}

export interface iLastApiResponse {
  success: boolean;
  sensorsData: [{
    _id: string;
    lastRecord: iSensorsData;
  }];
  actuatorsData: [{
    _id: string;
    lastRecord: iActuatorsData;
  }];
  error?: any;
}

export interface iSensorChartResponse {
  success: boolean;
  data: number[] | number[][];
  error?: any;
}

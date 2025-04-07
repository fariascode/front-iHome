import { iActuatorsData } from './i-ActuatorsData.interface';
import { iSensorsData } from "./iSensorsData.interface";

export interface iSensorRecordsResponse {
    success: boolean;
    records: iSensorsData[];
    error?: any;
}

export interface iActuatorRecordsResponse {
    success: boolean;
    records: iActuatorsData[];
    error?: any;
}
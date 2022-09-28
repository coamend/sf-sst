import { System } from "../../graphql/genql";

const CONVERT_SOLAR_TEMP_TO_KELVIN = 6000;
const CONVERT_SOLAR_RADIUS_TO_KM = 695700;
const CONVERT_AU_TO_KM = 149598000;

export const getSolarEnergyForOrbit = (system: System, orbit: number): number => {
    let temp = system.solarTemperatureTotal * CONVERT_SOLAR_TEMP_TO_KELVIN;
    let radius = system.solarRadiusAverage * CONVERT_SOLAR_RADIUS_TO_KM;
    let dist = orbit * CONVERT_AU_TO_KM;

    return temp * Math.sqrt(radius / (2 * dist));
};
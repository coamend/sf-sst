import { ulid } from "ulid";
import { System, Planet } from "../../graphql/genql";
import { calculateHillSphere } from "./calculateHillSphere";
import { calculateRocheLimit } from "./calculateRocheLimit";
import { getRandomNumberInRange } from "./getRandomNumberInRange";
import { PlanetType } from "./generatePlanets";

const CONVERT_EARTH_RADII_TO_AU: number = 0.0000426;
const LUNAR_DENSITY_ESTIMATE: number = 0.8;
const PLANETARY_MASS_LUNAR_PROBABILITY: number = 10;
const NUM_MOONS_DECREASING_PROBABILITY: number = 5;
const ORBITAL_MULTIPLIER_MIN_MAX: Array<number> = [1.4, 2.0];
const LUNAR_ECCENTRICITY_MIN_MAX: Array<number> = [0,0.5];
const LUNAR_RADIUS_MAX: number = 0.8;
const LUNAR_MASS_MAX: number = 0.8;
const WARM_RING_CHANCE: number = 0.01;
const FROST_RING_CHANCE: number = 0.25;
const RADIUS_TO_MAX_MASS_LIMIT: number = 1.5;
const RING_MASS_MIN_MAX: Array<number> = [0.0001, 0.02];
const PROGRADE_ORBIT_PROBABILITY: number = 0.75;

export async function generateMoons(system: System, planet: Planet): Promise<Planet[]> {
    let moons = new Array<Planet>;
    let maxOrbit = calculateHillSphere(system.systemSolarMass, planet.mass, planet.averageOrbit, planet.eccentricity) / 2;
    let minOrbit = calculateRocheLimit(planet.radius, planet.density, planet.density * LUNAR_DENSITY_ESTIMATE) * CONVERT_EARTH_RADII_TO_AU;

    if(minOrbit < maxOrbit)
    {
        let startingOrbit: number;
        let currentOrbit = startingOrbit = (maxOrbit + minOrbit) / 2;
        let numMoons = 0;

        //Start at the midpoint and work inwards generating moons
        while (currentOrbit >= minOrbit) {
            if(getRandomNumberInRange([0,100]) < (PLANETARY_MASS_LUNAR_PROBABILITY * Math.sqrt(planet.mass)) - (NUM_MOONS_DECREASING_PROBABILITY * numMoons)) {
                moons.push(await generateMoon(system, planet, currentOrbit));

                numMoons += 1;
            }

            currentOrbit /= getRandomNumberInRange(ORBITAL_MULTIPLIER_MIN_MAX);
        }

        currentOrbit = startingOrbit * getRandomNumberInRange(ORBITAL_MULTIPLIER_MIN_MAX);

        //Start at the midpoint and work outwards generating moons
        while (currentOrbit <= maxOrbit) {
            if(getRandomNumberInRange([0,100]) < (PLANETARY_MASS_LUNAR_PROBABILITY * Math.sqrt(planet.mass)) - (NUM_MOONS_DECREASING_PROBABILITY * numMoons)) {
                moons.push(await generateMoon(system, planet, currentOrbit));

                numMoons += 1;
            }

            currentOrbit *= getRandomNumberInRange(ORBITAL_MULTIPLIER_MIN_MAX);
        }
    }

    return moons;
}

async function generateMoon(system: System, planet: Planet, orbit: number): Promise<Planet> {
    let moon: Planet;
    let planetID = ulid();
    let planetName = planet.planetName;
    let planetType: string;
    let averageTemperature, axialTilt, density = 0, mass, eccentricity, radius = 0, surfaceArea = 0;
    let ringChance: number = 0;
    let maxRadius = planet.radius * LUNAR_RADIUS_MAX;
    let maxMass = planet.mass * LUNAR_MASS_MAX;

    if(planet.averageOrbit > system.frostLine!) {
        ringChance = FROST_RING_CHANCE;
    }
    else {
        ringChance = WARM_RING_CHANCE;
    }

    eccentricity = getRandomNumberInRange(LUNAR_ECCENTRICITY_MIN_MAX);
    averageTemperature = planet.averageTemperature;

    if(Math.random() < ringChance)
    {
        planetType = PlanetType.RING;
        mass = getRandomNumberInRange(RING_MASS_MIN_MAX) * orbit;
    }
    else { //Normal moon
        planetType = PlanetType.MOON;
        radius = getRandomNumberInRange([0.01, maxRadius]);

        if(radius * RADIUS_TO_MAX_MASS_LIMIT < maxMass) {
            mass = getRandomNumberInRange([0.01, 1.5]);
        }
        else {
            let maxMassRatio = maxMass / radius;
            mass = getRandomNumberInRange([0.000001, maxMassRatio]) * radius;
        }

        density = mass / (radius ** 3);
        surfaceArea = 4 * Math.PI * (radius ** 2);
    }

    if(1 - Math.random() < PROGRADE_ORBIT_PROBABILITY) {
        axialTilt = getRandomNumberInRange([0, 90]);
    }
    else {
        axialTilt = getRandomNumberInRange([90, 180]);
    }

    moon = {
        planetID,
        parentPlanetID: planet.planetID,
        planetName,
        planetType,
        averageTemperature,
        axialTilt,
        density,
        mass,
        eccentricity,
        radius,
        surfaceArea,
        averageOrbit: orbit,
        systemID: system.systemID,
        __typename: "Planet"
    }

    return moon;
}
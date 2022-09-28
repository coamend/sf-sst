import { Client, System, Star, Planet, everything } from "../../graphql/genql";
import { ulid } from "ulid";
import { getRandomNumberInRange } from "./getRandomNumberInRange";
import { intToRomanNumeral } from "./intToRomanNumeral";
import { getSolarEnergyForOrbit } from "./getSolarEnergyForOrbit";

const MINIMUM_ORBITAL_DISTANCE: number = 0.15;
const ECCENTRICITY_MIN_MAX: Array<number> = [0, 0.1];
const ORBITAL_MULTIPLIER_MIN_MAX: Array<number> = [1.4, 2.0];
const EMPTY_ORBIT_PROBABILITY: number = 0.1;
const FROZEN_GAS_GIANT_PROBABILITY: number = 0.35;
const FROZEN_GAS_DWARF_PROBABILITY: number = 0.45;
const FROZEN_TERRESTRIAL_PROBABILITY: number = 0.7;
const FROZEN_SUPER_EARTH_PROBABILITY: number = 0.85;
const FROZEN_BROWN_DWARF_PROBABILITY: number = 0.9;
const FROZEN_ASTEROID_BELT_PROBABILITY: number = 1.0;
const WARM_GAS_GIANT_PROBABILITY: number = 0.1;
const WARM_TERRESTRIAL_PROBABILITY: number = 0.5;
const WARM_SUPER_EARTH_PROBABILITY: number = 0.8;
const WARM_ASTEROID_BELT_PROBABILITY: number = 0.95;
const WARM_BROWN_DWARF_PROBABILITY: number = 1.0;
const GAS_GIANT_MASS_MIN_MAX: Array<number> = [10, 4132];
const GAS_GIANT_RADIUS_MIN_MAX: Array<number> = [1.5, 5.0];
const GAS_GIANT_DENSITY_FACTOR: number = 3;
const GAS_DWARF_MASS_MIN_MAX: Array<number> = [1, 20];
const GAS_DWARF_RADIUS_MIN_MAX: Array<number> = [0.5, 3.0];
const GAS_DWARF_DENSITY_FACTOR: number = 3;
const TERRESTRIAL_MASS_MIN_MAX: Array<number> = [0.1, 1.0];
const TERRESTRIAL_DENSITY_MIN_MAX: Array<number> = [0.5, 2.0];
const TERRESTRIAL_RADIUS_FACTOR: number = 1/3;
const SUPER_EARTH_MASS_MIN_MAX: Array<number> = [1, 10];
const SUPER_EARTH_DENSITY_MIN_MAX: Array<number> = [0.5, 2.0];
const SUPER_EARTH_RADIUS_FACTOR: number = 1/3;
const BROWN_DWARF_MASS_MIN_MAX: Array<number> = [635, 25426];
const BROWN_DWARF_RADIUS_BASE: number = 12;
const BROWN_DWARF_DENSITY_FACTOR: number = 3;
const ASTEROID_BELT_MASS_FACTOR_MIN_MAX: Array<number> = [0.0001, 0.02];
const GAS_GIANT_INNER_LIMIT: number = 0.04;
const HOT_JUPITER_DISTANCE: number = 0.5;
const HOT_JUPITER_RADIUS_MIN_MAX: Array<number> = [1.5, 18];
const PROGRADE_ORBIT_PROBABILITY: number = 0.75;

export async function generatePlanets(system: System): Promise<Planet[]> {
    let planets = new Array<Planet>;
    let previousOrbit = 0;
    let currentOrbit = 0;
    let startingOrbit: number; 
    
    if(typeof system.habitableZoneInner == undefined || system.habitableZoneInner == 0 || typeof system.habitableZoneOuter == undefined || system.habitableZoneOuter == 0) {
        startingOrbit = currentOrbit = system.frostLine! + Math.random();
    }
    else {
        startingOrbit = currentOrbit = getRandomNumberInRange([system.habitableZoneInner!, system.habitableZoneOuter!]);
    }
    
    //Starting at the frost line and working inwards, generate planets
    while (currentOrbit >= system.innerOrbitLimit!) {
        if(previousOrbit == 0 || (previousOrbit - currentOrbit) > MINIMUM_ORBITAL_DISTANCE) { //Must be a minimum distance from the star
            if(currentOrbit > (system.forbiddenZoneOuter??0) || currentOrbit < (system.forbiddenZoneInner??0)){ //Must not be within the forbidden zone
                if(Math.random() > EMPTY_ORBIT_PROBABILITY) //Check if the orbit is empty of all objects
                {
                    planets.push(await generatePlanet(system, currentOrbit));
                }
            }
        }

        previousOrbit = currentOrbit;

        currentOrbit = currentOrbit / getRandomNumberInRange(ORBITAL_MULTIPLIER_MIN_MAX);
    }

    currentOrbit = startingOrbit * getRandomNumberInRange(ORBITAL_MULTIPLIER_MIN_MAX);
    previousOrbit = startingOrbit;

    //Starting at the frost line and working outwards, generate planets
    while (currentOrbit <= system.outerOrbitLimit!) {
        if(previousOrbit == 0 || (previousOrbit - currentOrbit) > MINIMUM_ORBITAL_DISTANCE) { //Must be a minimum distance from the star
            if(currentOrbit > (system.forbiddenZoneOuter??0) || currentOrbit < (system.forbiddenZoneInner??0)){ //Must not be within the forbidden zone
                if(Math.random() > EMPTY_ORBIT_PROBABILITY) //Check if the orbit is emptye of all objects
                {
                    planets.push(await generatePlanet(system, currentOrbit));
                }
            }
        }

        previousOrbit = currentOrbit;

        currentOrbit = currentOrbit * getRandomNumberInRange(ORBITAL_MULTIPLIER_MIN_MAX);
    }

    planets.sort(function(x, y) {
        if(x.averageOrbit > y.averageOrbit) {
            return 1;
        }
        else if(x.averageOrbit < y.averageOrbit) {
            return -1;
        }
        else {
            return 0;
        }
    })

    for(let i = 0; i < planets.length; i++)
    {
        planets[i].planetName += ' ' + intToRomanNumeral(i + 1);
    }

    return planets;
}

async function generatePlanet(system: System, orbit: number): Promise<Planet> {
    let planet: Planet;
    let planetID = ulid();
    let planetName = system.systemName
    let averageTemperature, axialTilt, density, mass, eccentricity, radius, surfaceArea;

    eccentricity = getRandomNumberInRange(ECCENTRICITY_MIN_MAX);

    let planetRoll = 1 - Math.random();

    if(orbit >= system.frostLine!) {
        if(planetRoll < FROZEN_GAS_GIANT_PROBABILITY) {
            mass = getRandomNumberInRange(GAS_GIANT_MASS_MIN_MAX);
            radius = Math.log10(10 * mass) + getRandomNumberInRange(GAS_GIANT_RADIUS_MIN_MAX);

            if(mass > 635 && radius > 11) { // Gas giants more massive than 2Mj collapse at 11 Re, so adjust it to max out somewhere around there
                radius = 11.5 - Math.random();
            }

            density = mass / (radius ** GAS_GIANT_DENSITY_FACTOR);
        }
        else if (planetRoll < FROZEN_GAS_DWARF_PROBABILITY) {
            mass = getRandomNumberInRange(GAS_DWARF_MASS_MIN_MAX);
            radius = Math.log10(10 * mass) + getRandomNumberInRange(GAS_DWARF_RADIUS_MIN_MAX);
            density = mass / (radius ** GAS_DWARF_DENSITY_FACTOR);
        }
        else if (planetRoll < FROZEN_TERRESTRIAL_PROBABILITY) {
            mass = getRandomNumberInRange(TERRESTRIAL_MASS_MIN_MAX);
            density = getRandomNumberInRange(TERRESTRIAL_DENSITY_MIN_MAX);
            radius = (mass / density) ** (TERRESTRIAL_RADIUS_FACTOR);
        }
        else if (planetRoll < FROZEN_SUPER_EARTH_PROBABILITY) {
            mass = getRandomNumberInRange(SUPER_EARTH_MASS_MIN_MAX);
            density = getRandomNumberInRange(SUPER_EARTH_DENSITY_MIN_MAX);
            radius = (mass / density) ** (SUPER_EARTH_RADIUS_FACTOR);
        }
        else if (planetRoll < FROZEN_BROWN_DWARF_PROBABILITY) {
            mass = getRandomNumberInRange(BROWN_DWARF_MASS_MIN_MAX);
            radius = BROWN_DWARF_RADIUS_BASE - Math.random();
            density = mass / (radius ** BROWN_DWARF_DENSITY_FACTOR);
        }
        else { // if (planetRoll < FROZEN_ASTEROID_BELT_PROBABILITY) {
            mass = orbit * getRandomNumberInRange(ASTEROID_BELT_MASS_FACTOR_MIN_MAX);
            radius = 0;
            density = 0;
        }
    }
    else { //Inside the frost line
        if(planetRoll < WARM_GAS_GIANT_PROBABILITY) {
            if(orbit < GAS_GIANT_INNER_LIMIT) //Too close to star, generating close in terrestrial
            {
                mass = getRandomNumberInRange(TERRESTRIAL_MASS_MIN_MAX);
                density = getRandomNumberInRange(TERRESTRIAL_DENSITY_MIN_MAX);
                radius = (mass / density) ** (TERRESTRIAL_RADIUS_FACTOR);
            }
            else if (orbit < HOT_JUPITER_DISTANCE) { //Hot Jupiter / Puffy Giant
                mass = getRandomNumberInRange(GAS_GIANT_MASS_MIN_MAX);
                radius = Math.log10(10 * mass) + getRandomNumberInRange(HOT_JUPITER_RADIUS_MIN_MAX);
                density = mass / (radius ** GAS_GIANT_DENSITY_FACTOR);
            }
            else {
                mass = getRandomNumberInRange(GAS_GIANT_MASS_MIN_MAX);
                radius = Math.log10(10 * mass) + getRandomNumberInRange(GAS_GIANT_RADIUS_MIN_MAX);

                if(mass > 635 && radius > 11) { // Gas giants more massive than 2Mj collapse at 11 Re, so adjust it to max out somewhere around there
                    radius = 11.5 - Math.random();
                }

                density = mass / (radius ** GAS_GIANT_DENSITY_FACTOR);
            }
        }
        else if (planetRoll < WARM_TERRESTRIAL_PROBABILITY) {
            mass = getRandomNumberInRange(TERRESTRIAL_MASS_MIN_MAX);
            density = getRandomNumberInRange(TERRESTRIAL_DENSITY_MIN_MAX);
            radius = (mass / density) ** (TERRESTRIAL_RADIUS_FACTOR);
        }
        else if (planetRoll < WARM_SUPER_EARTH_PROBABILITY) {
            mass = getRandomNumberInRange(SUPER_EARTH_MASS_MIN_MAX);
            density = getRandomNumberInRange(SUPER_EARTH_DENSITY_MIN_MAX);
            radius = (mass / density) ** (SUPER_EARTH_RADIUS_FACTOR);
        }
        else if (planetRoll < WARM_ASTEROID_BELT_PROBABILITY) {
            mass = orbit * getRandomNumberInRange(ASTEROID_BELT_MASS_FACTOR_MIN_MAX);
            radius = 0;
            density = 0;
        }
        else { // if (planetRoll < WARM_BROWN_DWARF_PROBABILITY) {
            mass = getRandomNumberInRange(BROWN_DWARF_MASS_MIN_MAX);
            radius = BROWN_DWARF_RADIUS_BASE - Math.random();
            density = mass / (radius ** BROWN_DWARF_DENSITY_FACTOR);            
        }
    }

    if((mass??0) > 0 && (radius??0) > 0)
    {
        surfaceArea = 4 * Math.PI * (radius ** 2);
    }

    if(1 - Math.random() < PROGRADE_ORBIT_PROBABILITY) {
        axialTilt = getRandomNumberInRange([0, 90]);
    }
    else {
        axialTilt = getRandomNumberInRange([90, 180]);
    }

    averageTemperature = getSolarEnergyForOrbit(system, orbit);

    planet = {
        averageOrbit: orbit,
        averageTemperature,
        axialTilt,
        density,
        mass,
        eccentricity,
        planetID,
        planetName,
        radius,
        surfaceArea,
        systemID: system.systemID,
        __typename: "Planet",
    };

    return planet;
}

export async function savePlanet(client: Client, message, planet: Planet): Promise<Planet> {
    return (await client.mutation({createPlanet: [{ 
        galaxyID: message.galaxyID, 
        planetID: planet.planetID,
        planetName: planet.planetName,
        quadrantX: message.quadrantX,
        quadrantY: message.quadrantY,
        sectorX: message.sectorX,
        sectorY: message.sectorY,
        subsectorX: message.subsectorX,
        subsectorY: message.subsectorY,
        systemID: planet.systemID,
        averageOrbit: planet.averageOrbit,
        eccentricity: planet.eccentricity,
        mass: planet.mass,
        radius: planet.radius,
        density: planet.density,
        surfaceArea: planet.surfaceArea,
        axialTilt: planet.axialTilt,
        averageTemperature: planet.averageTemperature,
        starID: planet.starID,
        parentPlanetID: planet.parentPlanetID,
    }, everything]})).createPlanet;
}
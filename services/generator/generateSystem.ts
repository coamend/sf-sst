import { Client, System, Star, everything } from "../../graphql/genql";
import { ulid } from "ulid";
import { getRandomNumberInRange } from "./getRandomNumberInRange";

const BINARY_AVG_DIST_MIN_MAX: Array<number> = [0.15, 600];
const BINARY_ECCENTRICITY_MIN_MAX: Array<number> = [0, 0.7];
const FORBIDDEN_ZONE_MULTIPLE: number = 3;
const MULTI_SYSTEM_DIST_MIN_MAX: Array<number> = [1200, 60000];
const INNER_ORBIT_LIMIT_MULTIPLE: number = 0.1;
const OUTER_ORBIT_LIMIT_MULTIPLE: number = 40;
const FROST_LINE_MULTIPLE: number = 4.85;
const HABITABLE_ZONE_INNER_MULTIPLE: number = 0.95;
const HABITABLE_ZONE_OUTER_MULTIPLE: number = 1.37;

export async function generateSystem(systemName: string, star1: Star, star2?: Star, star3?: Star, star4?: Star, parentSystemID?: string): Promise<System> {
    let totalMass = star1.mass + (star2?.mass?? 0) + (star3?.mass?? 0) + (star4?.mass?? 0);
    let luminositySqrt = Math.sqrt(star1.luminosity + (star2?.luminosity?? 0) + (star3?.luminosity?? 0) + (star4?.luminosity?? 0));
    let solarRadiusAverage: number;
    let solarTemperatureTotal = star1.surfaceTemperature + (star2?.surfaceTemperature?? 0) + (star3?.surfaceTemperature?? 0) + (star4?.surfaceTemperature?? 0);
    let binaryMinimumDistance, binaryAverageDistance, binaryMaximumDistance, barycenter, binaryEccentricity, frostLine, 
        forbiddenZoneInner, forbiddenZoneOuter, innerOrbitLimit, outerOrbitLimit, habitableZoneInner, habitableZoneOuter;

    if(typeof star2 != undefined){
        if(typeof star3 != undefined)
        {
            //calculate trinary/quad stuff here
            binaryAverageDistance = getRandomNumberInRange(MULTI_SYSTEM_DIST_MIN_MAX);

            if(typeof star4 != undefined) {
                solarRadiusAverage = ((star1.diameter / 2) + (star2?.diameter??0 / 2) + (star3?.diameter??0 / 2) + (star4?.diameter??0 / 2) / (4));
            }
            else {
                solarRadiusAverage = ((star1.diameter / 2) + (star2?.diameter??0 / 2) + (star3?.diameter??0 / 2) / (3));
            }

            if(star1.mass + (star2?.mass??0) >= (star3?.mass??0) + (star4?.mass??0)){
                barycenter = binaryAverageDistance * ((star3?.mass??0) + (star4?.mass??0) / (star1.mass + (star2?.mass??0) + (star3?.mass??0) + (star4?.mass??0)));
            }
            else
            {
                barycenter = binaryAverageDistance * (star1.mass + (star2?.mass??0) / (star1.mass + (star2?.mass??0) + (star3?.mass??0) + (star4?.mass??0)));
            }
        }
        else
        {
            //calculate binary stuff here
            binaryAverageDistance = getRandomNumberInRange(BINARY_AVG_DIST_MIN_MAX);

            solarRadiusAverage = ((star1.diameter / 2) + (star2?.diameter??0 / 2) / (2));

            if(star1.mass >= (star2?.mass??0)){
                barycenter = binaryAverageDistance * ((star2?.mass??0) / (star1.mass + (star2?.mass??0)));
            }
            else
            {
                barycenter = binaryAverageDistance * (star1.mass / (star1.mass + (star2?.mass??0)));
            }
        }

        binaryEccentricity = getRandomNumberInRange(BINARY_ECCENTRICITY_MIN_MAX);
        binaryMinimumDistance = barycenter * (1 - binaryEccentricity);
        binaryMaximumDistance = barycenter * (1 + binaryEccentricity);

        if(binaryMinimumDistance < 0.1){
            //numbers don't work, retry
            console.log("Generated failed binary system: parameters created binary too close (< 0.1 AU)");
        }

        forbiddenZoneInner = binaryMinimumDistance / FORBIDDEN_ZONE_MULTIPLE;
        forbiddenZoneOuter = binaryMaximumDistance * FORBIDDEN_ZONE_MULTIPLE;
    }
    else {
        solarRadiusAverage = star1.diameter / 2;
    }

    innerOrbitLimit = totalMass * INNER_ORBIT_LIMIT_MULTIPLE;
    outerOrbitLimit = totalMass * OUTER_ORBIT_LIMIT_MULTIPLE;

    frostLine = luminositySqrt * FROST_LINE_MULTIPLE;

    habitableZoneInner = luminositySqrt * HABITABLE_ZONE_INNER_MULTIPLE;
    habitableZoneOuter = luminositySqrt * HABITABLE_ZONE_OUTER_MULTIPLE;

    if(habitableZoneInner > (forbiddenZoneInner?? Number.MAX_VALUE) && habitableZoneOuter < (forbiddenZoneOuter?? 0)){
        //Habitable zone lies strictly withing the forbidden zone
        habitableZoneInner = undefined;
        habitableZoneOuter = undefined;
    }
    else if (habitableZoneInner < (forbiddenZoneOuter?? 0) && habitableZoneInner > (forbiddenZoneInner?? Number.MAX_VALUE)){
        //Habitable zone inner boundary lies within the forbidden zone, moving to forbidden zone outer boundary
        habitableZoneInner = forbiddenZoneOuter;
    }
    else if (habitableZoneOuter < (forbiddenZoneOuter?? 0) && habitableZoneOuter > (forbiddenZoneInner?? Number.MAX_VALUE)){
        //Habitable zone outer boundary lies within the forbidden zone, moving to forbidden zone inner boundary
        habitableZoneOuter = forbiddenZoneInner;
    }
    
    let system: System = {
        systemID: ulid(),
        solarRadiusAverage,
        solarTemperatureTotal,
        systemName,
        systemSolarMass: totalMass,        
        parentSystemID,
        binaryAverageDistance,
        barycenter,
        binaryEccentricity,
        binaryMaximumDistance,
        binaryMinimumDistance,
        forbiddenZoneInner,
        forbiddenZoneOuter,
        innerOrbitLimit,
        outerOrbitLimit,
        frostLine,
        habitableZoneInner,
        habitableZoneOuter,
        __typename: "System",
    }

    return system;
}

export async function saveSystem(client: Client, message, system: System): Promise<System> {
    return (await client.mutation({createSystem: [{ 
        galaxyID: message.galaxyID, 
        systemID: system.systemID,
        systemName: system.systemName,
        systemSolarMass: system.systemSolarMass,
        solarRadiusAverage: system.solarRadiusAverage,
        solarTemperatureTotal: system.solarTemperatureTotal,
        quadrantX: message.quadrantX,
        quadrantY: message.quadrantY,
        sectorX: message.sectorX,
        sectorY: message.sectorY,
        subsectorX: message.subsectorX,
        subsectorY: message.subsectorY,
        parentSystemID: system.parentSystemID,
        barycenter: system.barycenter,
        binaryAverageDistance: system.binaryAverageDistance,
        binaryEccentricity: system.binaryEccentricity,
        binaryMaximumDistance: system.binaryMaximumDistance,
        binaryMinimumDistance: system.binaryMinimumDistance,
        innerOrbitLimit: system.innerOrbitLimit,
        outerOrbitLimit: system.outerOrbitLimit,
        frostLine: system.frostLine,
        forbiddenZoneInner: system.forbiddenZoneInner,
        forbiddenZoneOuter: system.forbiddenZoneOuter,
        habitableZoneInner: system.habitableZoneInner,
        habitableZoneOuter: system.habitableZoneOuter,
    }, everything]})).createSystem;
}

export async function saveStar(client: Client, message, star: Star): Promise<Star> {
    return (await client.mutation({createStar: [{ 
        galaxyID: message.galaxyID, 
        quadrantX: message.quadrantX,
        quadrantY: message.quadrantY,
        sectorX: message.sectorX,
        sectorY: message.sectorY,
        subsectorX: message.subsectorX,
        subsectorY: message.subsectorY,
        systemID: star.systemID,
        starName: star.starName,
        diameter: star.diameter,
        luminosity: star.luminosity,
        mass: star.mass,
        spectralClass: star.spectralClass!,
        surfaceTemperature: star.surfaceTemperature,
    }, everything]})).createStar;
}
import { ulid } from "ulid";
import { Client, everything, Ore, Planet } from "../../graphql/genql";
import { getRandomNumberInRange } from "./getRandomNumberInRange";
import { PlanetType } from "./generatePlanets";

interface Minerals {
    "Noble Gas": number,
    "Polyatomic Nonmetal": number,
    "Diatomic Nonmetal": number,
    "Metalloid": number,
    "Alkaline Earth Metal": number,
    "Alkali Metal": number,
    "Base Metal": number,
    "Noble Metal": number,
    "Refractory Metal": number,
    "Rare Earth Element": number,
    "Actinide": number,
}

const GAS_GIANT_MINERAL_RATIOS: Minerals = { "Noble Gas": 1, "Polyatomic Nonmetal": 5, "Diatomic Nonmetal": 100, "Metalloid": 0.1, "Alkaline Earth Metal": 0.1, "Alkali Metal": 0.1, "Base Metal": 0.1, "Noble Metal": 0.01, "Refractory Metal": 0.1, "Rare Earth Element": 0.001, "Actinide": 0.001 };
const GAS_DWARF_MINERAL_RATIOS: Minerals = { "Noble Gas": 2, "Polyatomic Nonmetal": 2, "Diatomic Nonmetal": 5, "Metalloid": 1, "Alkaline Earth Metal": 1, "Alkali Metal": 1, "Base Metal": 1, "Noble Metal": 1, "Refractory Metal": 1, "Rare Earth Element": 1, "Actinide": 1 };
const HOT_JUPITER_MINERAL_RATIOS: Minerals = { "Noble Gas": 1, "Polyatomic Nonmetal": 1, "Diatomic Nonmetal": 100, "Metalloid": 0.1, "Alkaline Earth Metal": 0.1, "Alkali Metal": 0.1, "Base Metal": 0.1, "Noble Metal": 0.01, "Refractory Metal": 0.1, "Rare Earth Element": 0.001, "Actinide": 0.001 };
const SUB_EARTH_MINERAL_RATIOS: Minerals = { "Noble Gas": 1, "Polyatomic Nonmetal": 1, "Diatomic Nonmetal": 1, "Metalloid": 1, "Alkaline Earth Metal": 1, "Alkali Metal": 1, "Base Metal": 1, "Noble Metal": 1, "Refractory Metal": 1, "Rare Earth Element": 1, "Actinide": 1 };
const SUPER_EARTH_MINERAL_RATIOS: Minerals = { "Noble Gas": 1, "Polyatomic Nonmetal": 1, "Diatomic Nonmetal": 1, "Metalloid": 1, "Alkaline Earth Metal": 1, "Alkali Metal": 1, "Base Metal": 1, "Noble Metal": 1, "Refractory Metal": 1, "Rare Earth Element": 1, "Actinide": 1 };
const ASTEROID_BELT_MINERAL_RATIOS: Minerals = { "Noble Gas": 0.01, "Polyatomic Nonmetal": 5, "Diatomic Nonmetal": 0.01, "Metalloid": 1, "Alkaline Earth Metal": 1, "Alkali Metal": 1, "Base Metal": 1, "Noble Metal": 5, "Refractory Metal": 1, "Rare Earth Element": 1, "Actinide": 1 };
const BROWN_DWARF_MINERAL_RATIOS: Minerals = { "Noble Gas": 0.01, "Polyatomic Nonmetal": 0.01, "Diatomic Nonmetal": 0.01, "Metalloid": 1, "Alkaline Earth Metal": 1, "Alkali Metal": 1, "Base Metal": 1, "Noble Metal": 5, "Refractory Metal": 1, "Rare Earth Element": 2, "Actinide": 2 };
const RING_MINERAL_RATIOS: Minerals = { "Noble Gas": 0.1, "Polyatomic Nonmetal": 1, "Diatomic Nonmetal": 1, "Metalloid": 1, "Alkaline Earth Metal": 1, "Alkali Metal": 1, "Base Metal": 0.1, "Noble Metal": 0.001, "Refractory Metal": 0.1, "Rare Earth Element": 0.001, "Actinide": 0.001 };
const MOON_MINERAL_RATIOS: Minerals = { "Noble Gas": 1, "Polyatomic Nonmetal": 1, "Diatomic Nonmetal": 1, "Metalloid": 1, "Alkaline Earth Metal": 1, "Alkali Metal": 1, "Base Metal": 1, "Noble Metal": 1, "Refractory Metal": 1, "Rare Earth Element": 1, "Actinide": 1 };
const MINERAL_SIZE_RATIO: number = 3;
const ORE_MIN_MAX: Array<number> = [1, 16];
const CONVERT_TO_EARTH_MASS = 10000000; //5.972 * (10 ** 19) //Mass of the crust of the earth, in tons
const STRIP_RATIO_BASE = 1000;
const DEPTH_RATIO_MIN_MAX: Array<number> = [0, 500];

export async function generateOres(planet: Planet): Promise<Ore[]> {
    let ores = new Array<Ore>;
    let minerals: Minerals = GAS_GIANT_MINERAL_RATIOS;

    if(planet.planetType == PlanetType.GAS_DWARF) {
        minerals = GAS_DWARF_MINERAL_RATIOS;
    }
    else if (planet.planetType == PlanetType.GAS_GIANT) {
        minerals = GAS_GIANT_MINERAL_RATIOS;
    }
    else if (planet.planetType == PlanetType.HOT_JUPITER) {
        minerals = HOT_JUPITER_MINERAL_RATIOS;
    }
    else if (planet.planetType == PlanetType.TERRESTRIAL) {
        minerals = SUB_EARTH_MINERAL_RATIOS;
    }
    else if (planet.planetType == PlanetType.SUPER_EARTH) {
        minerals = SUPER_EARTH_MINERAL_RATIOS;
    }
    else if (planet.planetType == PlanetType.ASTEROID_BELT) {
        minerals = ASTEROID_BELT_MINERAL_RATIOS;
    }
    else if (planet.planetType == PlanetType.BROWN_DWARF) {
        minerals = BROWN_DWARF_MINERAL_RATIOS;
    }
    else if (planet.planetType == PlanetType.RING) {
        minerals = RING_MINERAL_RATIOS;
    }
    else if (planet.planetType == PlanetType.MOON) {
        minerals = MOON_MINERAL_RATIOS;
    }

    for(const mineral in minerals)
    {
        ores.push(await generateOre(planet, mineral, minerals[mineral]));
    }

    return ores;
}

async function generateOre(planet: Planet, mineral: string, quantity: number): Promise<Ore> {
    let ore: Ore;
    let oreID = ulid();
    let sizeRatio = planet.radius / MINERAL_SIZE_RATIO;
    let oreType, depth, size, stripRatio;

    let mineralRatio = sizeRatio * quantity / 4;
    size = mineralRatio * getRandomNumberInRange(ORE_MIN_MAX) * CONVERT_TO_EARTH_MASS;

    stripRatio = STRIP_RATIO_BASE ** (1 - Math.random());

    oreType = mineral;

    depth = getRandomNumberInRange(DEPTH_RATIO_MIN_MAX) * planet.radius;

    ore = {
        oreID,
        depth,
        size,
        stripRatio,
        oreType,
        systemID: planet.systemID,
        parentObjectID: planet.planetID,
        __typename: "Ore"
    }
    return ore;
}

export async function saveOre(client: Client, message, ore: Ore): Promise<Ore> {
    return (await client.mutation({createOre: [{
        galaxyID: message.galaxyID,
        quadrantX: message.quadrantX,
        quadrantY: message.quadrantY,
        sectorX: message.sectorX,
        sectorY: message.sectorY,
        subsectorX: message.subsectorX,
        subsectorY: message.subsectorY,
        systemID: ore.systemID,
        parentObjectID: ore.parentObjectID,
        oreType: ore.oreType,
        depth: ore.depth,
        size: ore.size,
        stripRatio: ore.stripRatio,
    }, everything]})).createOre;
}
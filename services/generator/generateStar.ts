import { Star, Client, everything } from "../../graphql/genql";
import { generateName } from "./generateName";
import { getRandomNumberInRange } from "./getRandomNumberInRange";

const O_TYPE_STAR_PROBABILITY: number = 0.00003;
const B_TYPE_STAR_PROBABILITY: number = 0.13;
const A_TYPE_STAR_PROBABILITY: number = 0.73;
const F_TYPE_STAR_PROBABILITY: number = 3.73;
const G_TYPE_STAR_PROBABILITY: number = 11.45;
const K_TYPE_STAR_PROBABILITY: number = 23.55;
const M_TYPE_STAR_PROBABILITY: number = 100;
const O_STAR_MASS_MIN_MAX: Array<number> = [16, 110];
const B_STAR_MASS_MIN_MAX: Array<number> = [2.1, 16];
const A_STAR_MASS_MIN_MAX: Array<number> = [1.4, 2.1];
const F_STAR_MASS_MIN_MAX: Array<number> = [1.04, 1.4];
const G_STAR_MASS_MIN_MAX: Array<number> = [0.8, 1.04];
const K_STAR_MASS_MIN_MAX: Array<number> = [0.45, 0.8];
const M_STAR_MASS_MIN_MAX: Array<number> = [0.08, 0.45];
const BROWN_DWARF_LUMINOSITY_BASE_EXPONENT: Array<number> = [0.23, 2.3];
const MAIN_SEQUENCE_LUMINOSITY_BASE_EXPONENT: Array<number> = [1, 4];
const GIANT_LUMINOSITY_BASE_EXPONENT: Array<number> = [1.5, 3.5];
const HYPERGIANT_LUMINOSITY_MULTIPLE: number = 3200;
const MASS_TO_DIAMETER_EXPONENT_RATIO: number = 0.74;
const MASS_TO_SURFACE_TEMP_EXPONENT_RATIO: number = 0.505;

export async function generateStar (
    starName: string,
    ): Promise<Star>
{
    let diameter: number = 1;
    let luminosity: number = 1;
    let mass: number = 1;
    let spectralType: string = "M";
    let surfaceTemp: number = 1;

    //Get Spectral Class and Mass
    let classRoll = (1 - Math.random()) * 100;

    if(classRoll < O_TYPE_STAR_PROBABILITY){
        spectralType = "O";
        mass = getRandomNumberInRange(O_STAR_MASS_MIN_MAX);
    }
    else if (classRoll < B_TYPE_STAR_PROBABILITY){
        spectralType = "B";
        mass = getRandomNumberInRange(B_STAR_MASS_MIN_MAX);
    }
    else if (classRoll < A_TYPE_STAR_PROBABILITY){
        spectralType = "A";
        mass = getRandomNumberInRange(A_STAR_MASS_MIN_MAX);
    }
    else if (classRoll < F_TYPE_STAR_PROBABILITY){
        spectralType = "F";
        mass = getRandomNumberInRange(F_STAR_MASS_MIN_MAX);
    }
    else if (classRoll < G_TYPE_STAR_PROBABILITY){
        spectralType = "G";
        mass = getRandomNumberInRange(G_STAR_MASS_MIN_MAX);
    }
    else if (classRoll < K_TYPE_STAR_PROBABILITY){
        spectralType = "K";
        mass = getRandomNumberInRange(K_STAR_MASS_MIN_MAX);
    }
    else { //classRoll < M_TYPE_STAR_PROBABILITY
        spectralType = "M"
        mass = getRandomNumberInRange(M_STAR_MASS_MIN_MAX);
    }

    //Calculate Luminosity
    if(mass < M_STAR_MASS_MIN_MAX[1]) {
        luminosity = BROWN_DWARF_LUMINOSITY_BASE_EXPONENT[0] * (mass ** BROWN_DWARF_LUMINOSITY_BASE_EXPONENT[1]);
    }
    else if (mass < A_STAR_MASS_MIN_MAX[1]) {
        luminosity = MAIN_SEQUENCE_LUMINOSITY_BASE_EXPONENT[0] * (mass ** MAIN_SEQUENCE_LUMINOSITY_BASE_EXPONENT[1]);
    }
    else if (mass < B_STAR_MASS_MIN_MAX[1]) {
        luminosity = GIANT_LUMINOSITY_BASE_EXPONENT[0] * (mass ** GIANT_LUMINOSITY_BASE_EXPONENT[1]);
    }
    else { //mass > B_STAR_MASS_MIN_MAX[1]
        luminosity = mass * HYPERGIANT_LUMINOSITY_MULTIPLE;
    }

    //Calculate Diameter
    diameter = mass ** MASS_TO_DIAMETER_EXPONENT_RATIO;

    //Calculate Surface Temperature
    surfaceTemp = mass ** MASS_TO_SURFACE_TEMP_EXPONENT_RATIO;

    let star: Star = {
        systemID: "",
        starName: starName,
        diameter: diameter,
        luminosity: luminosity,
        mass: mass,
        spectralClass: spectralType,
        surfaceTemperature: surfaceTemp,
        starID: "",
        __typename: "Star"
    }
    
    return star;
};
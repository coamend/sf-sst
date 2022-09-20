import { intToRomanNumeral } from "./intToRomanNumeral";
import { intToGreekLetter } from "./intToGreekLetter";
import { constellationNames } from "./reference_lists/constellationNames";
import { properNames } from "./reference_lists/properNames";
import { surveyNames } from "./reference_lists/surveyNames";
import { mythicalNames } from "./reference_lists/mythicalNames";

export const generateName = (): string => { 
    const nameOpts = [
        'roman numeral', 'number', 'greek letter', 'constellation', 'proper name', 'survey name', 'mythological name'];

    const prefix = returnCalculatedName(returnEquallyWeightedRandomName(nameOpts));
    const suffix = returnCalculatedName(returnEquallyWeightedRandomName(nameOpts));
  
    // TODO: order prefix and suffix, separate into two arrays? determine if single name should be used?
    const fullName = Array([prefix, suffix]).join(' ');

    return fullName;
};

export const generateProperName = (): string => {

    return returnEquallyWeightedRandomName(properNames);
}

export const generateConstellationName = (): string => {
    

    return returnEquallyWeightedRandomName(constellationNames);
}

export const generateSurveyName = (): string => {

    return returnEquallyWeightedRandomName(surveyNames);
}

export const generateMythicalName = (): string => {

    return returnEquallyWeightedRandomName(mythicalNames);
}

export const generateGreekPlusNumber = (x: number, y: number): string => {
    let output = '';

    let greek = intToGreekLetter((x * y) + x % 24);
    let num = y % 24;

    if(y > 0)
    {
        output = Array([greek, num]).join(' ');
    }
    else
    {
        output = greek;
    }

    return output;
}

const returnCalculatedName = (name: string): string => {
    
    if(name === 'roman numeral')
    {
        name = intToRomanNumeral(Math.floor(Math.random() * 9) + 1);
    }
    else if(name === 'number')
    {
        name = (Math.floor(Math.random() * 999) + 1).toString();
    }
    else if(name === 'greek letter')
    {
        name = intToGreekLetter(Math.floor(Math.random() * 24) + 1);
    }
    else if(name === 'constellation')
    {
        name = generateConstellationName();
    }
    else if(name === 'proper name')
    {
        name = generateProperName();
    }
    else if(name === 'mythological name')
    {
        name = generateMythicalName();
    }

    return name;
};

const returnEquallyWeightedRandomName = (nameList: string[]): string => {
    return nameList[Math.floor(Math.random() * nameList.length)];
};
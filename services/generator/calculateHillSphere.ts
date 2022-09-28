export const calculateHillSphere = (primaryMass: number, secondaryMass: number, orbit: number, eccentricity: number): number => {
    let minOrbit = orbit * (1 - eccentricity);
    let sphere = (primaryMass / (3 * secondaryMass)) ** (1/3);

    return minOrbit * sphere;
};
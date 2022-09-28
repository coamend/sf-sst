const ROCHE_LIMIT_FACTOR = 1.26;

export const calculateRocheLimit = (primaryRadius: number, primaryDensity: number, secondaryDensity: number): number => {
    return ROCHE_LIMIT_FACTOR * primaryRadius * ((primaryDensity / secondaryDensity) ** (1/3));
};
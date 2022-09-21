export const getRandomNumberInRange = (minMaxArray: Array<number>): number => {
    return (Math.random() * (minMaxArray[1] - minMaxArray[0])) + minMaxArray[0];
};
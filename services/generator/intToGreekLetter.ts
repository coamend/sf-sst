export const intToGreekLetter = (num: number): string => {
    let greekLetters = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'];
    
    if(num < 1 || num > greekLetters.length)
    { 
        throw new Error("Parameter must be between 1 and " + greekLetters.length); 
    }
    
    return greekLetters[num - 1];
}
import {
    renderMaxLengthError,
    renderMinLengthError,
    renderProhibitedSymbolsError,
} from "./common";

class MinLengthError extends Error {
    constructor(public minLength: number) {
        super("MinLengthError");
    }
}
class MaxLengthError extends Error {
    constructor(public maxLength: number) {
        super("MaxLengthError");
    }
}
class ProhibitedSymbolsError extends Error {
    constructor(public prohibitedSymbols: string[]) {
        super("PatternError");
    }
}

class DifferentCasesError extends Error {
    constructor() {
        super("DifferentCasesError");
    }
}

// No error info in signatures
const validatePassword = (rawPassword: string): string => {
    if (rawPassword.length > 16) {
        throw new MaxLengthError(16);
    }
    if (rawPassword.length < 8) {
        throw new MinLengthError(8);
    }
    /// df
    // ... other check
    return rawPassword;
};

// No exhaustive check
// New case is NOT guaranteed to be handled
// Default case might never happen
const renderPasswordValidationResult = (rawPassword: string): string => {
    try {
        const pwd = validatePassword(rawPassword);
        return `Your new password is ${rawPassword.toUpperCase()}`;
    } catch (e) {
        if (e instanceof MinLengthError) {
            return renderMinLengthError(e.minLength);
        }
        if (e instanceof MaxLengthError) {
            return renderMaxLengthError(e.maxLength);
        }
        if (e instanceof ProhibitedSymbolsError) {
            return renderProhibitedSymbolsError(e.prohibitedSymbols);
        }
        return "Some other error";
    }
};

export {};

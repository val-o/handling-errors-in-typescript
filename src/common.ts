import { makeMatch, makeMatchI } from "ts-adt/MakeADT";

export const renderMaxLengthError = (maxLength: number) => {
    return `Password should be less than ${maxLength} symbols`;
};
export const renderMinLengthError = (minLength: number) => {
    return `Password should be more than ${minLength} symbols`;
};
export const renderProhibitedSymbolsError = (prohibitedSymbols: string[]) => {
    return `Password must not contain ${prohibitedSymbols.join(", ")}`;
};

export const match = makeMatch("type");
export const matchI = makeMatchI("type");

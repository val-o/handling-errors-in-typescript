import {
    renderMaxLengthError,
    renderMinLengthError,
    renderProhibitedSymbolsError,
    match,
    matchI,
} from "./common";

export type MinLengthError = {
    type: "MinLength";
    minLength: number;
};
export type MaxLengthError = {
    type: "MaxLength";
    maxLength: number;
};
export type ProhibitedSymbolsError = {
    type: "ProhibitedSymbols";
    prohibitedSymbols: string[];
};

export type DifferentCasesError = {
    type: "DifferentCases";
};

export type PasswordValidationError =
    | MinLengthError
    | MaxLengthError
    // | DifferentCasesError
    | ProhibitedSymbolsError;

type PasswordValidationResult =
    | PasswordValidationError
    | {
          type: "Success";
          password: string;
      };

declare const validatePassword: (
    rawPassword: string
) => PasswordValidationResult;

// Exhaustive check
// New case is guaranteed to be handled by compiler
// No unnecessary default case
const renderPasswordValidationResult = (rawPassword: string): string => {
    const result = validatePassword(rawPassword);
    switch (result.type) {
        case "MaxLength":
            // Union member types are inferred
            return renderMaxLengthError(result.maxLength);
        case "MinLength":
            return renderMinLengthError(result.minLength);
        case "ProhibitedSymbols":
            return renderProhibitedSymbolsError(result.prohibitedSymbols);
        case "Success":
            return `Your new Password is ${result.password.toUpperCase()}`;
    }
};
// Hard to combine

// Using poor-man's pattern matching
const renderPasswordValidationResultM = (rawPassword: string): string => {
    const result = validatePassword(rawPassword);
    return matchI(result)({
        MaxLength: ({ maxLength }) => renderMaxLengthError(maxLength),
        MinLength: ({ minLength }) => renderMinLengthError(minLength),
        ProhibitedSymbols: ({ prohibitedSymbols }) =>
            renderProhibitedSymbolsError(prohibitedSymbols),
        Success: ({ password }) =>
            `Your new Password is ${password.toUpperCase()}`,
    });
};
/**
 * This can be cobmined with exceptions
 * - Unions for business errors
 * - Exceptions for infrastructure
 */

/*

F#

type ValidationResult = 
  | MinLengthError of int
  | MaxLengthError of int
  | ProhibitedSymbolsError of list string
  | Success of string

let renderPasswordValidationResult (result: ValidationResult) =
  match result with
    | MinLengthError (minLength)-> renderMinLengthError minLength
    | MaxLengthError (macLength)-> renderMaxLengthError maxLength
    | Success (password)-> renderResult password

*/

export {};

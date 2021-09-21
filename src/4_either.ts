import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { flow, pipe } from "fp-ts/lib/function";
import * as String from "fp-ts/string";
import { PasswordValidationError } from "./3_result_union";
import {
    match,
    renderMaxLengthError,
    renderMinLengthError,
    renderProhibitedSymbolsError,
} from "./common";

declare const validatePassword: (
    rawPassword: string
) => E.Either<PasswordValidationError, string>;


const renderError = (error: PasswordValidationError) =>
    pipe(
        error,
        match({
            MaxLength: ({ maxLength }) => renderMaxLengthError(maxLength),
            MinLength: ({ minLength }) => renderMinLengthError(minLength),
            ProhibitedSymbols: ({ prohibitedSymbols }) =>
                renderProhibitedSymbolsError(prohibitedSymbols),
        })
    );

const renderPassword = (p: string) => `Your new password is ${p}`;

const renderPasswordValidationResult = (rawPassword: string): string =>
    pipe(
        validatePassword(rawPassword),
        // Either is Functor
        E.map(String.toUpperCase),
        E.match(renderError, renderPassword)
    );

// Point-free style, not recommended
const renderPasswordValidationResultPointFree = flow(
    validatePassword,
    E.map(String.toUpperCase),
    E.match(renderError, renderPassword)
);

/**
 * Easier composing
 */
type UserInfo = { name: string };
type MissingQueryArgError = {
    type: "MissingQueryArgError";
};
type StorageError = {
    type: "StorageError";
};
type ParsingErorr = {
    type: "ParsingErorr";
};

// Not pure just for example
declare const getUserIdFromQuery: () => E.Either<MissingQueryArgError, string>;

declare const getRawUserFromStorageById: (
    userId: string
) => E.Either<StorageError, string>;

declare const parseUserInfo: (
    userRaw: string
) => E.Either<ParsingErorr, UserInfo>;

// Almost like with exceptions, but Error Types are inferred and preserved!
const getUserInfo = () =>
    pipe(
        getUserIdFromQuery(),
        // Either is Monad
        E.chainW(getRawUserFromStorageById),
        E.chainW(parseUserInfo)
    );

const renderUser = (): string =>
    pipe(
        getUserInfo(),
        E.match(
            // Merge two ways (red and green)
            match({
                MissingQueryArgError: (_) => "Your URL is not valid",
                ParsingErorr: (_) => "Please sign out and sign in again",
                StorageError: (_) => "Not enough disk space",
            }),
            ({ name }) => `Hello ${name}!`
        )
    );

/**
 * Do not use for react props -> rerenders 
 */


export {};

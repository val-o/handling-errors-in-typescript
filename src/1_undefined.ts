const validatePassword = (rawPassword: string): string | undefined => {
    //....  Logic
    if (rawPassword.length > 0) {
        return rawPassword;
    }
    return undefined;
};

const renderPasswordValidationResult = (rawPassword: string): string => {
    const pwd = validatePassword(rawPassword);
    return pwd ? `Your new password is ${pwd.toUpperCase()}` : "Error";
};

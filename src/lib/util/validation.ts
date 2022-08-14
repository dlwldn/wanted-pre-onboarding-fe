// 원래 이메일 체크 정규식은 아래 주석과 같지만, 문제대로 @만 포함하도록 하였음.
// const EMAIL_REGEX = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const EMAIL_REGEX = /[@]/;
const PW_MIN_LENGTH = 8;

export type ValidationStatus = "idle" | "valid" | "invalid";

export const validateEmail = (email: string): ValidationStatus => {
    if(email.length === 0) return 'idle'
    if(EMAIL_REGEX.test(email)) return 'valid'
    return 'invalid'
}

export const validatePW = (password: string): ValidationStatus => {
    if(password.length === 0) return 'idle'
    if(password.length >= PW_MIN_LENGTH) return 'valid'
    return 'invalid'
}
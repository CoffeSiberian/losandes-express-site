interface CapchaType {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    error_codes: string[] | undefined;
}

export { CapchaType };

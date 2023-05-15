interface ContactBodyNotValid {
    name: string | undefined;
    email: string | undefined;
    discord: string | undefined;
    reason: string | undefined;
    message: string | undefined;
    captcha: string | undefined;
}

interface ContactBodyValid {
    name: string;
    email: string;
    discord: string | undefined;
    reason: string;
    message: string;
    captcha: string;
}

export { ContactBodyNotValid, ContactBodyValid };

interface iaResponse {
    role: string;
    id: string;
    parentMessageId: string;
    text: string;
    delta: string;
    detail: {
        id: string;
        object: string;
        created: number;
        model: string;
        choices: {
            delta: {
                content: string;
            };
            index: number;
            finish_reason: string | null;
        }[];
    };
}

interface iaResponseList {
    messages: iaResponse[];
}

export { iaResponse, iaResponseList };

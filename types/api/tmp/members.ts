export interface Member {
    id: number;
    user_id: number;
    username: string;
    steam_id: number;
    role_id: number;
    role: string;
    is_owner: boolean;
    joinDate: string;
}

export interface Response {
    members: Member[];
    members_count: number;
}

export interface ResponseTMP {
    error: boolean;
    response: Response;
}

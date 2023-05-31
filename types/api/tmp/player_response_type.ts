export interface Response {
    id: number;
    name: string;
    avatar: string;
    smallAvatar: string;
    joinDate: string;
    steamID64: number;
    steamID: string;
    discordSnowflake: string | null;
    displayVTCHistory: boolean;
    groupName: string;
    groupColor: string;
    groupID: number;
    banned: boolean;
    bannedUntil: string | null;
    bansCount: number;
    displayBans: boolean;
    patreon: Patreon;
    permissions: Permissions;
    vtc: VTC;
    vtcHistory: VTCHistory[] | any[];
}

export interface Patreon {
    isPatron: boolean;
    active: boolean;
    color: string | null;
    tierId: number | null;
    currentPledge: number | null;
    lifetimePledge: number | null;
    nextPledge: number | null;
    hidden: boolean | null;
}

export interface Permissions {
    isStaff: boolean;
    isUpperStaff: boolean;
    isGameAdmin: boolean;
    showDetailedOnWebMaps: boolean;
}

export interface VTC {
    id: number;
    name: string;
    tag: string;
    inVTC: boolean;
    memberID: number;
}

export interface VTCHistory {
    id: number;
    name: string;
    verified: boolean;
    joinDate: string;
    leftDate: string;
}

export interface ResponseTMP {
    error: boolean;
    response: Response;
}

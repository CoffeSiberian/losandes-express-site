interface User {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: string | null;
    global_name: string | null;
    avatar_decoration: string;
    display_name: string | null;
    banner_color: string | null;
}

interface Member {
    avatar: string | null;
    communication_disabled_until: string | null;
    flags: number;
    joined_at: string;
    nick: string | null;
    pending: boolean;
    premium_since: string | null;
    roles: string[];
    user: User;
    mute: boolean;
    deaf: boolean;
}

interface ListMembers {
    members: Member[];
}

export { User, Member, ListMembers };



type ParsedUserId = {
    username: string;
    hostname: string;
}

export function parseUserId(userId: string): ParsedUserId {
    let parts = userId.split('@');
    return {
        username: parts[1],
        hostname: parts[2]
    };
}
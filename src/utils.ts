

type ParsedUserId = {
    username: string;
    hostname: string;
}

export function parseUserId(userId: string): ParsedUserId {
    let parts = userId.split('@');
    return {
        username: parts[0],
        hostname: parts[1]
    };
}
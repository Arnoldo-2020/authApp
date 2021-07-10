

export interface AuthResponse {
    ok     : boolean,
    uid?   : string,
    name?  : string,
    token? : string,
    email?  : string,
    msg?   : string
}

export interface User {
    uid : string,
    email?: string,
    name: string
}
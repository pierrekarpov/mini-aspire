import jwt from 'jsonwebtoken';
;

const jwtSecret = process.env.JWT_SECRET || 'dummySecret';

export function createJwtToken(tokenObject: any) {
    return jwt.sign(tokenObject, jwtSecret);
}

export function decodeJwtToken(token: string) {
    return jwt.decode(token);
}

export function getUser(autorizationHeader: string) {
    return decodeJwtToken(autorizationHeader.split(' ')[1])
}

// decodeJwtToken(token) {
        //     return jwt.decode(token);
        // },
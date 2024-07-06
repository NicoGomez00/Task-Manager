import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export function createAccessToken(userId) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { id: userId },
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}

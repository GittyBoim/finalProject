import { decode } from 'base-64';
import { Alert } from 'react-native';

export function decodeToken(token: string | null): number
{
  if(!token)
    throw new Error("token not exist");

    const tokenParts = token.split('.');
    const payloadBase64 = tokenParts[1];
  
    const decodedPayload = decode(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);

    const userId: number = decodedToken.id;
    return userId;
}
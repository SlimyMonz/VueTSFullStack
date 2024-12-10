import { z } from 'zod';
import jwt from 'jsonwebtoken';

export async function decodeAndVerifyJwtToken(token: string): Promise<ZodJwtType> {
    try {
      // Verify and decode the JWT token using the secret key. (Secret should be loaded by DOTENV)
      const decodedJwt = jwt.verify(token, 'SECRET_KEY'); 
  
      // Check if the decoded JWT matches ZodJwtType
      if (isZodJwtType(decodedJwt)) {
        return decodedJwt; // Return decodedJwt if it's valid
      } else {
        throw new Error('Decoded token does not match the expected structure');
      }
  
    } catch (error) {
      // Handle verification failure.
      throw new Error('Invalid or expired token');
    }
  }

  export function generateAndEncodeJwtToken(username: string): string {
    // Create the payload for the JWT token
    const payload: ZodJwtType = {
      Username: username,
    };
  
    // Generate the JWT token and sign it using the secret key
    const token = jwt.sign(payload, 'SECRET_KEY', { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
  }

export const ZodJwt = z.object({
    Username: z.string()
})

// Type guard function to check if an object is of type ZodJwtType
function isZodJwtType(decoded: any): decoded is ZodJwtType {
    return decoded && typeof decoded.Username === 'string';
  }

export type ZodJwtType = z.infer<typeof ZodJwt>;


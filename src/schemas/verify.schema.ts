import {z} from 'zod';

export const verifySchema = z.object({
    code:z.string().length(5,"Code must be 6 characters long")   ,
})
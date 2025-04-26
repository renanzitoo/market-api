import { z } from 'zod';

export const productSchema = z.object(
  {
    id: z.string().optional(),
    name: z.string(),
    brand: z.string(),
    price: z.number(),
    marketId: z.string(),  
    photo: z.string().optional()
  }
)
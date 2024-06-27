import { z } from "zod";
//zod es un validador de datos 

export const createTaskSchema =  z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    description: z.string({
        required_error: 'Description is required',
    }),
    date: z.string().datetime().optional(),
});

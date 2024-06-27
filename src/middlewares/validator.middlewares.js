//Valida los datos del schema de zod para crear tareas
export const validatorSchema = (schema) => (req, res, next) => {
    try {
        //Ejecuta los schema q se pasen por parametro
        schema.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json(error.errors.map((error) => error.message))
    }
}
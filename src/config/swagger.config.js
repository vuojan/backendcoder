export const swaggerOpts = {

    definition:{
        openapi: "3.1.0",
        info:{
            title: "API documentation",
            description: "How to use each endpoint",
            version: "1.0.0"
        }

    },

    apis: [

        "./src/docs/**/*.yml"
    ],

}
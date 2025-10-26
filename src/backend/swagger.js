import swaggerJsdoc from "swagger-jsdoc";
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Mi API REST - Proyecto Tienda de celulares", 
        version: "1.0.0",
        description: "Documentación de API con Express, Prisma y PosgreSQL",
        contact:{
            email:"1641249@senati.pe"
        }
    },
    servers: [{
        url: "http://localhost:3000",
        description:"Servidor de Desarrollo"
      },
    ],
  },
  apis: ["./src/backend/routes/*.js"],
};
export const swaggerSpec = swaggerJsdoc(swaggerOptions);

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'ShopSphere API',
    description: 'CSE 341 CRUD API using MongoDB (Users & Products)'
  },
  /* host: 'localhost:3000',
  schemes: ['http'], */
  host: 'shopsphere-api-cpww.onrender.com',
  schemes: ['https'],
  tags: [
    {
      name: 'Users',
      description: 'User management endpoints'
    },
    {
      name: 'Products',
      description: 'Product management endpoints'
    }
  ]
};

// Output file
const outputFile = './swagger/swagger-output.json';

// List of route files to include in Swagger
const endpointsFiles = [
  './routes/index.js' // <-- add your courses routes here
];

// Generate swagger-output.json
swaggerAutogen(outputFile, endpointsFiles, doc);

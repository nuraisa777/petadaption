
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pet-adoption';
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// swagger
const swaggerOptions = {
  definition: {                  
    openapi: '3.0.0',
    info: {
      title: 'Pet Adoption API',
      version: '1.0.0',
      description: 'API for managing pets for adoption',
    },
    servers: [
      { url: 'https://petadaption-y8ow.onrender.com' }
    ],
  },
  apis: ['./routes/*.js'],       
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//routes
app.use('/api/v1/pets', petRoutes);


// root
app.get('/', (req, res) => {
  res.send('Welcome to the Pet Adoption API');
});


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});

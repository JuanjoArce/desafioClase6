const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;

// Establecer la ubicación de las vistas y archivos estáticos
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Resto de tu configuración y rutas...

try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Base de datos conectada');
    app.listen(PORT, () => {
        console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
    });
} catch (error) {
    console.log(`No se pudo conectar con la BD error: ${error.message}`);
    process.exit(-1);
}

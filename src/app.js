import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import fs from 'fs';
import { productsRouter } from './routes/products.router.js';
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

app.use(express.json(), productsRouter);
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine','handlebars');
app.use(express.static('./src/public'))



// app.get('/',(req,res)=>{
// let testUser = {
// name:"Hilda",
// last_name:"Martinez"
// }
// res.render('index',testUser);
// })




app.use('/products', productsRouter)

try{
    await mongoose.connect('mongodb://0.0.0.0:27017/ecommerce')
  console.log('Base de datos conectada');
  app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});

} catch(error){
    console.log(`No se pudo conectar con la BD error: ${error.message}`);
    process.exit(-1);
}

import express from 'express';
import productRouter from "./routes/products.router.js"
import usuariosRouter from "./routes/users.router.js"
import handlerbars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';


const app = express();
const PORT = 9090;


//inicializamos el motor indicando con app.engine('que motor utilizaremos', el motor instanciado)
app.engine('handlebars', handlerbars.engine());

//Luego con app.set('views', ruta) indicamos en que parte del proyecto estaran las vistas , recuerda utilizar rutas absolutas pata evitar asuntos de ruteo relativo.
app.set('views',__dirname+'/views');
//Finalmente con app.set('view engine','handlebars') indicamos que el motor que ya inicializamos arriba es el que queremos utilizar. Es importante para saber que cuando digamos al servidor que renderice sepa que tiene que hacerlo con el motor de handlebars.
app.set('views engine','handlebars');
//seteamos de manera estatica nuestra carpeta public
app.use(express.static(__dirname+'/public'))

// app.get("/", (req, res)=>{
//     let testUser = {
//      name:"hilda",
//      last_name:"martinez"
//     }
//     res.render('index',testUser);
//  })

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// // //Routers
app.use("/api/product", productRouter);
app.use("/api/user", usuariosRouter);






const httpServer = app.listen(PORT, () =>{
    console.log(`Servidor escuchando por el puerto: ${PORT}`);
});
const socketServer = new Server(httpServer);
socketServer.on('connection',socket => {
    console.log(socket)
})
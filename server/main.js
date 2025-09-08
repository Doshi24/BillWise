import express, { Router } from 'express';
import cors from "cors"

//express
const main = express();
main.use(express.json());
//cors
main.use(cors())

//import routes
import router from './routes/product.route.js';

//route use 

main.use('/product', router);
main.use('/product', router);// for search
main.use('/product', router);// for select
main.use('/product', router);// for update
main.use('products',router); // for display
main.use('/product',router); //filter


// downloads
main.use('/product/list',router) 



// datalist
main.use('/product', router);
export default main;
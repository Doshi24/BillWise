import express from 'express';
import cors from "cors"

//express
const main = express();
main.use(express.json());
//cors
main.use(cors())
import productrouter from './routes/product.route.js'
//route use 
main.use('/product', productrouter);
// downloads
main.use('/product/list',productrouter) 
// datalist
main.use('/product', productrouter);

import suppliers_route from './routes/suppliers.route.js'
main.use('/api',suppliers_route)

export default main;
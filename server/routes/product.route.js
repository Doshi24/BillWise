import express from 'express';
import { setnewproduct , searchproduct,selectproduct, Updateproduct, DisplayProduct,FilterProduct, DownloadProducts } from '../Services/product.services.js';
import logger from '../utils/logger.js';
import { pcode } from '../middleware/datalist.js';

// router decalaration
const productrouter = express.Router();
// logger.info("Router called"+JSON.stringify(router));
productrouter.route('/new').post(setnewproduct);
productrouter.route('/search').get(searchproduct) /// fetch search product
productrouter.route('/select/:product_code').get(selectproduct)//select product details
productrouter.route('/update').post(Updateproduct)// update product details
productrouter.route('/display').get(DisplayProduct)// diplay products
productrouter.route('/filter').get(FilterProduct);// filter product
productrouter.route('/download').get(DownloadProducts);// donwloads


// datalist
productrouter.route('/').get(pcode)
export default productrouter;
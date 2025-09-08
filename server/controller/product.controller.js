import logger from "../utils/logger.js";
import { setnewproduct } from "../models/product.model.js";



const newproduct =  async (req, res) => {
let newproduct = setnewproduct
res.status(200).json({ message: "new product added", result : newproduct } );
logger.info("new product added"+JSON.stringify(newproduct) );

}



export default newproduct;
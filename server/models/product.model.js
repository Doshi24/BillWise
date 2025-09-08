import logger from "../utils/logger.js";
import {sql } from "../utils/dbconfig.js";
import { Parser } from "json2csv";

const setnewproduct = async (req, res) => {
    let product = req.body;
    const date = new Date();
    logger.info("product details "+JSON.stringify(product));
    // logger.info("product details111 "+JSON.stringify(newproduct));
    let newproduct = await sql("insert into products (product_code, name, description, per_unit_price, tax_rate, category_id, brand_id, unit_of_measure, tax_code_id, stock_quantity) values ('"+product.product_code+"', '"+product.name+"','"+product.description+"','"+product.per_unit_price+"','"+product.tax_rate+"','"+product.category_id+"','"+product.brand_id+"','"+product.unit_of_measure+"','"+product.tax_code_id+"', '"+product.stock_quantity+"' )") 
    logger.info("product details111 "+JSON.stringify(newproduct));
    res.status(200).json({ message: "new product added", result : product } );
    logger.info("new product added"+JSON.stringify(newproduct) );
}

logger.info("search product function called");
const searchproduct = async (req, res) => {
    let searchcode = req.query;
    logger.info("search code "+JSON.stringify(searchcode));
    let qry = "";
try {
    if(!searchcode) return res.json({ message: "" });
    qry = await sql("select * from products where product_code like '%"+searchcode.query+"%'  ");
    logger.info("select * from products where product_code like '%"+searchcode.query+"%'  ")
    logger.info("search product "+JSON.stringify(qry));
    res.json(qry);
} catch (error) {
    logger.error("error in search product "+error);
}
}


const selectproduct = async (req, res) => {
    logger.info("select product function called");
    const product = req.params;
    logger.info("select product function called with param "+JSON.stringify(product));
    try {
        if(!product) return res.json({ message: "" });
        const qry = await sql("select * from products where product_code like '%"+product.product_code+"%'");
        logger.info("select * from products where product_code = '"+product.product_code+"'")
        logger.info("selected product details "+JSON.stringify(qry));
        res.json(qry[0]);
    } catch (error) {
        logger.error("error in select product "+error);
    }
}


const Updateproduct = async (req, res) => {
    const product = req.body;
    logger.info("update product function called with body "+JSON.stringify(product));
    try {
        if(!product || Object.keys(product).length === 0) return res.status(200).json({ message: "provide data to update" });
        //build qry

        const params = [];
        const valuess = [];

        for(const [keys,values] of Object.entries(product)){
            if(keys !== 'product_code'){
                logger.info("key "+keys+" value "+values);
                params.push(`${keys} = ?`);
                valuess.push(values);
            }
        }

        const qry = await sql(`update products set ${params.join(", ")} where product_code = ?`, [...valuess, product.product_code] );
        logger.info(`update products set ${params.join(", ")} where product_code = ?`);
        logger.info("product updated "+JSON.stringify(qry));
        res.status(200).json({ message: "product updated", result: product });
    } catch (error) {
        logger.error("error in update product "+error);
        res.status(500).json({ message: "internal server error" } );
    }
}

const DisplayProduct  = async (req, res) => {
    var  dqry = {}
    dqry = await sql("select * from Products")
    logger.info("Display product" +JSON.stringify(dqry))
    res.status(200).json({message : "", result : dqry })
}


    const FilterProduct = async (req, res) => {
        // const product = req.query
        // logger.info("filter "+JSON.stringify(product))
        // if(!product) return res.json({message : "No Filter found "})

        // const fqry  =  await sql("select * from products where product_code = '"+product.product_code+"'")
        // logger.info(fqry)
        // res.status(200).json({result: fqry})


        // const fqry2 = await sql("select * from products where name = '"+product.name+"'")
        // res.status(200).json({result : fqry2})
        // }
        try {
    
            // let qry =  "select * from products where 1=1 "
    
            // if(product.product_code !== "") qry += "and product_code = '"+product.product_code+"' "
    
            // if(product.name !== "") qry += "and name = '"+product.name+"' "
    
            let qry = buildfilterqry(req.query) 
            logger.info(qry)
            
            qry= await sql(qry)
    
            res.status(200).json({result: qry})
        } catch (error) {
            logger.info("error eccored",error)
    }
}

const DownloadProducts = async (req, res) => {
    try {
        logger.info("download products")
        let qry = buildfilterqry(req.query)
        logger.info("Download Query: " + qry);
        
        if (!qry || qry.length === 0) {
            logger.info("no filter found so downloaded all the products")
            return res.status(404).json({ message: "No products found" });
        }
        let  DPQRY_filter = await sql(qry)
        let data = new Parser()
        let file = data.parse(DPQRY_filter)

        res.header("content-type","text/csv");
        res.attachment("products.csv");
        res.status(200).send(file)
    } catch (error) {
        console.log("file not downloaded" ,error)
    }
}



const  buildfilterqry =  (filters) => {
    
        try {
            let qry =  "select * from products where 1=1 "
        
            if(filters.product_code !== "") qry += "and product_code = '"+filters.product_code+"' "
        
            if(filters.name !== "") qry += "and name = '"+filters.name+"' "
            logger.info("build qry "+qry)
            return qry
        } catch (error) {
        console.log("qry not formed for filter",error)
    }
}
export { setnewproduct, searchproduct, selectproduct, Updateproduct, DisplayProduct , FilterProduct, DownloadProducts};
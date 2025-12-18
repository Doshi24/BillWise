import { sql } from "../utils/dbconfig.js"
import logger from "../utils/logger.js"


const Createsuppliers =  async (req, res) => {
    try {
        let  {name, email, address, phone, category, payment_terms, notes} = req.body
    
        if( !name || name.trim ==="" ){
            return res.json({status : "unsuccess", message : "Name is Required "})
        }
        if(!phone  || !/^[0-9]{10}$/.test(phone)){
            return  res.json({status : "unsuccess", message : "Phone Number must be exaclty 10 digit "})
        }
    
        let Supplier = await sql("insert into suppliers (name, email, address, phone, category, payment_terms, notes) values('"+name+"', '"+email+"','"+address+"','"+phone+"','"+category+"','"+payment_terms+"','"+notes+"')")
     return res.json({status : "success", message : "Supplier Created !!!", data : null })  
    } catch (error) {
        logger.info("error at create suppliers", error.message)
    }
}


const displaysuppliers  = async (req, res) => {
    var  dqry = {}
    dqry = await sql("select * from Suppliers")
    logger.info("Display suppliers" +JSON.stringify(dqry))
    return res.json({status: "success", error: "", message : "suppliers Displayed Successfully !!!" ,result : dqry });
}


const searchSuppliers = async (req, res) => {
    let searchcode = req.query;
    logger.info("search code "+JSON.stringify(searchcode));
    let qry = "";
try {
    if(!searchcode) return res.json({ message: "" });
    qry = await sql("select * from suppliers where name like '%"+searchcode.query+"%'  ");
    logger.info("select * from suppliers where name like '%"+searchcode.query+"%'  ")
    logger.info("search suppliers "+JSON.stringify(qry));
    // res.json(qry);
    return res.json({status: "success", error: "", message : "Searched suppliers" ,result : qry });

} catch (error) {
    logger.error("error in search suppliers "+error);
    return res.json({status: "unsuccess", error: error, message : error  });
}
}

const selectSuppliers = async (req, res) => {
    logger.info("select suppliers function called");
    const suppliers = req.params;
    logger.info("select suppliers function called with param "+JSON.stringify(suppliers));
    try {
        if(!suppliers) return res.json({ message: "" });
        const qry = await sql("select * from suppliers where name like '%"+suppliers.name+"%'");
        logger.info("select * from suppliers where name = '"+suppliers.name+"'")
        logger.info("selected suppliers details "+JSON.stringify(qry));
        res.json(qry[0]);
    } catch (error) {
        logger.error("error in select suppliers "+error);
        return res.json({status: "unsuccess", error: error, message : error });
    }
}
const UpdateSuppliers = async (req, res) => {
    const suppliers = req.body;
    logger.info("update suppliers function called with body "+JSON.stringify(suppliers));
    try {
        if(!suppliers || Object.keys(suppliers).length === 0) return res.status(200).json({ message: "provide data to update" });
        //build qry
        const params = [];
        const valuess = [];

        for(const [keys,values] of Object.entries(suppliers)){
            if(keys !== 'id'){
                logger.info("key "+keys+" value "+values);
                params.push(`${keys} = ?`);
                valuess.push(values);
            }
        }
        const qry = await sql(`update suppliers set ${params.join(", ")} where id = ?`, [...valuess, suppliers.id] );
        logger.info(`update suppliers set ${params.join(", ")} where id = ?`);
        logger.info("suppliers updated "+JSON.stringify(qry));
        return res.json({status: "success", error: "", message : "suppliers Updated Successfully !!!" ,result : suppliers });
    } catch (error) {
        logger.error("error in suppliers suppliers "+error);
        return res.json({status: "unsuccess", error: error, message : error  });
    }
}
const FilterSuppliers = async (req, res) => {
    try {    
        let qry = buildfilterqry(req.query) 
        logger.info(qry)
        
        qry= await sql(qry)

        return res.json({status: "success", error: "", message : "Filter Suppliers return Successfully !!!" ,result : qry });
    } catch (error) {
        return res.json({status: "unsuccess", error: error, message : error ,result : qry });
    }
}

const DownloadSuppliers = async (req, res) => {
    try {
        logger.info("download supplierss")
        let qry = buildfilterqry(req.query)
        logger.info("Download Query: " + qry);
        
        if (!qry || qry.length === 0) {
            logger.info("no filter found so downloaded all the suppliers")
            // return res.status(404).json({ message: "No supplierss found" });
            return res.json({status: "success", error: "", message : "No suppliers found !!!"  });
        }
        let  DPQRY_filter = await sql(qry)
        let data = new Parser()
        let file = data.parse(DPQRY_filter)

        res.header("content-type","text/csv");
        res.attachment("suppliers.csv");
        res.send(file);
        // return res.json({status: "success", error: "", message : "suppliers File Downloaded Successfully !!!" ,result : send(file) });
    } catch (error) {
        return res.json({status: "unsuccess", error: error, message : error  });
    }
}

const  buildfilterqry =  (filters) => {  
    try {
        let qry =  "select * from suppliers where 1=1 "
        console.log("filters",filters)
        logger.info("filters",JSON.stringify(filters))
        if(filters.id !== "") qry += "and id = '"+filters.id+"' "

        if(filters.name !== "") qry += "and name = '"+filters.name+"' "
        logger.info("build qry "+qry)
        return qry
    } catch (error) {
    console.log("qry not formed for filter",error)
    }
}
export {Createsuppliers, displaysuppliers, DownloadSuppliers,selectSuppliers,UpdateSuppliers,searchSuppliers}
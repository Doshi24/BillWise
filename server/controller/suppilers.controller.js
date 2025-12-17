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
    logger.info("Display product" +JSON.stringify(dqry))
    return res.json({status: "success", error: "", message : "Product Displayed Successfully !!!" ,result : dqry });
}


export { Createsuppliers, displaysuppliers}
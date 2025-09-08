import { sql } from "../utils/dbconfig.js";

const pcode = async (req, res) => {
    let vsql = await sql("select product_code from products")
    res.status(200).json(vsql)
}

export { pcode }
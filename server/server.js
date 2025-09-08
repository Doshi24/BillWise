import { connectdb } from "./utils/dbconfig.js"
import main from "./main.js";
import logger from "./utils/logger.js";

connectdb().then(()=>{
    try {
        main.listen(process.env.PORT);
        logger.info(`Server started at port  http://localhost/${process.env.PORT}`);
        console.log(`Server started at port  http://localhost/${process.env.PORT}`);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error during database connection:", error);
    }
})
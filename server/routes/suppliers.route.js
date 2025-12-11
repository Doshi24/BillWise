import express from "express"
import Createsuppliers from "../controller/suppilers.controller.js"
const suppliers_route = express.Router()

suppliers_route.post('/supplier/new', Createsuppliers)


export default suppliers_route
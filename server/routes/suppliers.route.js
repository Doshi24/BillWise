import express from "express"
import {Createsuppliers, displaysuppliers} from "../controller/suppilers.controller.js"
const suppliers_route = express.Router()

suppliers_route.post('/supplier/new', Createsuppliers)
suppliers_route.get('/display-suppliers',displaysuppliers)


export default suppliers_route
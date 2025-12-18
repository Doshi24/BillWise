import express from "express"
import {Createsuppliers, displaysuppliers,DownloadSuppliers, searchSuppliers, selectSuppliers, UpdateSuppliers} from "../controller/suppilers.controller.js"
const suppliers_route = express.Router()

suppliers_route.post('/supplier/new', Createsuppliers)
suppliers_route.get('/display-suppliers',displaysuppliers)
suppliers_route.get('/suppliers/search',searchSuppliers)
suppliers_route.get('/suppliers/list/download',DownloadSuppliers)
suppliers_route.get('/suppliers/select/:name',selectSuppliers)
suppliers_route.post('/suppliers/update',UpdateSuppliers)
export default suppliers_route
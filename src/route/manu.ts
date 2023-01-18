import { Router } from "express";
import conect from "../controller/database";
import moment = require("moment");
const router = Router();
import cors from "cors";
import config from "../config/config.json";
import { WinstonLogger } from "../libs/logger";
import { Logger } from "winston";
const logger: Logger = WinstonLogger(__filename, config.log);
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

router.post("/get/data/all", async function (req, res) {
    res.json(await get_all_manu());
});

router.post("/get/data/by/:category_id", async function (req, res) {
    res.json(await get_manu_by_category(req.params.category_id));
});


async function get_all_manu() {
    return new Promise((resolve: any) => {
        var sql: string = `	
            SELECT 
            c.id as category_id,
            c.name as category_name,
            b.id as beverage_id,
            b.name as beverage_name,
            b.price,
            s.pcs
            FROM category c
            LEFT JOIN beverage b ON c.id = b.category_id
            LEFT JOIN stock s ON b.id = s.beverage_id
            WHERE  b.active_status = 1
        `;
        var values: Array<number | string> = [

        ];
    
        conect
        .query({
            sql: sql,
            values: values,
        })
        .then(([result, fields]: any) => {
            resolve(result);
        })
        .catch((err: any) => {
            logger.error("get data funtion get_all_manu err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

async function get_manu_by_category(category_id : number | string) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            SELECT 
            c.id as category_id,
            c.name as category_name,
            b.id as beverage_id,
            b.name as beverage_name,
            b.price,
            s.pcs
            FROM category c
            LEFT JOIN beverage b ON c.id = b.category_id
            LEFT JOIN stock s ON b.id = s.beverage_id
            WHERE c.id = ? AMD b.active_status = 1
        `;
        var values: Array<number | string> = [
        category_id
        ];
    
        conect
        .query({
            sql: sql,
            values: values,
        })
        .then(([result, fields]: any) => {
            resolve(result);
        })
        .catch((err: any) => {
            logger.error("get data funtion get_manu_by_category err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}  

export default router;
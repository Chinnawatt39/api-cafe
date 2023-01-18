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

router.post("/get/data/by/:category_id", async function (req, res) {
    var type = await get_type(req.params.category_id)
    var option = await get_option(req.params.category_id)
    var sweetnession = await get_sweetness(req.params.category_id)
    var json_result = {
        "type" : type,
        "option" : option,
        "sweetnession" : sweetnession
    } 
    res.json(json_result);
});
  
export async function get_type(category_id : number | string) {
return new Promise((resolve: any) => {
    var sql: string = `	
    SELECT c.id , 
	c.name as category_name, 
	t.name as type_name,
    t.price,
	t.id as type_id
	FROM category c
	LEFT JOIN attributes a ON c.id = a.id
	LEFT JOIN type t ON find_in_set(t.id, a.type_id) > 0
	WHERE c.id = ?`;
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
        logger.error("get data funtion get_type err: " + err);
        resolve({ status: "error", msg: err });
    });
});
}

export async function get_type_by_id(type_id : number | string) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            SELECT id, name, price 
            FROM type
            WHERE id = ?`;
        var values: Array<number | string> = [
            type_id
        ];
    
        conect
        .query({
            sql: sql,
            values: values,
        })
        .then(([result, fields]: any) => {
            resolve(result[0]);
        })
        .catch((err: any) => {
            logger.error("get data funtion get_type_by_id err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
    }
    

async function get_option(category_id : number | string) {
return new Promise((resolve: any) => {
    var sql: string = `	
        SELECT c.id , 
        c.name as category_name, 
        o.name as option_name,
        o.id as option_id
        FROM category c
        LEFT JOIN attributes a ON c.id = a.id
        LEFT JOIN options o ON find_in_set(o.id, a.option_id) > 0
        WHERE c.id = ?`;
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
        logger.error("get data funtion get_option err: " + err);
        resolve({ status: "error", msg: err });
    });
});
}

async function get_sweetness(category_id : number | string) {
return new Promise((resolve: any) => {
    var sql: string = `	
        SELECT c.id , 
        c.name as category_name, 
        s.name as sweetness_name,
        s.id as sweetness_id
        FROM category c
        LEFT JOIN attributes a ON c.id = a.id
        LEFT JOIN sweetness s ON find_in_set(s.id, a.sweetness_id) > 0
        WHERE c.id = ?
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
        logger.error("get data funtion get_sweetness err: " + err);
        resolve({ status: "error", msg: err });
    });
});
}
    
  
export default router;
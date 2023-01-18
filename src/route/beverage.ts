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
    res.json(await get_beverage_all());
});

router.post("/get/data/by/:beverage_id", async function (req, res) {
    res.json(await get_beverage_by_id(req.params.beverage_id));
});

router.post("/add/data", async function (req, res) {
    var beverage_id = await add_beverage(req.body);
    res.json(await add_stock(req.body.pcs,beverage_id));
});

router.put("/data/by/:beverage_id", async function (req, res) {
    await update_beverage(req.body, req.params.beverage_id)
    await update_stock(req.body.pcs, req.params.beverage_id)
    res.json("update beverage id : " + req.params.beverage_id)
});

router.put("/delete/by/:beverage_id", async function (req, res) {
    res.json(await delete_beverage(req.params.beverage_id));
});

async function get_beverage_all() {
    return new Promise((resolve: any) => {
        var sql: string = `	
            SELECT 
            name,
            price,
            duration
            FROM beverage
            where active_status = 1
        `;
        var values: Array<number | string> = [];
    
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

async function add_beverage(data : any) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            INSERT INTO beverage(category_id, name, price, duration, description) 
            VALUES(?, ?, ?, ?, ?);
        `;
        var values: Array<number | string> = [
            data.category_id,
            data.name,
            data.price,
            data.duration,
            data.description
        ];
    
        conect
        .query({
            sql: sql,
            values: values,
        })
        .then(([result, fields]: any) => {
            resolve(result.insertId);
        })
        .catch((err: any) => {
            logger.error("get data funtion get_all_manu err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

async function update_beverage(data : any , beverage_id : number | string) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            UPDATE beverage SET price = ?, duration = ?, description = ?, modify_date = ? WHERE id = ?
        `;
        var values: Array<number | string> = [
            data.price,
            data.duration,
            data.description,
            moment().format("YYYY/MM/DD HH:mm:ss"),
            beverage_id
        ];
    
        conect
        .query({
            sql: sql,
            values: values,
        })
        .then(([result, fields]: any) => {
            resolve("update beverage id");
        })
        .catch((err: any) => {
            logger.error("get data funtion get_all_manu err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

async function delete_beverage(beverage_id : number | string) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            UPDATE beverage SET active_status=0 WHERE id = ? `;
        var values: Array<number | string> = [
            beverage_id
        ];
    
        conect
        .query({
            sql: sql,
            values: values,
        })
        .then(([result, fields]: any) => {
            resolve("delete beverage id " + beverage_id);
        })
        .catch((err: any) => {
            logger.error("get data funtion get_all_manu err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}


export async function add_stock(pcs : any, beverage_id : any ) {
    return new Promise((resolve: any) => {
        var sql: string = `	
         INSERT INTO stock(pcs, beverage_id) VALUES(?, ?)
        `;
        var values: Array<number | string> = [
            pcs,
            beverage_id
        ];
    
        conect
        .query({
            sql: sql,
            values: values,
        })
        .then(([result, fields]: any) => {
            resolve("add beverage id : " + beverage_id);
        })
        .catch((err: any) => {
            logger.error("funtion add_stock err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

export async function update_stock(pcs : number , beverage_id : number | string) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            UPDATE stock SET pcs = ?
            WHERE beverage_id = ?
        `;
        var values: Array<number | string> = [
            pcs,
            beverage_id
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
            logger.error("funtion update_stock err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

export async function get_beverage_by_id(beverage_id : number | string) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            SELECT 
            b.name,
            b.price,
            b.duration,
            b.description,
            s.pcs
            FROM beverage b
            LEFT JOIN stock s ON b.id = s.beverage_id
            WHERE b.id = ?
        `;
        var values: Array<number | string> = [
            beverage_id
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
            logger.error("funtion get_beverage_by_id err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

export async function update_stock_from_calculate(pcs : number , beverage_id : number | string) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            UPDATE stock SET pcs = (pcs - ?) 
            WHERE beverage_id = ?
        `;
        var values: Array<number | string> = [
            pcs,
            beverage_id
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
            logger.error("funtion update_stock_from_calculate err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

export default router;


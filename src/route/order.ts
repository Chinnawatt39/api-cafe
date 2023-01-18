import { Router } from "express";
import conect from "../controller/database";
import moment = require("moment");
const router = Router();
import cors from "cors";
import config from "../config/config.json";
import { WinstonLogger } from "../libs/logger";
import { Logform, Logger } from "winston";
import { calculate_order, calculate_payment } from "./calculate";
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

router.post("/create/order", async function (req, res) {
    const order_code : number = Date.now()
    var amount = 0;
    var duration = 0;
    for(let i =  0; i < req.body.length; i++){
        console.log(req.body[i])
        var data_calculate_order : any = await calculate_order(req.body[i])
        create_order(order_code, req.body[i], data_calculate_order)
        amount += data_calculate_order.amount;
        duration += data_calculate_order.duration
    }
    create_payment(order_code, amount, duration)
    res.send("create order order_code : " + order_code)
});

router.post("/get/data/history", async function (req, res) {
    res.json(await get_history());
});

router.post("/get/detail/history/by/:order_code", async function (req, res) {
    res.json(await get_order_detail(req.params.order_code));
});


router.put("/payment/:order_code", async function (req, res) {
    var data_calculate_payment = await calculate_payment(req.body)
    res.json(await update_payment(req.params.order_code, req.body.pay, data_calculate_payment));
});


async function create_order(order_code : number , data : any, data_calculate_order : any) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            INSERT INTO 
            orders(order_code, beverage_id, quantity, type_id, option_id, sweetness_id, amount, duration)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `;
        var values: Array<number | string> = [
            order_code,
            data.beverage_id,
            data.quantity,
            data.type_id,
            data.option_id,
            data.sweetness_id,
            data_calculate_order.amount,
            data_calculate_order.duration
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
            logger.error("funtion create_order err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

async function create_payment(order_code : number , amount : number, duration : number) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            INSERT INTO payment(order_code, amount, duration) 
            VALUES(?, ?, ?) 
        `;
        var values: Array<number | string> = [
            order_code,
            amount,
            duration
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
            logger.error("funtion create_payment err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

async function update_payment(order_code : string ,  pay : any, data_calculate_payment : any) {
    return new Promise((resolve: any) => {
        console.log(data_calculate_payment);
        
        var sql: string = 
            'UPDATE payment SET pay=?, `change` = ?, status_payment = ? WHERE order_code = ?' ;
        var values: Array<number | string> = [
            pay,
            data_calculate_payment.change,
            data_calculate_payment.status_payment,
            order_code
        ];
    
        conect
        .query({
            sql: sql,
            values: values,
        })
        .then(([result, fields]: any) => {
            resolve("update payment order code : " + order_code);
        })
        .catch((err: any) => {
            logger.error("funtion update_payment err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

async function get_history() {
    return new Promise((resolve: any) => {
        var sql: string = `	
            SELECT 
            o.order_code,
            b.name as beverage_name,
            o.quantity,
            t.name as type_name,
            o.amount as beverage_amount,
            o.duration as beverage_duration,
            p.amount as sum_amount,
            p.duration as sum_duration,
            p.status_payment
            FROM orders o
            LEFT JOIN payment p ON o.order_code = p.order_code
            LEFT JOIN beverage b ON o.beverage_id = b.id
            LEFT JOIN type t ON o.type_id = t.id
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
            logger.error("funtion create_order err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}

async function get_order_detail(order_code : string) {
    return new Promise((resolve: any) => {
        var sql: string = `	
            SELECT 
            o.order_code,
            b.name as beverage_name,
            o.quantity,
            t.name as type_name,
            ot.name as option_name,
            s.name as sweetness_name,
            o.amount as beverage_amount,
            o.duration as beverage_duration,
            p.amount as sum_amount,
            p.duration as sum_duration,
            p.status_payment
            FROM orders o
            LEFT JOIN payment p ON o.order_code = p.order_code
            LEFT JOIN beverage b ON o.beverage_id = b.id
            LEFT JOIN type t ON o.type_id = t.id
            LEFT JOIN options ot ON o.option_id = ot.id
            LEFT JOIN sweetness s ON o.sweetness_id = s.id
            WHERE o.order_code = ?
        `;
        var values: Array<number | string> = [
            order_code
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
            logger.error("funtion create_order err: " + err);
            resolve({ status: "error", msg: err });
        });
    });
}


export default router;
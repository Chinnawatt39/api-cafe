import { get_beverage_by_id, update_stock_from_calculate } from './beverage'
import { get_type_by_id } from './attribute';

export async function calculate_order (data : any) {
    return new Promise(async (resolve: any) => {
        var data_beverage : any = await get_beverage_by_id(data.beverage_id)
        var data_type : any = await get_type_by_id(data.type_id)
        var beverage_price : any = Math.floor(data_beverage.price)
        var type_price : any = Math.floor(data_type.price)
        var beverage_duration : any = data_beverage.duration
        var amount =  (beverage_price + type_price) * data.quantity
        var duration =  beverage_duration * data.quantity
        var result = {
            "amount" : amount,
            "duration" : duration
        }
        update_stock_from_calculate(data.quantity, data.beverage_id)
        resolve(result)
    });
}

export async function calculate_payment (data : any) {
    return new Promise(async (resolve: any) => {
        var amount : number = Math.floor(data.amount)
        var pay : number = Math.floor(data.pay)
        var change : number =  pay - amount
        var status_payment : number = 0
        if(change >= 0){
            status_payment = 1
        }
        var result = {
            "change" : change,
            "status_payment" : status_payment
        }
        resolve(result)
    });
}

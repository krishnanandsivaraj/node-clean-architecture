require('module-alias/register');
import {client} from '@db/mongo';
import {UrbanAddress} from '@core/domain/entity'
import {AddressGateway}   from '@entity.gateway/mongo'
import { Error } from 'mongoose';
let config = {
    "uri"     : "mongodb://127.0.0.1:27017/find-my-address",
    "options" : {
        "useNewUrlParser"   : true,
        "bufferCommands"    : true,
        "autoIndex"         : true,
        "dbName"            : "find-my-address",
        "autoReconnect"     : true,
        "reconnectInterval" : 2000,
        "poolSize"          : 10,
        "socketTimeoutMS"   : 15000
    } 
}

let addressGateway   = new AddressGateway();

let address = new UrbanAddress();
address.streetName="mouchak";

client.initConnection(config.uri,config.options).then(()=>{
    console.log('connection open...');
    addressGateway.create(address).then((data)=>{
        console.log(data);
    }).catch((error:Error)=>{
        console.log(error);
    })

}).catch((error : Error)=>{
    console.log(error);
})
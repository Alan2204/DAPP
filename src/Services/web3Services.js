import { set_provider } from "../components/conection";
import Web3 from "web3";

let web3 = null;
const contractABI = require('../abi/storage.json')
const contractAddress = "0xb12bA76436C1f57c8c270a2ef7a5f47469629d00";

export const storageContract = set_provider().then(function(provider) {
    web3 = new Web3(provider)
    return new web3.eth.Contract(
        contractABI,
        contractAddress
      );
}, function(error) {
    console.log(error);
})

export class web3Services{
    async setProductos(name, price, account){
        return await (await (await (await storageContract).methods).setProductos(name, price)).send({from: account});
    }

    async getProductos(){
        return await(await(await(await storageContract).methods).getProductos()).call();
    }

}

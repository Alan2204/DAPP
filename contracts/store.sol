// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Manager{
    address public _owner;

    struct Product{
        string name;
        uint price;
    }

    Product[] private product;

    constructor(){
        _owner = msg.sender;

    }

    

    function getProductos() public view returns(Product[] memory){  //lo marcamos como view cuando es una funcion de consulta para que no necesite gas
        return product;
    }


    function setProductos(string memory name, uint price) public{  //Funcion para añadir productos
        require(msg.sender == _owner, "Solo el propietario puede hacer esta accion.");
        product.push(Product(name, price));
    }

    modifier is_Owner() {
        require(msg.sender == _owner);
        _;
    }

}

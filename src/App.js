import './App.css';
import React from 'react';
import { set_provider } from './components/conection';
import { web3Services } from './Services/web3Services';
import Head from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../src/styles/Global.module.css'
import Contenedor from './components/contenedor';


let servicesHandler = new web3Services();

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      accounts:[],
      productos:[],
      form_name: "",
      balance:0
    };

    this.handleChangeNameProductos = this.handleChangeNameProductos.bind(this);
    this.handleChangePrecioProductos = this.handleChangePrecioProductos.bind(this);
    this.registraProductos = this.registraProductos.bind(this);
  }

  handleChangeNameProductos(event) {
    this.setState({form_name_conf: event.target.value});
  }
  handleChangePrecioProductos(event){
    this.setState({form_price_conf: event.target.value});
  }


  async registraProductos(event) {
    await servicesHandler.setProductos(this.state.form_name_conf, this.state.form_price_conf, this.state.accounts[0]);
    await this.getProductos(this.state.accounts[0]);
  }

  async getProductos(){
    let productos = await servicesHandler.getProductos();
    this.setState({productos: productos});
  }

  async componentDidMount() {
    let accounts = await (await set_provider()).request({
        method:'eth_requestAccounts', 
    });
    this.setState({
        accounts: accounts,
    });
  }

  toEther(wei) {
    return wei * 0.000000000000000001;
  }

  render(){
    return(
      <React.Fragment>
      <Head></Head>
      <div className={styles.pagina}>
        <div className="row justify-content-around">
          <div className="col-4">
            <div>
              <lab>Nuevo producto</lab>
              <input onChange={this.handleChangeNameProductos} type="text" className="form-control" id="nameInput" placeholder="Ingresa el nombre del evento"/>
            </div>
            <div>
              <label>precio</label>
              <input onChange={this.handleChangePrecioProductos} type="text" className="form-control" id="nameInput" placeholder="Ingresa el precio del producto"/>
            </div>
            <button className="btn btn-primary" onClick={this.registraProductos}>Submit</button>
          </div>
          <div className="col-4">
            <Contenedor>
              {this.state.productos.map((producto, i) => {
                return(
                  <div key={i}>
                          <span>{producto.name} {producto.price}</span>
                          <button className="btn btn-sm btn-success" >Comprar</button>
                  </div>)
              })}
            </Contenedor>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  };
}

export default App;

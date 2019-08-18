import React, { Component } from 'react';
import { Box, Column, Title, Input, Field, Button, Control, Label } from "rbx";
import { connect } from 'react-redux';
import api from "../../services/api";
import history from '../../history';
var distance = require('google-distance-matrix');

distance.key('AIzaSyBADgH7FQrypikUSmtphFkr7NIEqJqP6R4'); 

var origins = ['-22.5475852,-44.1651029'];
var destinations = ['27345-000'];

let Correios = require('node-correios');
let correios = new Correios();

class OrderForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name:  '',
      cep:   '',
      phone_number: '',
      number: '',
      bairro: '',
      rua: '',
      restaurant_id: this.props.restaurant.id
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {

    

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if(value.length > 7)
      this.handleCEP();

  }

  
 


  handleSubmit(event) {
    event.preventDefault();
    api.createOrder(this.state, this.props.order, this.props.address).then((response) => {
      let id = response.data.order.id
      history.push(`/orders/${id}`)
    })
  }

  handleCEP(event) {     
    correios.consultaCEP({ cep: this.state.cep.concat('0') })    
  .then(result => {
    
    this.state.rua  = result.logradouro;
    this.props.address.street = result.logradouro;
    this.props.address.cep = this.state.cep;
    this.props.address.state  = result.uf;
    this.props.address.city  = result.localidade;
    this.state.bairro  = result.bairro;
    this.props.address.reference = result.bairro;

    document.getElementById("number_input").focus();
    
    console.log(result);   
      this.forceUpdate();
  })
  .catch(error => {
    console.log(error);
  })

  }


 


  render() {

    return (
      <Column.Group>
      
        <Column size={10} offset={1}>
            <br></br>
            <br></br>
          <Box>         
            
            <Column.Group>
            
              <Column size={10} offset={1}>
              <Title size={5} className="has-text-custom-green-darker">Informações de Entrega</Title>
                <form onSubmit={this.handleSubmit}>
                  <Field>
                    <Label>Nome</Label>
                    <Control>
                      <Input 
                        type="text" 
                        placeholder=""
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        />
                    </Control>
                  </Field>

                  <Field>
                    <Label>CEP</Label>
                    <Control>
                      <Input id='CEP_input'
                        type="number" 
                        placeholder='27345000'
                        name="cep"
                        value={this.state.cep}
                        onChange={this.handleInputChange}                                                
                        required
                        />
                    </Control>
                  </Field>


              <Field>
                    <Label>Rua</Label>
                    <Control>
                      <Input 
                        type="text" 
                        placeholder=""
                        name="rua"
                        value={this.state.rua}
                        onChange={this.handleInputChange}
                        />
                    </Control>
                  </Field>


                  <Field>
                    <Label>Número</Label>
                    <Control>
                      <Input id='number_input'
                        type="number" 
                        placeholder="100"
                        name="number"
                        value={this.state.number}                        
                        onChange={this.handleInputChange}
                        required
                        />
                    </Control>
                  </Field>

                  <Field>
                    <Label>Bairro</Label>
                    <Control>
                      <Input 
                        type="text" 
                        placeholder=""
                        name="bairro"
                        value={this.state.bairro}
                        onChange={this.handleInputChange}
                        />
                    </Control>
                  </Field>


                  <Field>
                    <Label>Telefone</Label>
                    <Control>
                      <Input 
                        type="tel" 
                        placeholder='(24) 99876-5432'
                        name="phone_number"
                        value={this.state.phone_number}
                        onChange={this.handleInputChange}
                      />
                    </Control>
                  </Field>
                  <Field>
                    <br/>
                    <Title size={6} className="has-text-custom-gray-darker">
                      Endereço de entrega
                    </Title>
                    <p>
                      {this.props.address.street}, {this.state.number}
                      </p>
                      <p>
                      {this.props.address.reference}, {this.props.address.city} - {this.props.address.state}
                    </p>            
                  </Field>

                  <br/>
                  {this.props.order.length > 0 && 
                    <Field kind="group" align="centered">
                      <Control>
                        <Button size="medium" color="custom-orange">
                          <span className="has-text-white">Realizar Pedido</span>
                        </Button>
                      </Control>
                    </Field>
                  }
                </form>
              </Column>
            </Column.Group>
          </Box>
        </Column>
      </Column.Group>
    )
  } 
}
    

const mapStateToProps = store => ({
  address: store.addressState.address,
  restaurant: store.newOrderState.restaurant,
  order: store.newOrderState.order
});

export default connect(mapStateToProps)(OrderForm);
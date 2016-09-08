//Imports necessários
import React, { Component } from 'react';
import './cart.css';

class Cart extends Component {

    constructor() {
        super();

        this.state = {
            cartItems: [],
            offset: 0
        };
    }

    render() {

        //Destrutive
        let {cartItemsList} = this.state;

        let cartItems = cartItemsList.map((member) => {

            let {id, login, company, blog, location, email, price} = member;

            return (
                <tr key={id}>
                    <td className="number">{id}</td>
                    <td>{login}</td>
                    <td>{company}</td>
                    <td><a href={blog} target="_blank">{blog}</a></td>
                    <td>{location}</td>
                    <td>{email}</td>
                    <td className="number">$ {price}</td>
                    <td className="formInput">
                        <div className="form-group" ref={'div_hours_' + id} style={{marginBottom: 0}}>
                            <input type="number"
                                   className="form-control"
                                   defaultValue="1"
                                   min="1"
                                   max="999"
                                   ref={'hours_' + id}
                                   onChange={(event) => this._updateCartItem(event, member)}
                                   required />
                        </div>
                    </td>
                    <td className="formInputButton">
                        <button className="btn btn-danger" onClick={(event) => this._removeCartItem(event, member)}>Remove</button>
                    </td>
                </tr>
            )}
        );

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Cart</h3>
                        </div>
                    </div>
                    {
                        cartItems.length > 0 ?

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form name="cart">
                                                <div className="table-responsive">
                                                    <table className="table table-hover table-bordered table-striped table-condensed cartItems">
                                                        <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Login</th>
                                                            <th>Company</th>
                                                            <th>Blog</th>
                                                            <th>Location</th>
                                                            <th>E-mail</th>
                                                            <th>Price (hour)</th>
                                                            <th>Hours</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cartItems}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="row" style={{marginBottom: 20}}>
                                        <div className="col-md-3">
                                            <button className="btn btn-primary">Buy now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                            <h4>Your cart is empty!</h4>
                    }
                </div>
            </div>
        );
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);

        this.setState({offset: offset}, () => {
            //this.loadCommentsFromServer();
        });
    };

    _addCartItem(member){

        const existItem =  this.state.cartItems.indexOf(member);

        if(existItem === -1)
            this.setState({cartItems: this.state.cartItems.concat(member)});
    }

    _removeCartItem(event, member){

        event.preventDefault();

        const cartItems = [...this.state.cartItems]; //Clona o array original
        const cartItemRemoveIndex = cartItems.indexOf(member);
        cartItems.splice(cartItemRemoveIndex, 1);

        if(cartItemRemoveIndex > -1)
            this.setState({cartItems});
    }

    _updateCartItem(event, member){

        event.preventDefault();

        const cartItems = this.state.cartItems;
        const cartItemUpdateIndex = cartItems.indexOf(member);

        const qtdHoras = this.refs['hours_' +member.id].value;

        //Se for 0, então removemos o item do carrinho
        if(qtdHoras == "0")
        {
            const cartItemsCopy = [...this.state.cartItems]; //Clona o array original
            cartItemsCopy.splice(cartItemUpdateIndex, 1);
            this.setState({cartItems: cartItemsCopy});
            return;
        }
        else if (qtdHoras == "") {
            this.refs['div_hours_' + member.id].className += " has-error";
            return;
        }

        //Remove a classe de erro
        this.refs['div_hours_' + member.id].className = this.refs['div_hours_' + member.id].className.replace(" has-error", "");

        //Senão, atualiza a quantidade de horas do item
        cartItems[cartItemUpdateIndex].hours = qtdHoras;
        this.setState({cartItems});
    }
}

export default Cart;

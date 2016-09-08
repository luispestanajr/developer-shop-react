import React, { Component } from 'react';
import Header from './header';
import MemberList from './memberlist';
import Cart from './cart';
import './home.css';

//Determinando a variável global jQuery com o require do jQuery que instalamos no node_modules
global.jQuery = require('jquery');

//Requisitar o Twitter Bootstrap
require('bootstrap');

//Declaração da classe principal do projeto
class DeveloperShop extends Component {

  render() {

        return (
            <div>
                <Header />
                <div className="container">
                    <MemberList addCartItem={(member) => this.refs.cart._addCartItem(member)} />
                    <Cart ref="cart" />
                </div>
            </div>
        );
    }
}

export default DeveloperShop;

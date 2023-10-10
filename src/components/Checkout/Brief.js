import React from "react";
import { Link } from 'react-router-dom';
import { useCartContext } from "../../context/CartContext";
import ItemCart from "../ItemCart/ItemCart";
import "./Cart.css";


const Cart = () => {
    const { Cart, totalPrice } = useCartContext();
  
    if (Cart.length === 0) {
        return (
            <>
                <p>No hay elementos en el carrito</p>
                <Link to='/'>Hacer Compras</Link>
            </>
        );
    }

    return (
        <>
            {
                Cart.map(product => <ItemCart key={product.id} product={product} />)
            }
            <p>
                total: {totalPrice()}
            </p>
            <Link to="/checkout">
                <button>Emitir Compra</button>
            </Link>
        </>
    )
}

export default Cart;

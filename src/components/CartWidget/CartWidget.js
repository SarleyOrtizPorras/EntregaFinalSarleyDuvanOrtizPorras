import React from 'react';
import { useCartContext } from '../../context/CartContext';
import Cart from './assets/cart.svg';


export const CartWidget = () => {
    const { totalProducts } = useCartContext();
    return (
        <>
            <img src={Cart} alt='Cart'/>
            <span>{totalProducts() || ''}</span>
        </>
    );
}

export default CartWidget;
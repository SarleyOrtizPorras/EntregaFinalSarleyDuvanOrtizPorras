import React, { useState } from "react";
import { getFirestore, addDoc, collection, } from "firebase/firestore";
import { useCartContext } from "../../context/CartContext";
import ItemCart from "../ItemCart/ItemCart";
import "./checkout.css"

const Checkout = () => {
  const { Cart, totalPrice } = useCartContext();
  console.log("Componente Checkout renderizado");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFinishPurchase = () => {
    // Lógica para finalizar la compra (puedes enviar los datos a tu backend aquí)
    console.log("Compra finalizada:", formData);
    const order = {
      buyer: formData,
      items: Cart.map(product => ({ id: product.id, title: product.title, price: product.price, quantity: product.quantity})),
      total: totalPrice(),
  }

    // Llama a la función proporcionada por el padre para indicar que la compra está completa
    handleClick(order);
  };

  const handleClick = (order) => {
    const db = getFirestore();
    const ordersCollection = collection(db, 'orders');
    addDoc(ordersCollection, order)
    .then(({ id }) => console.log(id))

        window.alert("¡Compra Exitosa!");
}

  return (
    <>
      <div className="checkoutmain">
        <h2>Checkout</h2>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Dirección:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </label>
          <br />
        </form>
        <br />
        <button onClick={handleFinishPurchase}>Finalizar compra</button>
      </div>
      <div>
        {
          Cart.map(product => <ItemCart key={product.id} product={product} />)
        }
        <p>
          total: {totalPrice()}
        </p>
        
      </div>
    </>
  );
};

export default Checkout;
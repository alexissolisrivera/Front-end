import PaypalCheckoutButton from "../components/PaypalCheckoutButton";
import { useEffect, useState } from "react";

const Checkout = () => {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    let loadCart = () => {
        if (localStorage.getItem('cart')) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            setTotal(cart.reduce((total, item) => total + item.price * item.quantity, 0));
            setProducts(cart);
        }
    }

    useEffect(() => {
        document.title = 'Checkout';
        loadCart();
    }, []);

    let eliminarProducto = (id) => {
        console.log("El id es: ", id);
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.forEach((item) => {
            if (item._id === id) {
                if (item.quantity === 1) {
                    let newCart = cart.filter((item) => item._id !== id);
                    localStorage.setItem('cart', JSON.stringify(newCart));
                } else {
                    item.quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            }
        });
        alert('Producto eliminado del carrito');
        loadCart();
    }

    return (
        <div className="p-4">
            <div className="row">
                <div className="col-md-5">
                    {products.map((product) => {
                        return (
                            <div className="card mb-3" key={product._id}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={product.image} className="img-fluid rounded-start h-100" alt="test" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <h5 style={{ color: "black" }}>${product.price}</h5>
                                            <p className="card-text"><small className="text-muted">Cantidad: {product.quantity}</small></p>
                                            <div className="text-start">
                                                <button className="btn btn-danger btn-sm" type="button" onClick={() => eliminarProducto(product._id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Resumen de compra</h5>
                            <p className="card-text">Tenemos envios gratuitos, aprovecha y compra nuestros productos.</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Subtotal <b> {total} USD</b></p>
                                    <p>Envio <b> 0.00</b></p>
                                    <p>Total <b> {total} USD</b></p>
                                </div>
                            </div>
                            <div className="text-center">
                                <PaypalCheckoutButton currency={"MXN"}
                                    amount={total}
                                    showSpinner={false} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default Checkout;
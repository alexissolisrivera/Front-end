import Hero from "../../components/Hero";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getProducts } from "../../services/Product.service";
import{getCategories} from "../../services/Category.service"

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        document.title = 'Productos';
        getProducts().then((res) => {
            setProducts(res.data);
        });
        getCategories().then((res) => {
            setCategorias(res.data);
        });
    }, []);

    let addProductToCart = (product) => {
        if (localStorage.getItem('cart')) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            let productExists = false;
            cart.forEach((item) => {
                if (item._id === product._id) {
                    item.quantity += 1;
                    productExists = true;
                }
            });
            if (!productExists) {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Producto agregado al carrito');
        } else {
            localStorage.setItem('cart', JSON.stringify([{ ...product, quantity: 1 }]));
            alert('Producto agregado al carrito');
        }
    }

    return (
        <main>
            <Hero />
            <div className="mt-5 p-5">
                <div className="row">
                    <div className="col-md-2">
                        <h5>Categorias</h5>
                        <ul className="mt-3 mb-4">
                            {categorias.map((categoria) => {
                                return (
                                    <li key={categoria._id}>
                                        {categoria.name}
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            {products.map((product) => {
                                return (
                                    <div className="col-sm-6 col-md-4" key={product._id}>
                                        <div className="card mb-4">
                                            <img src={product.image} className="card-img-top" alt='test' />
                                            <div className="card-body">
                                                <h3>${product.price}</h3>
                                                <h4 className='card-title'>{product.name}</h4>
                                                <p className="card-text">{product.description}</p>
                                                <div className="d-grid gap-2">
                                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => addProductToCart(product)}>Agregar al carrito</button>
                                                    <Link to={`/detail-product/${product._id}`} className="btn btn-warning btn-sm">Detalle</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductList;
import React from 'react';
import Hero from "../components/Hero";
const Home = () => {
    return (
        <main>
            <Hero />
            <a href="http://localhost:3000/products" className="btnB">Compra YA!</a>
        </main>
    );
}

export default Home;
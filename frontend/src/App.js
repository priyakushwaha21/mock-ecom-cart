import React, { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API || 'http://localhost:5000';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [checkoutData, setCheckoutData] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetch(API + '/api/products').then(r=>r.json()).then(setProducts);
    loadCart();
  }, []);

  function loadCart(){
    fetch(API + '/api/cart').then(r=>r.json()).then(setCart);
  }

  function addToCart(id){
    fetch(API + '/api/cart', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({productId:id, qty:1})})
      .then(r=>r.json()).then(()=>loadCart());
  }

  function removeItem(id){
    fetch(API + '/api/cart/' + id, {method:'DELETE'}).then(()=>loadCart());
  }

  function handleCheckout(e){
    e.preventDefault();
    fetch(API + '/api/checkout', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(checkoutData)})
      .then(r=>r.json()).then(data => {
        if (data.error) alert(data.error);
        else { setReceipt(data); loadCart(); }
      });
  }

  return (
    <div className="container">
      <header><h1>Vibe Commerce — Mock Cart</h1></header>
      <main>
        <section className="products">
          <h2>Products</h2>
          <div className="grid">
            {products.map(p => (
              <div key={p.id} className="card">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="price">₹{p.price.toFixed(2)}</div>
                <button onClick={()=>addToCart(p.id)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        <aside className="cart">
          <h2>Cart</h2>
          {cart.items.length===0 ? <p>Empty cart</p> : (
            <ul>
              {cart.items.map(it => (
                <li key={it.id}>
                  <strong>{it.name}</strong> — {it.qty} × ₹{it.price.toFixed(2)}
                  <button className="rm" onClick={()=>removeItem(it.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
          <div className="total">Total: ₹{cart.total.toFixed(2)}</div>

          <form onSubmit={handleCheckout} className="checkout">
            <h3>Checkout</h3>
            <input placeholder="Name" value={checkoutData.name} onChange={e=>setCheckoutData({...checkoutData, name:e.target.value})} required />
            <input placeholder="Email" value={checkoutData.email} onChange={e=>setCheckoutData({...checkoutData, email:e.target.value})} required />
            <button type="submit">Pay (Mock)</button>
          </form>
        </aside>
      </main>

      {receipt && (
        <div className="modal">
          <div className="modal-content">
            <h2>Receipt</h2>
            <p>Receipt ID: {receipt.id}</p>
            <p>Name: {receipt.name} | Email: {receipt.email}</p>
            <p>Total: ₹{receipt.total.toFixed(2)}</p>
            <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
            <button onClick={()=>setReceipt(null)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;

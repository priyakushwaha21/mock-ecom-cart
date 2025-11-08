const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbFile = path.join(__dirname, 'store.db');
const db = new sqlite3.Database(dbFile);

module.exports = {
  init: function() {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, name TEXT, price REAL, description TEXT)`);
      db.run(`CREATE TABLE IF NOT EXISTS cart (id TEXT PRIMARY KEY, productId TEXT, name TEXT, price REAL, qty INTEGER)`);

      db.get('SELECT COUNT(*) AS c FROM products', (err, row) => {
        if (row.c === 0) {
          const items = [
            ['p1','Retro Vinyl Record',29.99,'Classic vinyl album'],
            ['p2','Sneaker Socks (3 pack)',12.50,'Comfort fit socks'],
            ['p3','Minimalist Wallet',19.99,'Slim cardholder'],
            ['p4','Ceramic Mug',9.99,'12oz mug'],
            ['p5','Desk Plant (Succulent)',14.00,'Low maintenance plant']
          ];
          const stmt = db.prepare('INSERT INTO products(id,name,price,description) VALUES(?,?,?,?)');
          items.forEach(it => stmt.run(it));
          stmt.finalize();
        }
      });
    });
  },

  getProducts: function() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM products', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  addToCart: function(productId, qty) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
        if (err) return reject(err);
        if (!product) return reject(new Error('Product not found'));
        const id = productId + '-' + Date.now();
        db.run('INSERT INTO cart(id,productId,name,price,qty) VALUES(?,?,?,?,?)',
          [id, productId, product.name, product.price, qty], function(err) {
            if (err) reject(err);
            else resolve({ id, productId, name: product.name, price: product.price, qty });
          });
      });
    });
  },

  getCart: function() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM cart', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  removeFromCart: function(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM cart WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  clearCart: function() {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM cart', function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};

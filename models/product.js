const fs = require("fs");
const uniqid = require("uniqid");
const path = require("path");
const db = require("../util/database");
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
 
  db.execute("select * from products")
    .then((result) => {
      cb(result[0]);
    })
    .catch((err) => {
      cb([]);
    });
};

module.exports = class Product {
  constructor(prodid, title, imageUrl, description, price) {
    if (prodid == null) {
      this.id = uniqid();
    } else {
      this.id = prodid;
    }

    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const doublePrice = parseFloat(this.price);

    db.execute(
      `INSERT INTO \`udemy_node\`.\`products\` (\`id\`, \`title\`, \`price\`, \`description\`, \`imageUrl\`) VALUES ('${this.id}', '${this.title}', ${doublePrice}, '${this.description}', '${this.imageUrl}');`
    )
      .then((result) => {
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  edit() {
    const doublePrice = parseFloat(this.price);
    db.execute(`
      UPDATE \`udemy_node\`.\`products\` 
      SET 
      \`title\` = '${this.title}', 
      \`price\` = ${doublePrice}, 
      \`description\` = '${this.description}', 
      \`imageUrl\` = '${this.imageUrl}' 
      WHERE 
        \`id\` = '${this.id}';`).then((result) => {
          
        })
        .catch((err) => {
          console.log(err);
        });
  }
  static deleteById(id) {
    db.execute(`DELETE FROM \`udemy_node\`.\`products\` WHERE \`id\` = '${id}';`).then().catch((err)=>{
      console.log(err);
    })
    // if (!err) {
    //   Cart.deleteProduct(id, product.price);
    // }
  }

  static fetchAll(cb) {
    
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    db.execute(`select * from products where \`id\` = '${id}'; `).then((result)=>{
      cb(result[0][0]);
      // console.log(result[0]);
    }).catch((err)=>{
      console.log(err);
    })
  }
};

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

/*Function to render Class App.*/
const renderApp = () => {
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
};

/*Stores item details.*/
const items = [
  {id: 1, name: "Nokia", price: 300, count:0, img:"https://md3.pricebaba.com/images/product/mobile/372/nokia-asha-202-raw.jpg"},
  {id: 2, name: "Samsung", price: 200, count:0, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY6q6UnhP5jvBVeM0n16kXAYEXKMDSl5NWfCy56EHdxgSe-8WnJQ"},
  {id:3, name: "Blackberry", price: 400, count:0, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZha640fo1MfhQDeTHA8ZV--OEDqoECVh9TD9TPWsC_RLH1ikVQ"},
  {id:4, name: "Iphone", price: 500, count:0, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5JUWOiTWcm6vM4j0A1VpOzlT4QksF_3YOU-Up0ynUtiX8PZmilQ"}
];

const pages = {
  itemPage: "item_page",
  cartPage: "cart_page"
};

let currentPage = pages.itemPage;

var totalPrice = 0;
var totalCount = 0;

/*Class to select which page is to loaded.*/
const App = () => (
  <div className="App">
    <div id="cartImg">
      <img src="https://cdn.iconscout.com/public/images/icon/premium/png-512/cart-e-commerce-shopping-shop-checkout-317419239403726d-512x512.png"
       id="cartImage" onClick={goToCart}/>
      </div>
      <span className="countClass">{totalCount}</span>
    {currentPage === pages.itemPage ? <ItemList /> : <CartList />}
  </div>
);

/*Funtion to load products.*/
const ItemList = () => (
  <React.Fragment>
    <h2>Products List</h2>
    <ul className="itemUl">
      {items.map(p => <Item key={p.id} {...p} />)}
    </ul>
  </React.Fragment>
);

/*Function to put values in product page.*/
const Item = ({id,name,price,img}) =>(
  <li className="itemList">
    <div className="itemImage"><img src={ img } alt={name} className="imageClass"/></div>
    <div className="itemName">{name}</div>
    <div className="itemPrice">${price}</div>
    <Button msg="Add To Cart" onClick={handleClick.bind(null,id)}/>
  </li>
);

/*Function to make a button.*/
const Button =  ({msg,onClick}) => (
  <button className="buttonClass" onClick={onClick}>
  {msg}
  </button>
);

/**Function add items to the cart. */
const handleClick = pid => {
  // console.log("Button clicked!", id);
  const [item] = items.filter(({ id }) => pid === id);
  totalCount++;
  totalPrice = totalPrice + item.price;
  items[pid-1].count++;
  // document.getElementById("displayCount").innerHTML = totalCount;
  console.log(items[pid-1].count); 
  renderApp();
}

/**Function to change the page into cart listing page. */
const goToCart = () => {
  currentPage = pages.CART_LIST;
  renderApp();
};

/**Function to show cart list page. */
const CartList = () => (
  <React.Fragment>
    <h2>Cart List</h2>
      <ul>
        <li className="liCart">
          <div className="prdtClass">Product</div>
          <div className="rateClass">Price</div>
          <div className="qtyClass">Quantity</div>
        </li>
      {items.map(p => <CartView {...p}/>)}
      </ul>
      <div className="urclass"></div>
      <div>Total Price: {"$" + totalPrice}</div>
  </React.Fragment>
);

/**Function to put values in cart listing page. */
const CartView = ({id,name,price,count}) => 
  count>0?(
  <li className="liCart">
  <div className="prdtClass">{name}</div>
  <div className="rateClass">{"$" + price*count}</div>
  <div className="qtyClass">{count}</div>
  </li>):null

export default App;

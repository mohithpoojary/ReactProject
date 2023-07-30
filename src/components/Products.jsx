import React, { useState ,useEffect} from "react";
import styles from "./ProductRecommender.module.css"
import axios from "axios";
const Products=()=>{
  let [productsdata,setproductsData]=useState({})

  useEffect(()=>{
    axios.get("http://localhost:3000/products")
    .then((x)=>{
      setproductsData(x.data[0])
      console.log(productsdata);
    })
    .catch(()=>{
      console.log('error')
    })
  },[])
    return(
        <div className={styles.productList}>
          <h1>All Products</h1>
      {Object.keys(productsdata).map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <div>
            {productsdata[category].map((product, index) => (
              <div key={index} className={styles.product}>
                <h4>{product.name}</h4> 
                <p > Rs.{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    )
}
export default React.memo(Products)
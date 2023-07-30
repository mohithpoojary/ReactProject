
import React, { useEffect, useState } from 'react';
import styles from './ProductRecommender.module.css';
import Products from './Products';
import axios from 'axios';

const ProductRecommender = () => {
  let [productsData,setproductsData]=useState({})
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(productsData)[0]);
  const [budget, setBudget] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  let [filteredProducts,setfilteredProducts]=useState([])
  const [resultTag,setResultTag]=useState("")
  
  useEffect(()=>{
    axios.get("http://localhost:3000/products")
    .then((x)=>{
      setproductsData(x.data[0])
      console.log(productsData);
    })
    .catch(()=>{
      console.log('error')
    })
  },[])

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(parseInt(event.target.value, 10));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {

    let  filteredData=productsData[selectedCategory].filter(
      (product) => product.price <= budget && product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if( filteredData.length!=0){
    setfilteredProducts(filteredData.sort((a,b)=>a.price-b.price))
    }
    else{
      //uploading 
      setResultTag("No products match your criteria in this category")
      if(searchQuery!='' && budget!=""){
        console.log(filteredProducts.length);
        const unsuccessfulSearch = {
          name: searchQuery.charAt(0).toUpperCase()+searchQuery.slice(1),
          price: budget,
          category: selectedCategory
        };
        console.log(unsuccessfulSearch);
        axios.post(`http://localhost:3000/unsuccessfulProducts`, unsuccessfulSearch)
        .then(()=>{console.log("data added since no result found ");})
        .catch(()=>{console.log("error adding unsuccessful datas");})
      }
   
    }
  };


  return (
    <div className={styles.container}>
    <div className={styles.filters}>
       <div id={styles.catagory}>
       <label >
        Choose Category:
        </label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {Object.keys(productsData).map((category) => (
            <option key={category} >
              {category}
            </option>
          ))}
        </select>
       </div>

        <input type="number" value={budget} onChange={handleBudgetChange} placeholder='  Enter Budget (Rs.)'/>
     

      <label>
        
        <input type="search" value={searchQuery} onChange={handleSearchChange} placeholder='Search Product' />
      </label>

      <button onClick={handleSearch}><svg width="20" height="20" viewBox="0 0 17 18" class="" xmlns="http://www.w3.org/2000/svg"><g fill="#2874F1" fill-rule="evenodd"><path class="_34RNph" d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"></path><path class="_34RNph" d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"></path></g></svg></button>
    </div>


    <div className={styles.productList}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.name} className={styles.product}>
            <h2>{product.name}</h2>
            <p>Price: Rs.{product.price}</p>
          </div>
        ))
      ) : (
        <p>{resultTag}</p>
      )}
    </div>
  </div>

)
};
    

export default ProductRecommender;

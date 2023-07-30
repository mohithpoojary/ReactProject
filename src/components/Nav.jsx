import { useRef } from "react";
import styles from "./ProductRecommender.module.css"
import { useNavigate } from 'react-router-dom';

const Nav=()=>{
    let color =document.getElementsByClassName("color")
    let navigator=useNavigate()
    const home=(event)=>{
      navigator("productrecommnder")
      console.log(event);
      for (let i = 0; i < color.length; i++) {
        color[i].style.backgroundColor = 'black';
      }
      event.target.style.backgroundColor ="rgb(255, 202, 3)"
    }
    const products=(event)=>{
        navigator("products")
        for (let i = 0; i < color.length; i++) {
            color[i].style.backgroundColor = 'black';
          }
          event.target.style.backgroundColor ="rgb(255, 202, 3)"
    }

    const unsearch=(event)=>{
      navigator("/unsuccprod")
      for (let i = 0; i < color.length; i++) {
        color[i].style.backgroundColor = 'black';
      }
      event.target.style.backgroundColor ="rgb(255, 202, 3)"
    }
    
    return(
        <div >
            <nav id={styles.nav}>  <h2>Program on Product recommendation</h2></nav>
            <div id={styles.menu}>
            <span onClick={home} className="color">Search Products</span>
            <span onClick={products} className="color">Products</span>
            <span onClick={unsearch} className="color">Unsuccessfull Searches</span>
            </div>
        </div>
    )

}
export default Nav
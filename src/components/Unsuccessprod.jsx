import axios from "axios"
import {  Fragment, useEffect, useState } from "react"
import styles from "./ProductRecommender.module.css"

const Unsuccessprod=()=>{
    let [content,setcontent]=useState([])
    useEffect(()=>{
    axios.get("http://localhost:3000/unsuccessfulProducts")
    .then((x)=>{
        setcontent(x.data)
        console.log("data added");
    })
    .catch(()=>{
        console.log("error");
    })
    },[])
    let arr=[]

    return(
        <div className={styles.productList}>
            <h1>Unsuccessfull Products</h1>
            {content.map((x)=>{
                if(arr.includes(x.category)==false){
                    arr.push(x.category)
                  return(
                    <div key={x.id} >
                        <h2>{x.category}</h2>
                        {content.map((y)=>{
                           if(y.category==x.category){
                            return(
                                <div className={styles.product} key={y.id}>
                                    <h4>{y.name}</h4>
                                    <p>Rs.{y.price}</p>
                                </div>
                            )
                           }
                        })}
                    </div>
                  )
                }
            })}

        </div>
    )
}
export default Unsuccessprod
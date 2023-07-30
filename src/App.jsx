import ProductRecommender from "./components/ProductRecommender"
import Nav from "./components/Nav"
import { Route,BrowserRouter,Routes } from "react-router-dom"
import Unsuccessprod from "./components/Unsuccessprod"
import Products from "./components/Products"

const App=()=>{
    return(
        <div>
            <BrowserRouter>
            <Nav/>
            <Routes>
                <Route element={<Unsuccessprod/>} path="unsuccprod" ></Route>
                <Route element={<Products/>} path="products" />
                <Route element={<ProductRecommender/>} path="productrecommnder" ></Route>
            </Routes>  
            </BrowserRouter>

        </div>
    )
}
export default App
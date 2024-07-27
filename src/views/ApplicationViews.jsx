import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login.jsx"
import { Register } from "../components/auth/Register.jsx"
import { Authorized } from "./Authorized.jsx"
import { Home } from "../components/pages/Home.jsx"
import { MyRecipes } from "../components/pages/MyRecipes.jsx"
import { RecipeForm } from "../components/pages/AddRecipe.jsx"
import { RecipeDetails } from "../components/pages/RecipeDetails.jsx"

export const ApplicationViews = ({ token, setToken }) => {
  
  return (

    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
      <Route path="/" element={<Home />} />
      <Route path="/myrecipes" element={<MyRecipes />} />
      <Route path="/addrecipe" element={<RecipeForm />} />
      <Route path="/myrecipes/:id" element={<RecipeDetails />} />
      
        
        
      </Route>
    </Routes>
  
)
}

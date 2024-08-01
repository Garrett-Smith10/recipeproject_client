import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login.jsx"
import { Register } from "../components/auth/Register.jsx"
import { Authorized } from "./Authorized.jsx"
import { Home } from "../components/pages/Home.jsx"
import { MyRecipes } from "../components/pages/MyRecipes.jsx"
import { RecipeForm } from "../components/pages/AddRecipe.jsx"
import { RecipeDetails } from "../components/pages/RecipeDetails.jsx"
import { EditRecipe } from "../components/pages/EditRecipe.jsx"
import { GroceryList } from "../components/pages/GroceryLists.jsx"
import { CreateGroceryList } from "../components/pages/CreateGroceryList.jsx"
import { GroceryListDetails } from "../components/pages/GroceryListDetails.jsx"
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
      <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      <Route path="/grocerylist" element={<GroceryList />} />
      <Route path="/recipelist" element={<CreateGroceryList />} />
      <Route path="/viewgrocerylist/:id" element={<GroceryListDetails />} />
      
      
        
        
      </Route>
    </Routes>
  
)
}

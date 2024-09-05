import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login.jsx"
import { Register } from "../components/auth/Register.jsx"
import { Authorized } from "./Authorized.jsx"
import { Home } from "../components/home/Home.jsx"
import { MyRecipes } from "../components/recipes/MyRecipes.jsx"
import { RecipeForm } from "../components/recipes/AddRecipe.jsx"
import { RecipeDetails } from "../components/recipes/RecipeDetails.jsx"
import { EditRecipe } from "../components/recipes/EditRecipe.jsx"
import { GroceryList } from "../components/grocerylists/GroceryLists.jsx"
import { CreateGroceryList } from "../components/grocerylists/CreateGroceryList.jsx"
import { GroceryListDetails } from "../components/grocerylists/GroceryListDetails.jsx"
import { Profile } from "../components/profile/Profile.jsx"
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
      <Route path="/profile" element={<Profile />} />
      
      
        
        
      </Route>
    </Routes>
  
)
}

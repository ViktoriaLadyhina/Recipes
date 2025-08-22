import './App.scss'
import Home from './page/Home'
import Categories from './page/Categories/Categories'
import { Routes, Route } from 'react-router'
import Layout from "./components/Layout"
import Recipe from './page/recipe/Recipe'
import Category from './page/category/Category'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="categories" element={<Categories />} />
          <Route path="/categories/:categoryId" element={<Category />} />

          <Route path="*" element={<h1>Такой страницы не существует</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getCategories } from '../../store/features/CategoriesSlice';
import './categories.scss'
import { NavLink } from 'react-router'
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';

const Categories = () => {
  const dispatch = useDispatch()

  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const history = [
  { label: "All recipes", path: "/" },
  { label: "Categories" }
];

  return (
    <>
      <div className="container">
        <div className='categories'>
          <BreadCrumbs history={history}/>
          <div className='categories__title'>Categories</div>
          <div className='categories__list'>
            {categories && categories.map((cat, id) => (
              
                <NavLink to={`/categories/${cat}`} key={id}>
                <div className='categories__list-card'>
                <div className='categories__list-card--title'>{cat}</div>
                </div>
                </NavLink>
          
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories
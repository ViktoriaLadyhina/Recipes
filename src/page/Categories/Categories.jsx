import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import categoriesSlice, { getCategories } from '../../store/features/CategoriesSlice'
import './categories.scss'

const Categories = () => {
  const dispatch = useDispatch()
  const categories = useSelector(categoriesSlice.selectors.getAllCategories)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <>
      <div className="container">
        <div className='categories'>
          <div className='categories__title'>Categories</div>
          <div className='categories__list'>
            {categories && categories.map((cat, id) => (
              <div className='categories__list-card' key={id}>
                <div className='categories__list-card--title'>{cat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories
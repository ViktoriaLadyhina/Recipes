import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getCategories } from '../../store/features/CategoriesSlice';
import './categories.scss'
import BreadCrumbs from '../../components/breadCrumbs/BreadCrumbs';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import Pagination from '../../components/pagination/Pagination';

const Categories = () => {
  const dispatch = useDispatch()
  const [sortOrder, setSortOrder] = useState('asc');
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  // сортировка
const sortedCategories = [...categories];
if (sortOrder === 'asc') {
  sortedCategories.sort((a, b) => a.localeCompare(b));
} else if (sortOrder === 'desc') {
  sortedCategories.sort((a, b) => b.localeCompare(a));
}

  // пагинация 
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 15;

  const lastCategoryIndex = currentPage * categoriesPerPage;
  const firstCategoryIndex = lastCategoryIndex - categoriesPerPage;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

    useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  const currentCategories = sortedCategories.slice(firstCategoryIndex, lastCategoryIndex);

  // хлебные крошки
  const history = [
    { label: "All recipes", path: "/" },
    { label: "Categories" }
  ];

  return (
    <>
      <div className="container">
        <div className='categories'>
          <BreadCrumbs history={history} />
          <div className='categories__title'>Categories</div>

          <div className="categories__sort">
            <label>
              Sort by name:
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="default">Default</option>
                <option value="asc">By name A → Z</option>
                <option value="desc">By name Z → A</option>
              </select>
            </label>
          </div>

          <div className="categories__list">
            {currentCategories && currentCategories.map((cat, id) => (
              <CategoryCard key={id} category={cat} />
            ))}
          </div>

          {categories.length > categoriesPerPage && (
            <Pagination
              totalItems={categories.length}
              itemsPerPage={categoriesPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

        </div>
      </div>
    </>
  )
}

export default Categories
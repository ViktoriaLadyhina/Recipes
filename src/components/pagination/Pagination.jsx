import './pagination.scss'

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {

    const pages = Math.ceil(totalItems / itemsPerPage);


  return (
    <div className='pagination'>
        {Array.from({ length: pages }, (_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination
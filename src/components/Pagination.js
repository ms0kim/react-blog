import propTypes from "prop-types";

const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {

  //현재 페이지 세트 계산
  const currentSet = Math.ceil(currentPage/limit);
  //마지막 페이지 세트 계산
  const lastSet = Math.ceil(numberOfPages/limit);
  //현재 페이지 세트의 시작하는 숫자 계산
  const startPage = limit * (currentSet - 1) + 1;
  //마지막 세트일 때 나머지 보여주기
  const numberOfPageForSet = currentSet === lastSet ? numberOfPages%limit : limit


  return (
    <div className="pagination">
      <ul>

        {currentSet !== 1 && <li>
          <div className="pageNum" onClick={() => onClick(startPage - limit)}>Previous</div>
        </li>}

        {Array(numberOfPageForSet).fill(startPage).map((value, index) => value + index)
        .map((pageNumber) => {
          return <li 
            key={pageNumber}
            className={`page ${currentPage === pageNumber ? 'pageActive' : ''}`}
          >
            <div
              className="pageNum"
              onClick={() => {
                onClick(pageNumber);
              }}
            >
              {pageNumber}
            </div>
          </li>
        })}

        {currentSet !== lastSet && <li>
          <div className="pageNum" onClick={() => onClick(startPage + limit)}>Next</div>
        </li>}
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number,
  numberOfPages: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
  limit: propTypes.number
}

//기본값
Pagination.defaultProps = {
  currentPage: 1,
  limit: 5
}

export default Pagination;
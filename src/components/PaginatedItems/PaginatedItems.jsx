import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import css from "./PaginatedItems.module.css";

export const PaginatedItems = ({
  items,
  totalPage,
  currentPage,
  fetchAction,
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(currentPage - 1);
  const [pageRange, setPageRange] = useState(3);
  useEffect(() => {

    
    if (currentPage !== page + 1) {
      dispatch(fetchAction(page + 1));
    }
  }, [page, dispatch, fetchAction, currentPage]);

  const handlePageClick = ({ selected }) => {    
    setPage(selected) ;
  };

  const pageCount = totalPage || 1;

    useEffect(() => {
      const updatePageRange = () => {
        setPageRange(window.innerWidth < 768 ? 2 : 3);
      };

      updatePageRange(); 
      window.addEventListener("resize", updatePageRange);

      return () => window.removeEventListener("resize", updatePageRange);
    }, []);

  return (
    <div className={css.paginationBlock}>
      <button onClick={() => setPage(0)} className={css.pageButton}>
        &lt;&lt;
      </button>
      <ReactPaginate
        className={css.pagination}
        pageClassName={css.pageClassName}
        activeClassName={css.activeClassName}
        previousClassName={css.previousClassName}
        nextClassName={css.nextClassName}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRange}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={page}
      />
      <button onClick={() => setPage(pageCount - 1)} className={css.pageButton}>
        &gt;&gt;
      </button>
    </div>
  );
};

import React from 'react';
import { Pagination as MUIPagination } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <MUIPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      shape="rounded"
    />
  );
};

export default Pagination;

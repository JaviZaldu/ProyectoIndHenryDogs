import React from 'react';
import styles from './paginado.module.css';

function Paginado({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginado}>
       <button
        className={styles.changePag}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // Deshabilita el botón si estamos en la primera página
      >
        <strong>&lt;</strong>
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles.button} ${pageNumber === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={styles.changePag}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Deshabilita el botón si estamos en la última página
      >
        <strong>&gt;</strong>
      </button>

    </div>
  );
}

export default Paginado;
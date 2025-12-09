
import styles from './Pagination.module.scss'

interface IPaginationProps {
    itemsPerPage: number
    totalItems: number | undefined
    currentPage: number | undefined
    paginate: (number: number) => void
}

export const Pagination: React.FC<IPaginationProps> = ({ itemsPerPage, totalItems, currentPage, paginate }): React.ReactNode => {
  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(totalItems! / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={styles.pagination}>
        <ul>
            {pageNumbers?.map(number => (
                <li key={number} onClick={() => paginate(number)}>
                    <span className={`${styles.dot} ${currentPage === number ? styles.active : ''}`}></span>
                </li>
            ))}
        </ul>
    </nav>
  )
}

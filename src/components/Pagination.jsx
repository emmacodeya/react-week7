function Pagination({ pageInfo, handlePageChange }) {
    return (
        <div className="d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                    
                    <li className={`page-item ${!pageInfo.has_pre ? 'disabled' : ''}`}>
                        <button 
                            onClick={() => handlePageChange(pageInfo.current_page - 1)} 
                            className="page-link" 
                            disabled={!pageInfo.has_pre}
                        >
                            上一頁
                        </button>
                    </li>

                    
                    {Array.from({ length: pageInfo.total_pages || 1 }).map((_, index) => (
                        <li key={index} className={`page-item ${pageInfo.current_page === index + 1 ? 'active' : ''}`}>
                            <button 
                                onClick={() => handlePageChange(index + 1)} 
                                className="page-link"
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                   
                    <li className={`page-item ${!pageInfo.has_next ? 'disabled' : ''}`}>
                        <button 
                            onClick={() => handlePageChange(pageInfo.current_page + 1)} 
                            className="page-link" 
                            disabled={!pageInfo.has_next}
                        >
                            下一頁
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;

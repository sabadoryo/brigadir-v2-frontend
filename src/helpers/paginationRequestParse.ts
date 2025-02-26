function paginationRequestParse(pagination: {
  pageSize: number
  currentPage: number
  totalPages: number
}) {
  return {
    limit: pagination.pageSize,
    page: pagination.currentPage,
  }
}

export default paginationRequestParse

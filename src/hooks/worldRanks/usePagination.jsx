import { useMemo } from "react";
const DOTS = ".";
function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    //Number of pages to display
    const totalPageNumbers = siblingCount + 5;

    //Case 1:
    //Number of pages is less then the number of pages we want to display
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    //Case 2:
    //No left dots to show, but show right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    //Case 3:
    //No right dots to show, but show left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    //Case 4:
    //Both left and right dots to be shown

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    function range(start, end) {
      let length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);
  return paginationRange;
}

export default usePagination;

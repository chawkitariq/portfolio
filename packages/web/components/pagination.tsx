import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

function usePagination({
  currentPage,
  totalPages,
  maxVisible = 5,
}: Omit<PaginationProps, "onPageChange">) {
  const getPageNumbers = () => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(currentPage - halfVisible, 1);
    const end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start + 1 < maxVisible) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return {
    pages: getPageNumbers(),
    canGoFirst: currentPage > 1,
    canGoPrevious: currentPage > 1,
    canGoNext: currentPage < totalPages,
    canGoLast: currentPage < totalPages,
  };
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}: PaginationProps) {
  const { pages, canGoFirst, canGoPrevious, canGoNext, canGoLast } =
    usePagination({ currentPage, totalPages, maxVisible });

  if (totalPages <= 1) return null;

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            aria-label="Go to first page"
            onClick={() => onPageChange(1)}
            size="icon"
            disabled={!canGoFirst}
            className={!canGoFirst ? "pointer-events-none opacity-50" : ""}
          >
            <ChevronFirst className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            aria-label="Go to previous page"
            onClick={() => onPageChange(currentPage - 1)}
            size="icon"
            disabled={!canGoPrevious}
            className={!canGoPrevious ? "pointer-events-none opacity-50" : ""}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            aria-label="Go to next page"
            onClick={() => onPageChange(currentPage + 1)}
            size="icon"
            disabled={!canGoNext}
            className={!canGoNext ? "pointer-events-none opacity-50" : ""}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            aria-label="Go to last page"
            onClick={() => onPageChange(totalPages)}
            size="icon"
            disabled={!canGoLast}
            className={!canGoLast ? "pointer-events-none opacity-50" : ""}
          >
            <ChevronLast className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}


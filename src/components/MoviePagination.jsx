import { Button } from "@/components/ui/button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button
        variant="outline"
        className="cursor-pointer"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </Button>

      <span className="text-sm">
        Page {currentPage} / {totalPages}
      </span>

      <Button
        className="cursor-pointer"
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

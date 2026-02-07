"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationFeedbackProps {
  page: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  pageSizeOptions?: number[];
}

export default function PaginationFeedback({
  page,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
  pageSizeOptions = [10, 20, 50, 100],
}: PaginationFeedbackProps) {
  const startItem = Math.min((page - 1) * rowsPerPage + 1, totalItems);
  const endItem = Math.min(page * rowsPerPage, totalItems);

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap">Rows per page:</Label>
        <Select
          value={rowsPerPage.toString()}
          onValueChange={(value) => {
            onRowsPerPageChange(Number(value));
            onPageChange(1);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <span className="whitespace-nowrap text-muted-foreground text-sm">
        {startItem}-{endItem} of {totalItems}
      </span>
    </div>
  );
}

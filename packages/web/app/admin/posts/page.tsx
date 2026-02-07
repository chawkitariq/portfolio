"use client";

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "../../../components/data-table";
import { Post } from "@portfolio/api";
import Pagination from "@/components/pagination";
import PaginationFeedback from "@/components/pagination-feedback";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

function getData(): Post[] {
  return [
    {
      id: 1,
      title: "First Post",
      summary: "This is the summary of the first post.",
      content: "This is the content of the first post.",
      createdAt: new Date("2023-01-01").toISOString(),
      updatedAt: new Date("2023-01-15").toISOString(),
    },
    {
      id: 2,
      title: "Second Post",
      summary: "This is the summary of the second post.",
      content: "This is the content of the second post.",
      createdAt: new Date("2023-02-01").toISOString(),
      updatedAt: new Date("2023-02-15").toISOString(),
    },
    {
      id: 3,
      title: "Third Post",
      summary: "This is the summary of the third post.",
      content: "This is the content of the third post.",
      createdAt: new Date("2023-03-01").toISOString(),
      updatedAt: new Date("2023-03-15").toISOString(),
    },
  ];
}

export default function DemoPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable<Post>({
    data: getData(),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="container mx-auto grid gap-4">
      <Button className="ml-auto" asChild>
        <Link href="/admin/posts/new">New Post</Link>
      </Button>
      <DataTable table={table} />
      <div className="flex justify-between items-center">
        <PaginationFeedback
          page={table.getState().pagination.pageIndex + 1}
          rowsPerPage={table.getState().pagination.pageSize}
          totalItems={table.getCoreRowModel().rows.length}
          onPageChange={table.setPageIndex}
          onRowsPerPageChange={table.setPageSize}
          pageSizeOptions={[10, 25, 50, 100]}
        />
        <div className="flex-1">
          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={table.setPageIndex}
            maxVisible={5}
          />
        </div>
      </div>
    </div>
  );
}

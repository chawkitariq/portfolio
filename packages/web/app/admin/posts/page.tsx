"use client";

import {
  ColumnDef,
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
import { useQuery } from "@tanstack/react-query";
import { findAllPost } from "@/api/post";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => (
      <div className="font-mono text-sm text-muted-foreground">
        {getValue<string>()}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ getValue }) => (
      <div className="font-medium">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "summary",
    header: "Summary",
    cell: ({ getValue }) => (
      <div className="font-medium">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => (
      <div className="font-mono text-sm text-muted-foreground">
        {Intl.DateTimeFormat("fr-FR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(+getValue<string>()))}
      </div>
    ),
  },
  {
    header: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/admin/posts/${row.getValue<string>("id")}`}>
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/posts/${row.getValue<string>("id")}/edit`}>
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function DemoPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const findAllPostQuery = useQuery({
    queryKey: ["posts"],
    queryFn: findAllPost,
  });

  const table = useReactTable<Post>({
    data: findAllPostQuery.data?.data.data.post || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="container mx-auto grid gap-4 p-4">
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

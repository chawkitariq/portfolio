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
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findAllPost, removePost } from "@/api/post";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useBreadcrumbStore } from "@/stores/breadcrumb";

export default function DemoPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs);

  useEffect(() => {
    setBreadcrumbs([{ label: "Home", href: "/admin" }, { label: "Posts" }]);
  }, [setBreadcrumbs]);

  const findAllPostQuery = useQuery({
    queryKey: ["posts"],
    queryFn: findAllPost,
  });

  const posts = useMemo(
    () => findAllPostQuery.data?.data.data.post || [],
    [findAllPostQuery.data],
  );

  const queryClient = useQueryClient();

  const removePostMutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: removePost,
    onSuccess: () => {
      toast.success("Post removed successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to remove post. Please try again.");
    },
  });

  const columns: ColumnDef<Post>[] = useMemo(
    () => [
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
        accessorKey: "thumbnailUrl",
        header: "Thumbnail",
        cell: ({ getValue }) => (
          <img
            src={getValue<string>()}
            alt="Thumbnail"
            className="h-24 w-24 rounded object-cover"
          />
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
              <DropdownMenuItem
                className="text-red-500"
                onClick={() =>
                  removePostMutation.mutate(+row.getValue<string>("id"))
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );

  const table = useReactTable<Post>({
    data: posts,
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

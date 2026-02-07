"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

function getData(): Payment[] {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default function DemoPage() {
  const data = getData();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable table={table} />
    </div>
  );
}

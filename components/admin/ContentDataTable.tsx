"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";

// Simple ColumnDef type
export type SimpleColumnDef<TData> = {
  accessorKey: keyof TData | string;
  header: string;
  cell?: (row: TData) => React.ReactNode; // Optional custom cell renderer
};

// Define a generic type for data table props
interface DataTableProps<TData extends { id: string | number }> {
  columns: SimpleColumnDef<TData>[];
  data: TData[];
  onAdd?: () => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  title: string;
  addLabel?: string;
}

export function ContentDataTable<TData extends { id: string | number }>( // Make it generic
  { columns, data, onAdd, onEdit, onDelete, title, addLabel = "Tambah Data" }: DataTableProps<TData>
) {
  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <Typography as='h2' variant='h3'>{title}</Typography>
        {onAdd && <Button onClick={onAdd}>{addLabel}</Button>}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className="px-5 py-3 border-b-2 border-border bg-secondary text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {column.header}
                </TableHead>
              ))}
              {(onEdit || onDelete) && (
                <TableHead className="px-5 py-3 border-b-2 border-border bg-secondary text-right"></TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className="px-5 py-5 border-b border-border bg-card text-sm">
                      {/* Render cell content based on accessorKey or custom cell renderer */}
                      {column.cell ? column.cell(item) : String(item[column.accessorKey as keyof TData])}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <TableCell className="px-5 py-5 border-b border-border bg-card text-right text-sm">
                      {onEdit && <Button variant="outline" size="sm" onClick={() => onEdit(item.id)} className="mr-2">Edit</Button>}
                      {onDelete && <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>Hapus</Button>}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="h-24 text-center text-muted-foreground">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
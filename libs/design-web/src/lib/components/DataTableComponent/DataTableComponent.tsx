/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// DataTableComponent.tsx
import React, { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

type DataTableProps = {
  data: any[];
  columns: any[];
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  sortStatus: DataTableSortStatus;
  setSortStatus: (status: DataTableSortStatus) => void;
  search: string;
  setSearch: (search: string) => void;
};

const DataTableComponent: React.FC<DataTableProps> = ({
  data,
  columns,
  page,
  setPage,
  pageSize,
  setPageSize,
  sortStatus,
  setSortStatus,
  search,
  setSearch,
}) => {
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [initialRecords, setInitialRecords] = useState(
    sortBy(data, 'firstName')
  );
  const [recordsData, setRecordsData] = useState(initialRecords);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return data.filter(item => {
        return (
          item.firstName.toLowerCase().includes(search.toLowerCase()) ||
          item.company.toLowerCase().includes(search.toLowerCase()) ||
          item.dob.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.phone.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);

  useEffect(() => {
    const sortedData = sortBy(initialRecords, sortStatus.columnAccessor);
    setInitialRecords(
      sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData
    );
    setPage(1);
  }, [sortStatus]);

  return (
    <div className="datatables">
      <DataTable
        className="table-hover whitespace-nowrap"
        records={recordsData}
        columns={columns}
        totalRecords={initialRecords.length}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={p => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        minHeight={200}
        paginationText={({ from, to, totalRecords }) =>
          `Showing  ${from} to ${to} of ${totalRecords} entries`
        }
      />
    </div>
  );
};

export default DataTableComponent;

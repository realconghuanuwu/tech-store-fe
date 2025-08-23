import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import type {
  ColDef,
  ValueGetterParams,
  RowClickedEvent,
  ValueFormatterParams,
  ColDefField,
} from "ag-grid-community";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Input, Button, Dropdown, message, Checkbox, Tooltip } from "antd";
import type { DropdownProps, MenuProps } from "antd";
import { AG_GRID_LOCALE_VN } from "@ag-grid-community/locale";
import csvIcon from "@/assets/icons/csv-icon.svg";
import excelIcon from "@/assets/icons/excel-icon.svg";
import {
  Download,
  Search,
  Table,
  Eye,
  EyeOff,
  Plus,
  Pencil,
  Trash,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  PackageX,
} from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface TableProps<T> {
  stt?: string;
  tableName?: string;
  rowData: T[] | undefined;
  columnDefs: ColDef<T>[];
  className?: string;
  anotherButton?: React.ReactNode;
  hiddenColumns?: string[];
  loading?: boolean;
  hidePagination?: boolean;
  hideSTT?: boolean;
  filterState?: Record<string, unknown>;
  onRowClicked?: (event: RowClickedEvent<T>) => void;
  onAdd?: () => void;
  addButtonText?: string;
  onEdit?: (params: { data: T }) => void;
  onDelete?: (params: { data: T }) => void;
  onView?: (params: { data: T }) => void;
  anotherAction?: (params: { data: T }) => React.ReactNode;
  onEditTooltipName?: string;
  onDeleteTooltipName?: string;
  onViewTooltipName?: string;
}

const myTheme = themeQuartz.withParams({
  backgroundColor: "#FFFFFF",
  fontFamily: ["Arial", "sans-serif"],
  headerBackgroundColor: "#F4F4F5",
  headerFontSize: 15,
  headerTextColor: "#292929",
  borderColor: "#E5E7EB",
});

export function TableV3<IRow>({
  stt = "STT",
  tableName,
  rowData,
  columnDefs,
  className,
  anotherButton,
  hiddenColumns = [],
  loading = false,
  hidePagination = false,
  hideSTT = false,
  onRowClicked,
  filterState,
  onAdd,
  addButtonText = "Thêm mới",
  onEdit,
  onDelete,
  onView,
  anotherAction,
  onEditTooltipName = "Chỉnh sửa",
  onDeleteTooltipName = "Xóa",
  onViewTooltipName = "Xem",
}: TableProps<IRow>) {
  const gridRef = useRef<AgGridReact<IRow> | null>(null);

  const [data, setData] = useState<IRow[]>(rowData ?? []);

  const isMoreThan3Action = useMemo(() => {
    return onEdit && onDelete && onView && anotherAction;
  }, [onEdit, onDelete, onView, anotherAction]);

  useEffect(() => {
    setData(rowData ?? []);
  }, [rowData]);

  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    {
      headerName: stt,
      valueGetter: (params: ValueGetterParams<IRow>) =>
        params.node ? (params?.node?.rowIndex ?? 0) + 1 : 0,
      width: 100,
      sortable: false,
      filter: false,
      resizable: true,
      maxWidth: 70,
      hide: hideSTT,
    },
    ...columnDefs.map((col) => ({
      ...col,
      hide: hiddenColumns.includes(col.field ?? ""),
    })),
    {
      headerName: "Thao tác",
      field: "ag-grid-action-columns-lmfao" as unknown as ColDefField<IRow>,
      filter: false,
      sortable: false,
      width: isMoreThan3Action ? 300 : 150,
      hide: !onEdit && !onDelete && !onView && !anotherAction,
      pinned: "right",
      cellRenderer: (params: { data: IRow }) => (
        <>
          <div className="flex mt-2 justify-center gap-4 !text-[#202020]">
            {onEdit && (
              <Tooltip title={onEditTooltipName}>
                <Pencil onClick={() => onEdit(params)} />
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title={onDeleteTooltipName}>
                <Trash onClick={() => onDelete(params)} />
              </Tooltip>
            )}
            {onView && (
              <Tooltip title={onViewTooltipName}>
                <Eye onClick={() => onView(params)} />
              </Tooltip>
            )}
            {anotherAction && anotherAction(params)}
          </div>
        </>
      ),
    },
  ]);

  //Open dropdown column
  const [columnsDropdownOpen, setColumnsDropdownOpen] =
    useState<boolean>(false);

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setColumnsDropdownOpen(nextOpen);
    }
  };

  // Track total columns and hidden columns for UI indication
  const [visibleColumnCount, setVisibleColumnCount] = useState<number>(0);
  const [totalColumnCount, setTotalColumnCount] = useState<number>(0);

  // Update column counts when colDefs changes
  useEffect(() => {
    const total = colDefs.length;
    const visible = colDefs.filter((col) => !col.hide).length;
    setTotalColumnCount(total);
    setVisibleColumnCount(visible);
  }, [colDefs]);

  const onSortChanged = useCallback(() => {
    if (gridRef.current) {
      const updatedData = gridRef.current.api.getDisplayedRowAtIndex(0)?.data;
      if (updatedData) {
        setData((prevData) =>
          prevData.map((item, index) => ({ ...item, stt: index + 1 }))
        );
      }
    }
  }, []);

  const toggleColumnVisibility = useCallback((field: string) => {
    setColDefs((prevColDefs) =>
      prevColDefs.map((col) =>
        col.field === field ? { ...col, hide: !col.hide } : col
      )
    );
  }, []);

  // Add function to show/hide all columns
  const toggleAllColumns = useCallback((showAll: boolean) => {
    setColDefs((prevColDefs) => [
      // Keep STT column state unchanged
      prevColDefs[0],
      // Toggle all other columns
      ...prevColDefs.slice(1).map((col) => ({
        ...col,
        hide: !showAll,
      })),
    ]);
  }, []);

  const handleCSVExport = useCallback(() => {
    if (data.length === 0) {
      message.error("Không có dữ liệu để xuất file");
      return;
    }

    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv({
        fileName: tableName ?? "data",
      });
    }
  }, [data.length, tableName]);

  const handleExcelExport = useCallback(() => {
    if (!gridRef.current) return;

    // Lấy danh sách cột hiển thị, bao gồm cả cột STT
    const visibleColumns = colDefs.filter((col) => !col.hide);

    // Lấy dữ liệu từ ag-Grid
    const rowData: (IRow | undefined)[] = [];
    gridRef.current.api.forEachNode((node) => {
      rowData.push(node.data);
    });

    if (rowData.length === 0) {
      message.error("Không có dữ liệu để xuất file");
      return;
    }

    // Tạo tiêu đề từ headerName của colDefs
    const headers = visibleColumns.map((col) => col.headerName || col.field);

    // Chuyển đổi dữ liệu theo headerName và áp dụng valueFormatter
    const formattedData = rowData.map((row, index) =>
      visibleColumns.map((col) => {
        // Xử lý đặc biệt cho cột STT
        if (col.headerName === stt) {
          return index + 1;
        }
        if (!row || !col.field) return "";

        const value = row[col.field as unknown as keyof IRow];
        // Nếu có valueFormatter, sử dụng nó để format giá trị
        if (col.valueFormatter && typeof col.valueFormatter === "function") {
          try {
            return (
              col.valueFormatter({
                value,
                data: row,
              } as ValueFormatterParams<IRow, unknown>) ||
              value ||
              ""
            );
          } catch {
            return value || "";
          }
        }
        return value || "";
      })
    );

    // Tạo worksheet từ tiêu đề + dữ liệu
    const ws = XLSX.utils.aoa_to_sheet([headers, ...formattedData]);

    // Tạo workbook và thêm worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Xuất file Excel
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(dataBlob, `${tableName || "data"}.xlsx`);
  }, [colDefs, tableName, stt]);

  const onFilterTextBoxChanged = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.setGridOption(
        "quickFilterText",
        (document.getElementById("filter-text-box") as HTMLInputElement)
          ?.value || ""
      );
    }
  }, []);

  // Refactored column visibility menu with show/hide all options
  const columnsItems: MenuProps["items"] = [
    {
      type: "divider",
    },
    // Show/Hide all options
    {
      key: "show-all",
      label: (
        <div className="flex items-center justify-between w-full mb-1">
          <span className="font-medium">Hiển thị tất cả</span>
          <Eye size={16} />
        </div>
      ),
      onClick: () => toggleAllColumns(true),
    },
    {
      key: "hide-all",
      label: (
        <div className="flex items-center justify-between w-full mb-1">
          <span className="font-medium">Ẩn tất cả</span>
          <EyeOff size={16} />
        </div>
      ),
      onClick: () => toggleAllColumns(false),
    },
    {
      type: "divider",
    },
    // Column counter
    {
      key: "column-counter",
      label: (
        <div className="py-1 px-2 text-gray-500 text-xs bg-gray-100 rounded mb-2 text-center">
          Đang hiển thị {visibleColumnCount}/{totalColumnCount} cột
        </div>
      ),
      disabled: true,
    },
    {
      key: "stt-column",
      label: (
        <div className="flex items-center w-full">
          <Checkbox
            checked={!colDefs[0].hide}
            onChange={() => {
              setColDefs((prevColDefs) => [
                { ...prevColDefs[0], hide: !prevColDefs[0].hide },
                ...prevColDefs.slice(1),
              ]);
            }}
            className="mr-3 w-full"
          >
            <span className="font-medium">{stt}</span>
          </Checkbox>
        </div>
      ),
    },
    // Other columns
    ...colDefs
      .slice(1) // Skip STT column which is already handled above
      .filter(
        (col) =>
          col.headerName &&
          col.headerName.length > 0 &&
          col.headerName !== "Nút hành động"
      )
      .map((col, index) => ({
        key: `col-${index}`,
        label: (
          <div className="flex items-center w-full">
            <Checkbox
              checked={!col.hide}
              onChange={() => toggleColumnVisibility(col.field || "")}
              className="mr-3"
            >
              {col.headerName || col.field}
            </Checkbox>
          </div>
        ),
      })),
  ];

  // Export menu items with improved styling
  const exportItems: MenuProps["items"] = [
    {
      key: "excel-export",
      label: (
        <div className="flex items-center gap-x-3 py-1">
          <img src={excelIcon} alt="excel" className="w-5 h-5" />
          <span>Excel (.xlsx)</span>
        </div>
      ),
      onClick: handleExcelExport,
    },
    {
      key: "csv-export",
      label: (
        <div className="flex items-center gap-x-3 py-1">
          <img src={csvIcon} alt="csv" className="w-5 h-5" />
          <span>CSV (.csv)</span>
        </div>
      ),
      onClick: handleCSVExport,
    },
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);
  const [totalRows, setTotalRows] = useState<number>(0);

  // Update pagination states whenever the grid is ready or pagination changes
  const updatePaginationState = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      const api = gridRef.current.api;
      setCurrentPage(api.paginationGetCurrentPage() + 1);
      setTotalPages(api.paginationGetTotalPages());
      setPageSize(api.paginationGetPageSize());
      setTotalRows(data.length);
    }
  }, [data.length]);

  // Handle grid pagination events
  const onPaginationChanged = useCallback(() => {
    updatePaginationState();
  }, [updatePaginationState]);

  // Handle custom page navigation
  const goToPage = useCallback(
    (page: number) => {
      if (gridRef.current && page >= 1 && page <= totalPages) {
        gridRef.current.api.paginationGoToPage(page - 1);
      }
    },
    [totalPages]
  );

  // Define custom pagination component
  const PaginationControls = () => {
    if (hidePagination || totalRows === 0) return null;

    // Tính toán các giá trị hiển thị
    const firstRow = (currentPage - 1) * pageSize + 1;
    const lastRow = Math.min(currentPage * pageSize, totalRows);

    // Create an array of page numbers to display
    const getPageNumbers = () => {
      const range = [];
      const maxVisiblePages = 7; // Total number of page items to show

      if (totalPages <= maxVisiblePages) {
        // Show all pages if total is less than max visible
        for (let i = 1; i <= totalPages; i++) {
          range.push(i);
        }
      } else {
        // Always show first page
        range.push(1);

        // Calculate start and end of the middle section
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        // Adjust to show at least 5 pages in the middle when possible
        if (startPage > 2) range.push(null); // Add ellipsis after first

        // Add the middle range of pages
        for (let i = startPage; i <= endPage; i++) {
          range.push(i);
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) range.push(null);

        // Always show last page
        range.push(totalPages);
      }

      return range;
    };

    return (
      <div className="flex flex-wrap items-center justify-end gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span>
            Từ {firstRow} - {lastRow} của tổng {totalRows}
          </span>
          <Button
            disabled={currentPage <= 1}
            onClick={() => goToPage(1)}
            className="flex items-center border-0 shadow-none"
            icon={<ChevronLeft size={14} className="mr-[-4px]" />}
          />
          <Button
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
            className="flex items-center border-0 shadow-none"
            icon={<ChevronsLeft size={14} />}
          />

          <div className="flex items-center">
            {getPageNumbers().map((page, index) =>
              page === null ? (
                <span key={`ellipsis-${index}`} className="px-1">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${page}`}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    currentPage === page
                      ? "border border-blue-500 text-blue-500"
                      : ""
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <Button
            disabled={currentPage >= totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="flex items-center border-0 shadow-none"
            icon={<ChevronsRight size={14} />}
          />
          <Button
            disabled={currentPage >= totalPages}
            onClick={() => goToPage(totalPages)}
            className="flex items-center border-0 shadow-none"
            icon={<ChevronRight size={14} className="ml-[-4px]" />}
          />
        </div>

        <div className="flex items-center gap-2">
          <Dropdown
            menu={{
              items: [25, 50, 100, 200, 500, 1000].map((size) => ({
                key: size.toString(),
                label: size + " / trang",
                onClick: () => {
                  if (gridRef.current) {
                    gridRef.current.api.paginationGoToPage(0);
                    gridRef.current.api.setGridOption(
                      "paginationPageSize",
                      size
                    );
                    updatePaginationState();
                  }
                },
              })),
            }}
            trigger={["click"]}
          >
            <Button className="flex items-center">
              {pageSize} / trang{" "}
              <ChevronUp size={12} className="ml-1 rotate-180" />
            </Button>
          </Dropdown>
        </div>
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap justify-between gap-2 mb-3">
        <Input
          id="filter-text-box"
          className="w-full sm:max-w-[44%]"
          placeholder="Tìm kiếm..."
          prefix={<Search size={16} className="text-gray-400" />}
          onChange={onFilterTextBoxChanged}
          allowClear
        />

        <div className="flex items-center gap-x-2">
          {/* Button "Cột" */}
          <Tooltip title="Tùy chỉnh hiển thị cột">
            <Dropdown
              menu={{ items: columnsItems }}
              trigger={["click"]}
              open={columnsDropdownOpen}
              onOpenChange={handleOpenChange}
            >
              <Button type="primary" icon={<Table size={12} />}>
                Cột
              </Button>
            </Dropdown>
          </Tooltip>
          {/* End Button "Cột" */}

          {onAdd && (
            <Tooltip title="Thêm">
              <Button type="primary" icon={<Plus size={14} />} onClick={onAdd}>
                {addButtonText}
              </Button>
            </Tooltip>
          )}

          {/* Button "Tải về" */}
          <Tooltip title="Xuất dữ liệu ra file excel hoặc csv">
            <Dropdown
              menu={{ items: exportItems }}
              trigger={["click"]}
              disabled={!data.length}
            >
              <Button
                type="primary"
                icon={<Download size={14} />}
                disabled={!data.length}
              >
                Tải xuống
              </Button>
            </Dropdown>
          </Tooltip>
          {/* End button "Tải về" */}
          {anotherButton}
        </div>
      </div>
      <div style={{ height: "550px" }} className="relative ag-theme-quartz">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-60 z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c-main-color mx-auto mb-2"></div>
              <p className="text-gray-500">Đang tải dữ liệu...</p>
            </div>
          </div>
        )}
        <div
          className="sticky-header-grid"
          style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
            localeText={AG_GRID_LOCALE_VN}
            ref={gridRef}
            rowData={data}
            columnDefs={colDefs}
            defaultColDef={{
              resizable: true,
              flex: 1,
              filter: true,
              minWidth: 100,
              sortable: true,
            }}
            suppressDragLeaveHidesColumns={true}
            suppressScrollOnNewData={true}
            pagination={!hidePagination}
            paginationPageSize={pageSize}
            suppressPaginationPanel={true} // Hide default pagination controls
            onPaginationChanged={onPaginationChanged}
            paginationAutoPageSize={false}
            // loading={loading}
            theme={myTheme}
            onSortChanged={onSortChanged}
            enableCellTextSelection
            headerHeight={48}
            noRowsOverlayComponent={() => (
              <div className="flex justify-center items-center h-full">
                <div className="text-center p-6">
                  <PackageX size={32} className="mx-auto mb-2 text-gray-300" />
                  <span className="text-gray-500 block">Không có dữ liệu</span>
                </div>
              </div>
            )}
            onRowClicked={onRowClicked}
            context={{ filterState }}
            rowHeight={44}
            onGridReady={updatePaginationState}
          />
        </div>
      </div>

      {/* Custom pagination controls */}
      <PaginationControls />
    </div>
  );
}

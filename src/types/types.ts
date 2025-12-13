import type { Component } from "@vue/runtime-core"
import { ComponentPublicInstance } from "@vue/runtime-core";

export interface InstallOptions {
    // Add global installation options here if needed
}

export type OrderBy = {
    name: string,
    direction: string
}

export type Pagination = {
    page: number,
    rowsPerPage: number
}

export type ContextMenItem = {
    label: string,
    items?: ContextMenItem[],
    onClick?: () => void,
    icon?: Component,
}

export type DataTableSearchTypeDefinition = "DATE" | "DATE_MONTH" | "REMOTE" | "LIST" | "DATE_RANGE" | "BOOLEAN" | "COMPONENT"
export type DataTableColumnTypeDefinition = "TEXT" | "NUMBER" | "PERCENTAGE" | "CURRENCY"

export type CellContent = number | string | Component | null

export type OnRequestFinished = (response: any, grid: DataTableComponent) => void
export type OnRequestStarted = (grid: DataTableComponent) => void
export type IsRowChecked = (row: Row) => boolean
export type IsCheckboxDisabled = (row: Row) => boolean
export type IsCheckboxHeaderDisabled = (grid: DataTableComponent) => boolean
export type OnRowEvent = (row: Row, grid: DataTableComponent) => void
export type OnCellEvent = (value: any, column: Column, row: Row, grid: DataTableComponent) => any
export type OnContextMenu = (value: any, column: Column, row: Row, grid: DataTableComponent) => ContextMenItem[]
export type OnBeforeRowMounted = (row: Row, grid: DataTableComponent) => Row
export type OnValueGetter = (value: any, row: Row, grid: DataTableComponent) => CellContent
export type OnHeaderContentGetter = (value: any, grid: DataTableComponent) => CellContent
export type OnBeforeCellMounted = (value: CellContent, column: Column, row: Row, grid: DataTableComponent) => CellContent
export type OnBeforeHeaderCellMounted = (column: Column, grid: DataTableComponent) => CellContent
export type OnBeforeCellStyleMounted = (value: CellContent, column: Column, row: Row, grid: DataTableComponent) => { [key: string]: any }
export type OnBeforeCheckboxAndRadioButtonStyleMounted = (row: Row, grid: DataTableComponent) => { [key: string]: any }
export type OnBeforeColumnStyleMounted = (value: CellContent, row: Row, grid: DataTableComponent) => { [key: string]: any }
export type OnVisibleCheck = () => boolean
export type OnVisibleActionCheck = (row: Row) => boolean

export type SearchConfigListValue = {
    value: any,
    label: string
};

export type Column = {
    _uuid?: string,
    _hasFocus?: boolean,
    name: string,
    type?: DataTableColumnTypeDefinition,
    label: string,
    width?: number | string,
    textAlignment?: 'center' | 'left' | 'right',
    filterName?: string,
    searchType?: DataTableSearchTypeDefinition,
    searchConfig?: () => SearchConfigListValue[] | Promise<SearchConfigListValue[]>,
    searchTypeRenderer?: () => Component,
    headerContentGetter?: OnHeaderContentGetter,
    valueGetter?: OnValueGetter,
    onBeforeColumnStyleMounted?: OnBeforeColumnStyleMounted,
    orderByEnabled?: boolean,
    searchEnabled?: boolean,
    isCreatedDynamically?: boolean,
    isVisible?: OnVisibleCheck,
    summarizerValueGetter?: (value: any, row: Row) => number,
    summarizerValueFormatter?: (value: any) => any,
    metadata?: { [key: string]: any }
}

export type Action = {
    element: (row: Row) => CellContent,
    isVisible?: OnVisibleActionCheck,
}

export type ComputedColumn = () => Column[]
export type UniqueKeyIdentifier = (row: Row) => string

export type SummarizedValue = {
    raw: any,
    formatted: any,
}

export type ArcanaDataTableConfig = {
    url?: string | Function,
    datasource?: (params: any) => any[],
    height?: number,
    rowsPerPage?: number,
    cellMinWidth?: number | string,
    calculateCellWidth?: boolean,
    stickyHeaderEnabled?: boolean,
    textAlignment?: 'center' | 'left' | 'right',
    columns: Column[] | ComputedColumn,
    actions?: Action[],
    actionsWidth?: number | string,
    footerVisible?: boolean,
    footerSummarizerEnabled?: boolean,
    summarizeOnlyChecked?: boolean,
    useFlexbox?: boolean,
    rowFocusEnabled?: boolean,
    cellFocusEnabled?: boolean,
    orderByEnabled?: boolean,
    checkboxEnabled?: boolean,
    isRowsPerPageVisible?: boolean,
    radioButtonSelectionEnabled?: boolean,
    searchEnabled?: boolean,
    overflowEnabled?: boolean,
    showLoadingDuringRequest?: boolean,
    sendRequestOnMounted?: boolean,

    initialFilters?: { [key: string]: any },
    disableFilterWhenPresentOnInitialFilters?: boolean,

    isRowChecked?: IsRowChecked,
    isCheckboxRowDisabled?: IsCheckboxDisabled,
    isCheckboxHeaderDisabled?: IsCheckboxHeaderDisabled,
    onRowChecked?: (row: Row, type: 'checkbox' | 'radio') => void,
    onRowUnchecked?: (row: Row, type: 'checkbox' | 'radio') => void,
    onRequestStarted?: OnRequestStarted,
    onRequestFinished?: OnRequestFinished,
    onBeforeRowMounted?: OnBeforeRowMounted,
    onBeforeCellMounted?: OnBeforeCellMounted,
    onBeforeHeaderCellMounted?: OnBeforeHeaderCellMounted,
    onBeforeCellStyleMounted?: OnBeforeCellStyleMounted,
    onBeforeCheckboxAndRadioButtonStyleMounted?: OnBeforeCheckboxAndRadioButtonStyleMounted,
    onClickRow?: OnRowEvent,
    onDoubleClickRow?: OnRowEvent,
    onCheckboxStateChanged?: OnRowEvent,
    onRadioStateChanged?: OnRowEvent,
    onClickCell?: OnCellEvent,
    onDoubleClickCell?: OnCellEvent,
    onContextMenu?: OnContextMenu,
    uniqueKeyIdentifier?: string | UniqueKeyIdentifier,
}

export type Row = {
    _uuid?: string,
    _hasFocus?: boolean,
    _isChecked?: boolean,
    _isCheckboxDisabled?: boolean,
    _isRadioChecked?: boolean,
    [key: string]: any
}

export type State = {
    _selectedRadioRow?: Row | null,
    uuid: string,
    orderBy?: OrderBy,

    loading: boolean,
    filters: { [key: string]: any },
    rowStyle?: { [key: string]: any },
    currentPage: number,
    totalRows: number,
    rowsPerPage: number,
    focusedCell?: Element,
    rows: Row[],
    config: ArcanaDataTableConfig
}

export type Methods = {
    refresh: () => Promise<void>,
    fetch: () => Promise<void>,
    setRows: (rows: Row[]) => Row[],
    clearRows: () => void,
    removeRow: (uuid: string) => void,
    addRow: (row: Row) => void,
    upsert: (uuid: string, row: Row) => void,
    updateRow: (uuid: string, row: Row) => void,
    getRows: () => Row[],
    getCheckedRows: () => Row[],
    isEmpty: () => boolean,
    isNotEmpty: () => boolean,
    getColumns: () => Column[],
    applyFilter: (column: Column, value: any) => Promise<void>,
    applyOrderBy: (orderBy: OrderBy) => Promise<void>,
    setFilter: (name: string, value: any) => void,
    setFilters: (filters: object) => void,
    paginate: (page: number, rowsPerPage: number) => Promise<void>,
    getSummarizedValue: (column: Column, onlyIsChecked?: boolean) => SummarizedValue,
    getSelectedRadioRow: () => Row | null,
    clearRadioRowSelection: () => void,
    clearCheckedRows: () => void,
    setSelectedRadioRow: (row: Row) => void,
}

export type DataTableComponent = State & Methods & ComponentPublicInstance

export type Props = {
    config: ArcanaDataTableConfig
}
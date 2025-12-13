<template>
    <div class="grid-row grid-search-row">
        <div class="datatable-header-cell form-group-sm" v-if="props.grid.config.checkboxEnabled"
            :style="DataTableStyler.getCheckboxColumnStyles()"></div>
        <div class="datatable-header-cell form-group-sm" v-if="props.grid.config.radioButtonSelectionEnabled"
            :style="DataTableStyler.getCheckboxColumnStyles()"></div>

        <div class="datatable-header-cell form-group-sm" v-for="column in grid.getColumns()" :key="column.name"
            :style="DataTableStyler.getSearchRowColumnStyle(column, props.grid)">
            <DataTableSearchField v-if="column.searchEnabled ?? true" :type="column.searchType"
                :search-config="column.searchConfig" :name="column.filterName ?? column.name"
                :disabled="isDisabled(column)" :uuid="grid.uuid" @change="value => onFilterChanged(column, value)" />
        </div>

        <div :style="DataTableStyler.getActionRowColumn(props.grid)" v-if="props.grid.config.actions"
            class="datatable-header-cell form-group-sm"></div>

        <!--        <th v-if="hasActions" class="text-center"></th>-->
    </div>
</template>

<script setup lang="ts">
import type { DataTableComponent, Column } from "../types/types"
import DataTableSearchField from "./DataTableSearchField.vue"
import { computed } from "vue"
import { DataTableStyler } from "../utils/DataTableStyler"

const props = defineProps<{ grid: DataTableComponent }>()


const onFilterChanged = (column: Column, value: any) => props.grid.applyFilter(column, value)

const isDisabled = (column: Column) => {
    if (props.grid.config.disableFilterWhenPresentOnInitialFilters && props.grid.config.initialFilters) {
        return Boolean(props.grid.config.initialFilters[column.filterName ?? column.name])
    }

    return false
}
</script>
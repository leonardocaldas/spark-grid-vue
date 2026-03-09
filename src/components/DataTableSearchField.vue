<template>
    <div class="has-feedback has-feedback-left">
        <InputText v-if="!type" v-model="filterValue" @keyup.enter="search" @change="search" :disabled="disabled" />

        <InputDate :disabled="disabled" v-model="filterValue" @change="search()" v-if="isDate" :type="dateType" />

        <select v-if="isType(DataTableSearchType.BOOLEAN)" v-model="filterValue" class="form-control pl-sm pr-sm"
            :disabled="disabled" @change="search()">
            <option value=""></option>
            <option value="0">Não</option>
            <option value="1">Sim</option>
        </select>

        <MultiSelect v-if="isType(DataTableSearchType.LIST)" v-model="filterValue" :options="filterListValues"
            :disabled="disabled" class="multiple-select-form pr-sm" @change="search()" />

        <div v-if="showSearchIcon" class="form-control-feedback">
            <i class="icon-search4 text-size-base"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { DataTableSearchType } from "../values/column"
import { SearchConfigListValue, DataTableSearchTypeDefinition } from "@/types";
import { EventEmitter } from "../utils/EventEmitter";
import MultiSelect from "./MultiSelect.vue";
import InputText from "./InputText.vue";
import InputDate from "./InputDate.vue";

const filterValue = ref<any>(null)
const filterListValues = ref<SearchConfigListValue[]>([])

const emits = defineEmits(['change'])

const props = defineProps<{
    type?: DataTableSearchTypeDefinition,
    emitsEvents?: boolean,
    disabled?: boolean,
    searchConfig?: () => SearchConfigListValue[] | Promise<SearchConfigListValue[]>,
    uuid?: string,
    name?: string,
    modelValue?: any
}>()

watch(filterValue, (newValue: any) => {
    filterValue.value = typeof newValue === 'number' && !isNaN(newValue) ? parseInt(newValue.toString()) : newValue
})

watch(() => props.modelValue, (newValue: any) => {
    filterValue.value = props.modelValue
})

const showSearchIcon = computed(() => {
    switch (props.type) {
        case DataTableSearchType.BOOLEAN:
        case DataTableSearchType.LIST:
        case DataTableSearchType.REMOTE:
        case DataTableSearchType.DATE:
        case DataTableSearchType.DATE_RANGE:
        case DataTableSearchType.DATE_MONTH:
        case DataTableSearchType.COMPONENT:
            return false
        default:
            return true
    }
})

const isDate = computed(() => isType(DataTableSearchType.DATE) || isType(DataTableSearchType.DATE_RANGE) || isType(DataTableSearchType.DATE_MONTH))

const dateType = computed(() => {
    switch (props.type) {
        case DataTableSearchType.DATE_RANGE:
            return "daterange"
        case DataTableSearchType.DATE_MONTH:
            return "month"
        default:
            return "date"
    }
})

const isType = (type: DataTableSearchTypeDefinition) => props.type === type

const search = () => {
    let value = filterValue.value

    if (isType(DataTableSearchType.DATE_RANGE) && !value) {
        value = []
    }

    emits('change', value)
}

const loadSearchConfig = async () => {
    if (props.searchConfig) {
        let promise: any = props.searchConfig();

        if (promise && typeof promise.then === 'function' && promise[Symbol.toStringTag] === 'Promise') {
            filterListValues.value = await promise
        } else {
            filterListValues.value = promise
        }
    }
}

const onGridFilterChanged = (data: any) => {
    if (data.name === props.name) {
        filterValue.value = data.value
    }
}

onMounted(() => {
    filterValue.value = props.modelValue
    loadSearchConfig()

    if (props.emitsEvents) {
        EventEmitter.on("grid-filter", onGridFilterChanged)
    }
})

onUnmounted(() => {
    if (props.emitsEvents) {
        EventEmitter.off("grid-filter", onGridFilterChanged)
    }
})

</script>
<template>
    <div class="datatable-date-input">
        <!-- Single date input -->
        <input v-if="type === 'date'" type="date" :value="formattedValue" @input="onDateInput" :disabled="disabled"
            class="datatable-input" />

        <!-- Month picker -->
        <input v-else-if="type === 'month'" type="month" :value="formattedMonthValue" @input="onMonthInput"
            :disabled="disabled" class="datatable-input" />

        <!-- Date range -->
        <div v-else-if="type === 'daterange'" class="datatable-date-range">
            <input type="date" :value="rangeStart" @input="onRangeStartInput" :disabled="disabled"
                class="datatable-input datatable-input-range" placeholder="Data início" />
            <span class="datatable-date-separator">-</span>
            <input type="date" :value="rangeEnd" @input="onRangeEndInput" :disabled="disabled"
                class="datatable-input datatable-input-range" placeholder="Data fim" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    modelValue?: string | Date | [string, string] | [Date, Date] | null
    disabled?: boolean
    type?: 'date' | 'month' | 'daterange'
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | [string, string] | null): void
    (e: 'change', value: string | [string, string] | null): void
}>()

// Format date value for native input
const formattedValue = computed(() => {
    if (!props.modelValue) return ''
    if (typeof props.modelValue === 'string') return props.modelValue
    if (props.modelValue instanceof Date) {
        return props.modelValue.toISOString().split('T')[0]
    }
    return ''
})

// Format month value
const formattedMonthValue = computed(() => {
    if (!props.modelValue) return ''
    if (typeof props.modelValue === 'string') {
        // Convert YYYY-MM-DD to YYYY-MM
        return props.modelValue.substring(0, 7)
    }
    if (props.modelValue instanceof Date) {
        const year = props.modelValue.getFullYear()
        const month = String(props.modelValue.getMonth() + 1).padStart(2, '0')
        return `${year}-${month}`
    }
    return ''
})

// Range values
const rangeStart = computed(() => {
    if (!props.modelValue || !Array.isArray(props.modelValue)) return ''
    const val = props.modelValue[0]
    if (!val) return ''
    if (typeof val === 'string') return val
    if (val instanceof Date) return val.toISOString().split('T')[0]
    return ''
})

const rangeEnd = computed(() => {
    if (!props.modelValue || !Array.isArray(props.modelValue)) return ''
    const val = props.modelValue[1]
    if (!val) return ''
    if (typeof val === 'string') return val
    if (val instanceof Date) return val.toISOString().split('T')[0]
    return ''
})

const onDateInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = target.value || null
    emit('update:modelValue', value)
    emit('change', value)
}

const onMonthInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    // Convert YYYY-MM to YYYY-MM-01 for consistency
    const value = target.value ? `${target.value}-01` : null
    emit('update:modelValue', value)
    emit('change', value)
}

const onRangeStartInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const newRange: [string, string] = [target.value || '', rangeEnd.value || '']
    emit('update:modelValue', newRange)
    emit('change', newRange)
}

const onRangeEndInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const newRange: [string, string] = [rangeStart.value || '', target.value || '']
    emit('update:modelValue', newRange)
    emit('change', newRange)
}
</script>

<style scoped>
.datatable-date-input {
    width: 100%;
}

.datatable-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 12px;
    background: white;
    transition: border-color 0.2s;
}

.datatable-input:hover {
    border-color: #c0c4cc;
}

.datatable-input:focus {
    outline: none;
    border-color: #409eff;
}

.datatable-input:disabled {
    background-color: #f5f7fa;
    cursor: not-allowed;
    color: #c0c4cc;
}

.datatable-date-range {
    display: flex;
    align-items: center;
    gap: 8px;
}

.datatable-input-range {
    flex: 1;
}

.datatable-date-separator {
    color: #909399;
    font-size: 12px;
}

/* Mobile responsive */
@media screen and (max-width: 480px) {
    .datatable-input {
        min-height: 40px;
        font-size: 14px;
    }

    .datatable-date-range {
        flex-direction: column;
        gap: 4px;
    }

    .datatable-date-separator {
        display: none;
    }
}

@media (hover: none) and (pointer: coarse) {
    .datatable-input {
        min-height: 44px;
    }
}
</style>

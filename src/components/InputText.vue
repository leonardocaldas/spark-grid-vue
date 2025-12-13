<template>
    <input type="text" :value="modelValue" @input="onInput" @keyup.enter="$emit('keyup.enter', $event)"
        @change="$emit('change', $event)" :disabled="disabled" :placeholder="placeholder" class="datatable-input" />
</template>

<script setup lang="ts">
defineProps<{
    modelValue?: string | number
    disabled?: boolean
    placeholder?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'keyup.enter', event: KeyboardEvent): void
    (e: 'change', event: Event): void
}>()

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<style scoped>
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

/* Mobile responsive */
@media screen and (max-width: 480px) {
    .datatable-input {
        min-height: 40px;
        font-size: 14px;
    }
}

@media (hover: none) and (pointer: coarse) {
    .datatable-input {
        min-height: 44px;
    }
}
</style>

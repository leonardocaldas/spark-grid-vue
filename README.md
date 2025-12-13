# Arcana DataTable

A powerful and flexible data table component for Vue 3 and Nuxt.js.

## Installation

```sh
npm install @arcanalabs/datatable
```

## Nuxt.js Setup

1. Add `@arcanalabs/datatable` to the `modules` section of `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@arcanalabs/datatable'
  ]
})
```

2. That's it! You can now use the `<ArcanaDataTable />` component in your Nuxt pages and components.

## Usage

```vue
<template>
  <ArcanaDataTable :config="config" />
</template>

<script setup lang="ts">
import type { ArcanaDataTableConfig } from '@arcanalabs/datatable'

const config: ArcanaDataTableConfig = {
  columns: [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' }
  ],
  datasource: async () => {
    return [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ]
  }
}
</script>
```

<template>
    <div>
        <div style="margin-bottom: 16px; display: flex; gap: 8px;">
            <button @click="applyFilter">Set Filter (name = "Brazil")</button>
            <button @click="clearFilter">Clear Filter</button>
        </div>

        <SparkGrid :config="datatable" ref="grid" />
    </div>
</template>

<style>
body {
    font-family: "Figtree", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}

#app {
    padding: 20px;
}
</style>

<script lang="ts">
import { Component } from "@vue/runtime-core";
import type { Column, SparkGridConfig } from "..";

export default {
    computed: {
        datatable(): SparkGridConfig {
            return {
                url: () => `${window.location.origin}/countries.json`,
                columns: [
                    { name: "id", label: "Id", width: "80px" },
                    { name: "name", label: "Country" },
                    { name: "iso3", label: "Iso3" },
                    { name: "iso2", label: "Iso2" },
                    { name: "capital", label: "Capital" },
                    { name: "currency", label: "Currency" },
                ]
            }
        }
    },

    methods: {
        applyFilter() {
            this.$refs.grid.setFilters({ "name": "Brazil" })
        },
        clearFilter() {
            this.$refs.grid.setFilter("name", "")
        }
    }
} as Component
</script>

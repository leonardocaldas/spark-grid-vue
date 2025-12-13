import type { App } from "vue";
import ArcanaDataTableComponent from "./ArcanaDataTable.vue";
import type { InstallOptions } from "./types";

export const ArcanaDataTable: any = {
    install(app: App, options: InstallOptions) {
        app.component("ArcanaDataTable", ArcanaDataTableComponent)
    }
}

export * from "./values";
export * from "./types";
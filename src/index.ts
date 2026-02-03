import type { App } from "vue";
import SparkGridComponent from "./SparkGrid.vue";
import type { InstallOptions } from "./types";
import { GlobalConfig } from "./utils/GlobalConfig";

export const ArcanaDataTable: any = {
    install(app: App, options: InstallOptions) {
        if (options?.baseUrl) {
            GlobalConfig.baseUrl = options.baseUrl
        }

        if (options?.eventProxy) {
            GlobalConfig.eventProxy = options.eventProxy
        }

        if (options?.request) {
            GlobalConfig.request = options.request
        }

        app.component("ArcanaDataTable", SparkGridComponent)
        app.component("SparkGrid", SparkGridComponent)
    }
}

export const SparkGrid = ArcanaDataTable

export * from "./values";
export * from "./types";

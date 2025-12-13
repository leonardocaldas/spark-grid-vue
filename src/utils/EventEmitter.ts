import type { DataTableComponent } from "../types"

export class EventEmitter {
    static onRequestStarted(state: DataTableComponent) {
        if (typeof state.config.onRequestStarted == "function") {
            state.config.onRequestStarted(state)
        }
    }

    static onRequestFinished(response: any, state: DataTableComponent) {
        if (typeof state.config.onRequestFinished == "function") {
            state.config.onRequestFinished(response, state)
        }
    }

    private static events: Record<string, Function[]> = {}

    static emit(grid: DataTableComponent, name: string, data: any): void {
        grid.$emit(name, data)

        if (this.events[name]) {
            this.events[name].forEach(cb => cb(data))
        }
    }

    static on(event: string, callback: Function) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    }

    static off(event: string, callback: Function) {
        if (!this.events[event]) return
        this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
}
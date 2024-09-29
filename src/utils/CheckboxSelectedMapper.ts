import type {Row, GridComponent} from "../definition/types"

export class CheckboxSelectedMapper {
    static map(row: Row, grid: GridComponent) {
        if (typeof grid.config.isRowChecked == "function") {
            row._isChecked = grid.config.isRowChecked(row);
        }

        return row;
    }
}
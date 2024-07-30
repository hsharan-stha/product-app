import {EventEmitter} from "@angular/core";

export interface ConfigDialogBoxConfig {
    headerTitle?: string;
    bodyMessage?: string;
    bodyTitle?: string;
    cancelBtn?: EventEmitter<boolean>;
    confirmBtn?: EventEmitter<boolean>;
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit{
  @Input() public headerTitle!: string;
  @Input() public bodyMessage!: string;
  @Input() public bodyTitle!: string;

  @Output() confirmBtn: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelBtn: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public ngOnInit() {}


  public cancelBtnClick(): void {
    this.cancelBtn.emit(false);
  }

  public confirmBtnClick(): void {
    this.confirmBtn.emit(true);
  }

}

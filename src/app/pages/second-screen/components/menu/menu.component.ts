import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() serverOk: boolean = false;
  @Output() checkServerEmmiter = new EventEmitter<boolean>();
  @Output() takeUploadPhotoEmmiter = new EventEmitter<boolean>();
  @Output() logOutEmmiter = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  public checkServer(): void{
    this.checkServerEmmiter.emit(true);
  }

  public takeUploadPhoto(): void{
    this.takeUploadPhotoEmmiter.emit(true);
  }

  public logOut(): void{
    this.logOutEmmiter.emit(true);
  }
}

import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Settings } from 'src/app/shared/settings';
import { HelpComponent } from '../help/help.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @Output() settingsEvent = new EventEmitter<Settings>();
  ngOnInit(): void {
  }
  @Input() settings: Settings;
  openHelp(){
    const dialogRef = this.dialog.open(HelpComponent, {
      width: '600px'
    });
  }
  openSettings(){
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '600px',
      height: '450px',
      data: {max: this.settings.max, min: this.settings.min, maxQuestions: this.settings.maxQuestions,operators: this.settings.operators}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
      let settings:Settings = {
        max: result.max!="" && result.max!=null?result.max:this.settings.max,
        min: result.min!="" && result.min!=null?result.min:this.settings.min,
        maxQuestions: result.maxQuestions!="" && result.maxQuestions!=null?result.maxQuestions:this.settings.maxQuestions,
        operators: result.operators
      }
      this.settingsEvent.emit(settings)
    }
    else{
      this.settingsEvent.emit(this.settings)
    }
    });
  }
}

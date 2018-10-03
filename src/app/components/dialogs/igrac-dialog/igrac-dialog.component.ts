import { Component, OnInit, Inject } from '@angular/core';
import { Igrac } from '../../../models/igrac';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tim } from '../../../models/tim';
import {TimService } from '../../../services/tim.service';
import { IgracService } from '../../../services/igrac.service';
import { Nacionalnost } from '../../../models/nacionalnost';
import {NacionalnostService } from '../../../services/nacionalnost.service';

@Component({
  selector: 'app-igrac-dialog',
  templateUrl: './igrac-dialog.component.html',
  styleUrls: ['./igrac-dialog.component.css']
})
export class IgracDialogComponent implements OnInit {
  timovi: Tim[];
  nacionalnosti:Nacionalnost[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IgracDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Igrac,
    public igracService: IgracService,
    public timService: TimService,
    public nacionalnostService:NacionalnostService
   
  ) { }

  ngOnInit() {
    this.timService.getAllTim().subscribe(timovi =>
    this.timovi = timovi);
    this.nacionalnostService.getAllNacionalnost().subscribe(nacionalnosti =>
      this.nacionalnosti = nacionalnosti);
  

  }

  public compareTo(a, b){
    return a.id == b.id;
  }

  public onChange(tim,nacionalnost){
    this.data.tim = tim;
    this.data.nacionalnost=nacionalnost;

  } 
 

  public add(): void {
    this.data.id = -1;
 
    this.igracService.addIgrac(this.data);
    this.snackBar.open("Uspešno dodat igrač", "U redu",
      {
        duration: 2500
      });
  }

  public update(): void {
    this.igracService.updateIgrac(this.data);
    this.snackBar.open("Uspešno modifikovan igrač", "U redu",
      {
        duration: 2500
      });
  }

  public delete(): void {
    this.igracService.deleteIgrac(this.data.id);
    this.snackBar.open("Uspešno obrisan igrač", "U redu",
      {
        duration: 2500
      });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu",
    {
      duration: 1000
    });
  }

}
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Igrac} from '../../models/igrac';
import { Observable } from 'rxjs/Observable';
import { IgracService } from '../../services/igrac.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Tim } from '../../models/tim';
import { IgracDialogComponent } from '../dialogs/igrac-dialog/igrac-dialog.component';
import { Nacionalnost } from '../../models/nacionalnost';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit {
  displayedColumns = ['id', 'ime','prezime','broj_reg','datum_rodjenja','nacionalnost','tim', 'actions'];
  dataSource: MatTableDataSource<Igrac>;
  

 @Input() selektovanTim: Tim;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public igracService: IgracService, public dialog: MatDialog) { }

  ngOnChanges() {
    if (this.selektovanTim.id) {
      this.loadData();
    }
  }

  ngOnInit() {
    //this.loadData();
  }

  public loadData() {
    this.igracService.getIgracZaTim(this.selektovanTim.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;


      //pretraga po nazivu ugnježdenog objekta
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'nacionalnost' ? currentTerm + data.nacionalnost.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

       //sortiranje po nazivu ugnježdenog objekta
       this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'nacionalnost': return data.nacionalnost.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id: number, ime: string, prezime: string, brojReg: string,datumRodjenja:Date,nacionalnost:Nacionalnost,tim:Tim) {
    const dialogRef = this.dialog.open(IgracDialogComponent, {
      data: {
        i: id, id: id, ime: ime, prezime: prezime, brojReg: brojReg,
        datumRodjenja: datumRodjenja, nacionalnost: nacionalnost, tim: tim
      }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag == 1)
      dialogRef.componentInstance.data.tim = this.selektovanTim;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    });
  }
}

  
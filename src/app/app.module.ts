import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatGridListModule, MatExpansionModule, MatSortModule, MatTableModule, MatToolbarModule, MatSelectModule, MatOptionModule, MatSnackBarModule, MatDialogModule, MatInputModule, MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, MatPaginatorModule, MatSlideToggle, MatSlideToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimComponent } from './components/tim/tim.component';
import { NacionalnostComponent } from './components/nacionalnost/nacionalnost.component';
import { LigaComponent } from './components/liga/liga.component';
import { IgracComponent } from './components/igrac/igrac.component';
import { AboutComponent } from './components/core/about/about.component';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { RouterModule, Routes } from '@angular/router';
import { TimService } from './services/tim.service';
import { HttpClientModule } from '@angular/common/http';
import { TimDialogComponent } from './components/dialogs/tim-dialog/tim-dialog.component';
import { FormsModule } from '@angular/forms';
import { LigaDialogComponent } from './components/dialogs/liga-dialog/liga-dialog.component';
import { LigaService } from './services/liga.service';
import { IgracService } from './services/igrac.service';
import { IgracDialogComponent } from './components/dialogs/igrac-dialog/igrac-dialog.component';
import { NacionalnostService } from './services/nacionalnost.service';
import { NacionalnostDialogComponent } from './components/dialogs/nacionalnost-dialog/nacionalnost-dialog.component';
import { CommonModule } from '@angular/common';  


const Routes = [
  { path: 'tim', component: TimComponent},
  { path: 'nacionalnost', component: NacionalnostComponent},
  { path: 'igrac', component: IgracComponent},
  { path: 'liga', component: LigaComponent},
  { path: 'about', component: AboutComponent},
  { path: 'home', component: HomeComponent},
  { path: 'author', component: AuthorComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    TimComponent,
    LigaComponent,
    NacionalnostComponent,
    IgracComponent,
    AboutComponent,
    HomeComponent,
    AuthorComponent,
    TimDialogComponent,
    LigaDialogComponent,
    NacionalnostDialogComponent,
    IgracDialogComponent,
    
  ],
  imports: [
    BrowserModule, CommonModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,
    MatGridListModule, MatExpansionModule, MatTableModule,
    MatToolbarModule, MatSelectModule, MatOptionModule,
    MatSnackBarModule, MatDialogModule, MatInputModule,
    MatDatepickerModule, MatCheckboxModule, MatNativeDateModule,
    MatPaginatorModule, MatSortModule,
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule
  ],


  entryComponents: [TimDialogComponent, LigaDialogComponent, NacionalnostDialogComponent, IgracDialogComponent],
  providers: [TimService, LigaService, NacionalnostService, IgracService],
  bootstrap: [AppComponent]
})
export class AppModule { }
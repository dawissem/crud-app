import { Component, OnInit , ViewChild } from '@angular/core';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';
import {AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'crud-app by dawissem';



  displayedColumns: string[] = [
    'id', 
    'Prenom',
    'Nomfamille',
    'email',
    'date',
    'Genre',
    'education',
    'Entreprise',
    'Experiences',
    'Salaire',
    'Actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;





  constructor(
    private _dialog: MatDialog ,
     private _empService:EmployeeService 
    ){}
 ngOnInit() :void {

  this.getEmployeeList();  
 }
 
  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);

  }

  getEmployeeList() {
    this._empService.getemployeesList().subscribe({
      next:(res) =>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      error: console.log,
      
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

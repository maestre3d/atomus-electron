import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { UachService } from '../../services/uach.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public loaded: boolean;
  materials: any[] = [];
  displayedColumns: string[] = ['name', 'type', 'stock'];
  dataSource = new MatTableDataSource(this.materials);
  value = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort ) sort: MatSort;

  constructor(private http: HttpClient, private uach: UachService) {
    this.loaded = true;
    this.uach.getMaterials()
    .subscribe( (response: any) => {
      console.log(response);
      this.materials = response;
      this.loaded = false;
      this.dataSource.data = this.materials;
    });
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

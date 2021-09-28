import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductoService } from '@producto/shared/service/producto.service';
import { Producto } from '@producto/shared/model/producto';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  public listaProductos: Observable<Producto[]>;

  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  length:number;
  buscador = new FormControl('');

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['idProducto', 'nombreProducto', 'precioProducto'];

  @ViewChild(MatPaginator) paginador: MatPaginator;
  @ViewChild(MatSort) ordenar: MatSort;

  constructor(protected productoService: ProductoService) { }

  ngOnInit() {
    this. listData(0, 10);
  }

  listData(page:number, size:number){
    let sarch:string = this.buscador.value;
    this.listaProductos = this.productoService.consultar(page, size, sarch);
    this.listaProductos.subscribe((res:any) => {
      this.dataSource = new MatTableDataSource(res.content);
      this.pageIndex = res.number;
      this.pageSize = res.size;
      this.length =  res.totalElements;
    });
  }

  paginationData(event?:PageEvent){
    console.log(event);
    this.listData(this.pageIndex+1, 10);
    this.pageIndex = this.pageIndex+1;
    return event;
  }

}

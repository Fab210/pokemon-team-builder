import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'image', 'name'];

  data: any[] = [];
  datasource = new MatTableDataSource<any>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;


  constructor(private pokeService: PokemonService, private router:Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    let pokemonData;
    for (let i = 1; i <= 920; i++) {

      this.pokeService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name,

          };
          this.data.push(pokemonData);
          
          this.datasource = new MatTableDataSource<any>(this.data);
          this.datasource.paginator = this.paginator;
          console.log(res);
        },
        err => {

        }
      );
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  getRow(row) {
    
    console.log(row)
    this.router.navigateByUrl(`pokeDetail/${row.position}`)
  }
}

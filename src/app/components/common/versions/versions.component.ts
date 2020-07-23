import { Component, OnInit } from '@angular/core';
import * as versions from 'src/assets/versions.json';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.scss']
})
export class VersionsComponent implements OnInit {
  versions = versions;
  constructor() { }

  ngOnInit(): void {
  }

}

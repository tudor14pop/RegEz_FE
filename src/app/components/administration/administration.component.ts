import { Component, OnInit } from '@angular/core';
import { AdministrationService } from 'src/app/services/administration.service';
import { UserModel } from 'src/app/models/user.model';
import { Company } from 'src/app/models/Company';
import { forkJoin } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor(private administrationService: AdministrationService) { }

  ngOnInit(): void {

  }

}

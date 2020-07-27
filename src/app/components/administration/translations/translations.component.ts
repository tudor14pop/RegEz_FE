import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/services/label.service';
declare var $: any;
@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {

  constructor(public labelService: LabelService) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.footable').footable();

    }, 0);
  }

}

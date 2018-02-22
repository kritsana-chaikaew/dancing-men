import { Component, OnInit } from '@angular/core';
import { Cipher } from '../cipher';

@Component({
  selector: 'app-cipher',
  templateUrl: './cipher.component.html',
  styleUrls: ['./cipher.component.css']
})
export class CipherComponent implements OnInit {
  cipher: Cipher = {
    content: 'this is example of cipher content'
  };

  constructor() { }

  ngOnInit() {
  }

}

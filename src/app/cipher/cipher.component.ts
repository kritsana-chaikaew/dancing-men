import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CHARACTERS } from '../cipher';

@Component({
  selector: 'app-cipher',
  templateUrl: './cipher.component.html',
  styleUrls: ['./cipher.component.css']
})
export class CipherComponent implements OnInit {

  characters = CHARACTERS;
  selectedCharacter: Character;

  constructor() { }

  ngOnInit() {
  }

  onSelect(character: Character): void {
    this.selectedCharacter = character;
  }
}

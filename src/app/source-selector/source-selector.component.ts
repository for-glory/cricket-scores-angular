import { Component } from '@angular/core';
import { ScoreService } from '../score.service';
import { SourceType } from '../source-type';

@Component({
  selector: 'app-source-selector',
  templateUrl: './source-selector.component.html',
  styleUrls: ['./source-selector.component.css']
})
export class SourceSelectorComponent {
  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.selectTestData();
  }

  selectTestData() {
    this.scoreService.selectSourceType(SourceType.TEST);
  }

  selectServerData() {
    this.scoreService.selectSourceType(SourceType.SERVER);
  }
}

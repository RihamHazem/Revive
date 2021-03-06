import {Component, Input, OnInit} from '@angular/core';
import {ColorEvent} from 'ngx-color';
import {RestRequestsService} from '../rest-requests.service';

@Component({
  selector: 'app-interactive-colorization',
  templateUrl: './interactive-colorization.component.html',
  styleUrls: ['./interactive-colorization.component.css']
})
export class InteractiveColorizationComponent implements OnInit {
  @Input() private imageUrl: string|ArrayBuffer;
  @Input() private imageOffset: {val: number, dir: boolean, oldWidth: number, oldHeight: number, newWidth: number, newHeight: number, name: string};
  constructor(private restRequestsService: RestRequestsService) { }

  colorizeButtonStr = 'Colorize';
  state = {r: 0, g: 0, b: 0, a: 0};
  points = [];
  positions = [];
  positionsStyle = [];
  isHidden = [];
  curColor: {r: number, g: number, b: number, a: number} = {r: 0, g: 0, b: 0, a: 0};
  selectedPos = -1;
  selectedElem = null;
  imageBW = false;
  static getRGBA(clr: {r: number, g: number, b: number, a: number}): string {
    return 'rgb(' + clr.r + ', ' + clr.g + ', ' + clr.b + ', ' + clr.a + ')';
  }
  ngOnInit() {
  }
  changeComplete(colorEvent: ColorEvent) {
    this.curColor = colorEvent.color.rgb;
    if (this.selectedElem !== null) {
      this.positions[this.selectedPos]['background-color'] = InteractiveColorizationComponent.getRGBA(this.curColor);
      this.positionsStyle[this.selectedPos]['background-color'] = this.positions[this.selectedPos]['background-color'];
    }
    console.log(colorEvent);
  }

  addPoint(clickEvent) {
    const targetId = clickEvent.target.id;
    // if the clicked elem is the close image
    if (targetId.includes('close-')) {
      this.deletePoint();
      return;
    }
    // check that the clicked point isn't on a point
    if (this.selectedElem !== null) {
      this.selectedElem.classList.remove('selected-point');
      if (this.selectedElem === clickEvent.target) {
        this.selectedElem = null;
        this.selectedPos = -1;
        return;
      }
      this.selectedElem = null;
      this.selectedPos = -1;
    }
    if (targetId.includes('point-')) {
      this.selectedPos = Number(clickEvent.target.id.substr(6));
      this.selectedElem = clickEvent.target;
      this.selectedElem.classList.add('selected-point');
      return;
    }
    let x = clickEvent.offsetX;
    let y = clickEvent.offsetY;
    if (this.imageOffset.dir === false) {
      // width is greater
      if (y < this.imageOffset.val || y > this.imageOffset.val + this.imageOffset.newHeight) {
        return;
      }
      y -= this.imageOffset.val;
    } else {
      if (x < this.imageOffset.val || x > this.imageOffset.val + this.imageOffset.newWidth) {
        return;
      }
      x -= this.imageOffset.val;
    }
    this.points.push(this.points.length);
    this.positions.push({
      left: x,
      top: y,
      oldWidth: this.imageOffset.oldWidth,
      oldHeight: this.imageOffset.oldHeight,
      newWidth: this.imageOffset.newWidth,
      newHeight: this.imageOffset.newHeight,
      'background-color': InteractiveColorizationComponent.getRGBA(this.curColor)
    });
    this.positionsStyle.push({
      left: clickEvent.offsetX,
      top: clickEvent.offsetY,
      'background-color': InteractiveColorizationComponent.getRGBA(this.curColor)
    });
    console.log(this.positions);
    console.log(this.positionsStyle);
    this.isHidden.push(false);
  }

  deletePoint() {
    this.isHidden[this.selectedPos] = true;
    this.selectedElem.classList.add('delete-point');
    this.selectedElem = null;
    this.selectedPos = -1;
  }

  setBWImage() {
    this.imageBW = true;
  }
  setColorImage() {
    this.imageBW = false;
  }
  colorizeImage() {
    const filteredPositions = [];
    let i = 0;
    for (const elem of this.isHidden) {
      if (elem === true) {
        filteredPositions.push(this.positions[i]);
      }
      i += 1;
    }
    this.restRequestsService.interColrImage(this.imageUrl, filteredPositions).subscribe((data) => {
      console.log(data);
    });
  }
}

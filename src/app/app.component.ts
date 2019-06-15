import {Component, OnInit} from '@angular/core';
import {ColorEvent} from 'ngx-color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Revive';
  mode = 'upload'; // whether resolution or interactive or colorization
  imageUrl: string|ArrayBuffer;
  imageOffset = {val: -1, dir: false, oldWidth: 0, oldHeight: 0, newWidth: 0, newHeight: 0}; // false: width, true: height
  ngOnInit() {
  }

  interColorizationMode(imgFile: File) {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = (event) => {
      this.mode = 'interactive';
      this.imageUrl = reader.result;
      const image = new Image();
      image.src = this.imageUrl.toString();

      image.onload = () => {
        const width = image.width;
        const height = image.height;
        this.imageOffset.oldWidth = width;
        this.imageOffset.oldHeight = height;
        let offset = -1;
        if (width > height) {
          offset = (700 / width) * height;
          this.imageOffset.dir = false;
          this.imageOffset.newWidth = width;
          this.imageOffset.newHeight = offset;
        } else {
          offset = (700 / height) * width;
          this.imageOffset.dir = true;
          this.imageOffset.newWidth = offset;
          this.imageOffset.newHeight = height;
        }
        offset = ((700 - offset) / 2);
        this.imageOffset.val = offset;
        console.log(this.imageOffset);
      };
    };
    console.log(imgFile);
  }
}

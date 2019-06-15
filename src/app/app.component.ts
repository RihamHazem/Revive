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
  imageOffset = {val: -1, dir: false, height: 0, width: 0}; // false: width, true: height
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
        let offset = -1;
        if (width > height) {
          offset = (700 / width) * height;
          this.imageOffset.dir = false;
          this.imageOffset.width = width;
          this.imageOffset.height = offset;
        } else {
          offset = (700 / height) * width;
          this.imageOffset.dir = true;
          this.imageOffset.width = offset;
          this.imageOffset.height = height;
        }
        offset = ((700 - offset) / 2);
        this.imageOffset.val = offset;
        console.log(this.imageOffset);
      };
    };
    console.log(imgFile);
  }
}

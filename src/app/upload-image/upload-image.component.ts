import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Output() private colorize: EventEmitter<File> = new EventEmitter();
  private invalidFiles: any = [];
  uploadError = false;
  messageError = '';
  constructor() { }

  ngOnInit() {
  }

  onFilesChange(file: Array<File>) {
    if (this.uploadError === true) {
      return;
    }
    this.colorize.emit(file[0]);
  }

  onFileInvalids(status: string) {
    if (status === 'invalid file') {
      this.uploadError = true;
      this.messageError = 'Invalid type image. The supported types are [jpg, jpeg, png, gif]';
    } else if (status === 'multiple files') {
      this.uploadError = true;
      this.messageError = 'You cannot upload multiple files. Just one image';
    }
  }

  close() {
    this.uploadError = false;
    this.messageError = '';
  }
}

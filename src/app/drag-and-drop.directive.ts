import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @Input() private allowedExtensions: Array<string> = [];
  @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmiter: EventEmitter<string> = new EventEmitter();

  constructor() { }
  @HostBinding('style.background-color') private backgroundColor = '#eee';
  @HostBinding('style.background-image') private backgroundImage = 'url(../../assets/images/download.svg)';
  @HostBinding('style.outline-offset') private outlineOffset = '#eee';
  @HostBinding('style.outline-color') private outlineColor = '#CCCCCC';
  @HostBinding('style.color') private txtColor = '#CCCCCC';
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.backgroundColor = '#fafafa';
    this.outlineOffset = '-20px';
    this.outlineColor = '#ffd740';
    this.txtColor = '#ffd740';
    this.backgroundImage = 'url(../../assets/images/download_col.svg)';
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.backgroundColor = '#eee';
    this.outlineOffset = '-10px';
    this.outlineColor = '#CCCCCC';
    this.txtColor = '#CCCCCC';
    this.backgroundImage = 'url(../../assets/images/download.svg)';
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const droppedFiles = evt.dataTransfer.files;
    this.backgroundColor = '#eee';
    this.outlineColor = '#CCCCCC';
    this.txtColor = '#CCCCCC';
    this.outlineOffset = '-10px';
    this.backgroundImage = 'url(../../assets/images/download.svg)';
    if (droppedFiles.length === 1) {
      const validFiles: Array<File> = [];

      for (const file of droppedFiles) {
        const ext = file.name.split('.')[file.name.split('.').length - 1];
        if (this.allowedExtensions.lastIndexOf(ext) !== -1) {
          validFiles.push(file);
        } else {
          // invalid file type error
          this.filesInvalidEmiter.emit('invalid file');
          return;
        }
      }
      this.filesChangeEmiter.emit(validFiles);
    } else if (droppedFiles.length > 1) {
      // show an error to the user
      this.filesInvalidEmiter.emit('multiple files');
    }
  }
}

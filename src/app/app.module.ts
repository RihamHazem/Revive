import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import {ColorSketchModule} from 'ngx-color/sketch';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InteractiveColorizationComponent } from './interactive-colorization/interactive-colorization.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { DragAndDropDirective } from './drag-and-drop.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InteractiveColorizationComponent,
    NavBarComponent,
    FooterComponent,
    UploadImageComponent,
    DragAndDropDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    NgbModule,
    ColorSketchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrainstormViewComponent } from './brainstorm-view/brainstorm-view.component';
import { IdeaDetailViewComponent } from './idea-detail-view/idea-detail-view.component';
import { IdeaService } from './services/idea.service';

@NgModule({
  declarations: [
    AppComponent,
    BrainstormViewComponent,
    IdeaDetailViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    IdeaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrainstormViewComponent } from './brainstorm-view/brainstorm-view.component';
import { IdeaDetailViewComponent } from './idea-detail-view/idea-detail-view.component';
import { IdeaService } from './services/idea.service';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { IdeaAddComponent } from './idea-add/idea-add.component';

@NgModule({
  declarations: [
    AppComponent,
    BrainstormViewComponent,
    IdeaDetailViewComponent,
    QuickViewComponent,
    IdeaAddComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [
    IdeaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

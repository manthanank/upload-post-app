import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsService } from './posts/posts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule
} from "@angular/material/button";
import {
  MatToolbarModule
} from "@angular/material/toolbar";
import {
  MatExpansionModule
} from "@angular/material/expansion";
import {
  MatCardModule,
} from "@angular/material/card";
import {
  MatInputModule,
} from "@angular/material/input";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PostCreateComponent,
    PostListComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

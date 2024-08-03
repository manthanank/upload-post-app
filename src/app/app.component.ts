import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { AuthService } from './services/auth.service';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  authService = inject(AuthService);
  meta = inject(Meta);

  constructor() {
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    this.meta.addTag({ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' });
    this.meta.addTag({ rel: 'canonical', href: 'https://upload-post-app.vercel.app/' });
    this.meta.addTag({ property: 'og:title', content: 'Upload Post App' });
    this.meta.addTag({ name: 'author', content: 'Manthan Ankolekar' });
    this.meta.addTag({ name: 'keywords', content: 'angular, nodejs, express, mongodb' });
    this.meta.addTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({ property: 'og:description', content: 'A simple web application to upload posts with images and text. Built using Angular, Node.js, Express, and MongoDB.' });
    this.meta.addTag({ property: 'og:image', content: 'https://upload-post-app.vercel.app/image.jpg' });
    this.meta.addTag({ property: 'og:url', content: 'https://upload-post-app.vercel.app/' });
  }
  
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}

import { enableProfiling } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Turn on profiling *before* bootstrapping your application
// in order to capture all of the code run on start-up.
enableProfiling();

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

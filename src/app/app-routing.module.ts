import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import { FooComponent } from "./foo/foo.component";
import { BarComponent } from "./bar/bar.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReviewPageComponent } from './review-page/review-page.component';

const appRoutes : Routes = 
[
  { path: "main", component : FooComponent},
  { path: "login", component : LoginComponent},
  { path: "register", component : RegisterComponent},
  { path: "reviewData", component : ReviewPageComponent},
  { path: "**", redirectTo: "main"}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false})
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

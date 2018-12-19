import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import { FooComponent } from "./foo/foo.component";
import { BarComponent } from "./bar/bar.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { RegistrationSuccesComponent } from './registration-succes/registration-succes.component';
import { DetailsComponent } from './details/details.component';
import { ReviewViewerComponent } from './review-viewer/review-viewer.component';
import { SearchReviewsPageComponent } from './search-reviews-page/search-reviews-page.component';
import { SpecialReviewComponent } from './special-review/special-review.component';

const appRoutes : Routes = 
[
  { path: "main", component : FooComponent},
  { path: "login", component : LoginComponent},
  { path: "register", component : RegisterComponent},
  { path: "registerSucces", component : RegistrationSuccesComponent},
  { path: "reviewData", component : ReviewPageComponent},
  { path: "searchReview", component : SearchReviewsPageComponent},
  { path: "pageNotFound", component : BarComponent},
  { path: "reviewData/:id", component : ReviewViewerComponent},
  { path: "details/:id", component : DetailsComponent},
  { path: "special/:id", component : SpecialReviewComponent},
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

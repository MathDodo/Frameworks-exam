import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { FooComponent } from './foo/foo.component';
import { BarComponent } from './bar/bar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ReviewViewerComponent } from './review-viewer/review-viewer.component';
import { RegistrationSuccesComponent } from './registration-succes/registration-succes.component';
import { DetailsComponent } from './details/details.component';
import { SearchReviewsPageComponent } from './search-reviews-page/search-reviews-page.component';
import { SpecialReviewComponent } from './special-review/special-review.component';




@NgModule({
  declarations: [
    AppComponent,
    FooComponent,
    BarComponent,
    RegisterComponent,
    LoginComponent,
    ReviewPageComponent,
    ReviewViewerComponent,
    RegistrationSuccesComponent,
    DetailsComponent,
    SearchReviewsPageComponent,
    SpecialReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

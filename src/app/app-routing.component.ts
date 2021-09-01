import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./components/base/base.component";
import { FirstScreenComponent } from "./pages/first-screen/first-screen.component";
import { ShowImageComponent } from "./pages/show-image/show-image.component";
import { SecondScreenComponent } from "./pages/second-screen/second-screen.component";

const routes: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      {
        path: 'first-screen', component: FirstScreenComponent
      },
      {
        path: 'second-screen', component: SecondScreenComponent
      },
      {
        path: 'show-image', component: ShowImageComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
]


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./components/home";

const routes: Routes = [
  { path: "", component: HomeComponent }
];

export const Router = RouterModule.forRoot(routes);

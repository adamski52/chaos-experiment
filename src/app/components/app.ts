import { Component } from "@angular/core";

import "../../style/app.scss";

@Component({
  selector: "chaos-app",
  templateUrl: "../templates/app.html"
})

export class AppComponent {
  public property:string = "lol";

  constructor() {
  }
}

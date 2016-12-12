import {OnInit, Component} from "@angular/core";
import {Stage} from "./stage";
import {Utilities} from "../services/utilities";


@Component({
  selector: "chaos-home",
  templateUrl: "../templates/home.html"
})

export class HomeComponent implements OnInit {
  private _stage:Stage;

  constructor(private $utilities:Utilities) {}

  ngOnInit() {
    this._stage = new Stage("canvas", this.$utilities);
  }
}

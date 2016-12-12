import {OnInit, Component} from "@angular/core";
import {Stage} from "./stage";
import {Utilities} from "../services/utilities";
import {RandomImage} from "../services/random-image";

@Component({
  selector: "chaos-home",
  templateUrl: "../templates/home.html"
})

export class HomeComponent implements OnInit {
  private _stage:Stage;

  constructor(private $randomImage:RandomImage, private $utilities:Utilities) {}

  ngOnInit() {
    this._stage = new Stage("canvas", this.$randomImage, this.$utilities);
  }
}

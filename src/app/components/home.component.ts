import {OnInit, Component} from "@angular/core";
import {Stage} from "../classes/stage.class";
import {Utilities} from "../services/utilities.service";
import {RandomImage} from "../services/random-image.service";

@Component({
  selector: "chaos-home",
  templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
  private _stage:Stage;

  constructor(private $randomImage:RandomImage, private $utilities:Utilities) {}

  ngOnInit() {
    this._stage = new Stage("canvas", this.$randomImage, this.$utilities);
  }
}

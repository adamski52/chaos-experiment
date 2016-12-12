import { Injectable } from "@angular/core";
import { Shape } from "./shape";
import { Utilities } from "../services/utilities";

@Injectable()
export class Stage {
    private _stage:createjs.Stage;
    private _shapes:Shape[] = [];

    constructor(private _canvasId:string, private $utilities:Utilities) {
        this._stage = new createjs.Stage(this._canvasId);

        this.resize();

        for(let i = 0; i < 10; i++) {
            let shape:Shape = new Shape(this.$utilities);
            this._stage.addChild(shape.getElement());
            this._shapes.push(shape);
        }


        setInterval(() => {
            this.update();
        }, 10);

        window.addEventListener("resize", () => {
            this.resize();
        });
    }

    private update():void {
        for(let s of this._shapes) {
            s.update();
        }
        this._stage.update();
    }

    private resize():void {
        let canvas:any = this._stage.canvas as any;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

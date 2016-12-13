import { Injectable } from "@angular/core";
import { Shape } from "./shape";
import { Utilities } from "../services/utilities";
import { Tile } from "./tile";
import { RandomImage } from "../services/random-image";

@Injectable()
export class Stage {
    private _stage:createjs.Stage;
    private _shapes:Shape[] = [];
    private _tiles:Tile[] = [];

    constructor(private _canvasId:string, private $randomImage:RandomImage, private $utilities:Utilities) {
        this._stage = new createjs.Stage(this._canvasId);

        this.resize();

        // TODO:  Base it on size
        for(let row = 0; row < 10; row++) {
            for (let col = 0; col < 40; col++) {
                let tile:Tile = new Tile(this.$randomImage, this.$utilities);

                tile.setPosition(col, row);

                this._stage.addChild(tile.getElement());
                this._tiles.push(tile);
            }
        }

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

        for(let t of this._tiles) {
            t.update();
        }

        this._stage.update();
    }

    private resize():void {
        let canvas:any = this._stage.canvas as any;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

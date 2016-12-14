import { Injectable } from "@angular/core";

@Injectable()
export class Menu {
    private _container:createjs.Container;

    private _image:HTMLImageElement;
    private _shape:createjs.Bitmap;

    constructor() {
        this._container = new createjs.Container();

        this.loadImage();
    }

    private loadImage():void {
        this._image = new Image();
        this._image.onload = () => {
            this.draw();
        };

        this._image.src = "img/burger.png";
    }

    private cache():void {
        let bounds:createjs.Rectangle = this._shape.getBounds();

        this._shape.cache(0, 0, bounds.width, bounds.height);
    }

    private setSize():void {
        this._container.scaleX = this._container.scaleY = .5;

        let bounds:createjs.Rectangle = this._shape.getBounds();
        this._container.regX = bounds.width/2;
        this._container.regY = bounds.height/2;
    }

    private draw():void {
        this._shape = new createjs.Bitmap(this._image);
        this.setSize();
        this.cache();
        this._container.addChild(this._shape);
    }

    public moveTo(x:number, y:number) {
        createjs.Tween.get(this._container).to({
            x: x,
            y: y
        }, 500, createjs.Ease.circInOut);

        //this._container.x = x;
        //this._container.y = y;
    }

    public getElement():createjs.Container {
        return this._container;
    }
}

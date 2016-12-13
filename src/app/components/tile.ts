import { Injectable } from "@angular/core";
import { RandomImage } from "../services/random-image";
import { Utilities } from "../services/utilities";

@Injectable()
export class Tile {
    private _container:createjs.Container;

    private _isInit:boolean = false;

    private _tileImage:HTMLImageElement;
    private _tileContainer:createjs.Container;
    private _tileShape:createjs.Bitmap;

    private _maskImage:HTMLImageElement;
    private _maskShape:createjs.Bitmap;

    private FADE_OUT_FRAMES:number = 40;
    private _currentFrame:number = 0;
    private _isFading:boolean = false;

    private _maxAlpha:number = .02;

    private _bounds:createjs.Rectangle = new createjs.Rectangle();
    private UNLIKELIHOOD:number = 1000;


    constructor(private $randomImage:RandomImage, private $utilities:Utilities) {
        this._bounds.setValues(0, 0, 100, 100);

        this._container = new createjs.Container();

        this._tileContainer = new createjs.Container();

        this.loadImage();
    }

    private loadImage():void {
        this._tileImage = new Image();
        this._tileImage.onload = () => {
            this.loadMask();
        };

        this._tileImage.src = this.$randomImage.get();
    }

    private loadMask():void {
        this._maskImage = new Image();
        this._maskImage.onload = () => {
            this.draw();
            this._isInit = true;
        };

        this._maskImage.src = this.$randomImage.get();
    }

    private setAlpha():void {
        this._tileShape.alpha = this._maxAlpha; //this.$utilities.getRandomBetween(.01, .01);
    }

    private setColorMatrix():void {
        let tileMatrix:createjs.ColorMatrix = new createjs.ColorMatrix();

        // brightness, contrast, saturation, hue
        tileMatrix.adjustColor(
            0,//this.$utilities.getRandomBetween(-100, 50),
            this.$utilities.getRandomBetween(50, 100),
            this.$utilities.getRandomBetween(100, 180),
            this.$utilities.getRandomBetween(-100, 100)
        );

        this._tileShape.filters.push(new createjs.ColorMatrixFilter(tileMatrix));
    }

    // private setBlur():void {
    //     let blur:createjs.BlurFilter =  new createjs.BlurFilter(50, 30, 1);
    //
    //     this._bounds = blur.getBounds();
    //
    //     this._tileShape.filters.push(blur);
    // }

    private cache():void {
        this._tileShape.cache(0, 0, this.getWidth(), this.getHeight());
    }

    private setTransformation():void {
        // x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY
        let scale:number = this.$utilities.getRandomBetween(.8, 3);

        this._tileShape.setTransform(
            0,
            0,
            scale,
            scale,
            this.$utilities.getRandomBetween(0, 359),
            this.$utilities.getRandomBetween(-10, 10),
            this.$utilities.getRandomBetween(-10, 10),
            this._bounds.width/2,
            this._bounds.height/2
        );
    }

    private draw():void {
        this._tileShape = new createjs.Bitmap(this._tileImage);
        this._maskShape = new createjs.Bitmap(this._maskImage);
        this._maskShape.cache(0, 0, 100, 100);

        this.redraw();

        this._tileContainer.addChild(this._tileShape);

        this._container.addChild(this._tileShape);
    }

    private redraw() {
        this._tileShape.filters = [];
        this.setMask();
        this.setColorMatrix();
        //this.setBlur();
        this.setTransformation();
        this.setAlpha();
        this.cache();
    }

    private setMask():void {
        let cache:any = this._maskShape.cacheCanvas as any;
        this._tileShape.filters.push(new createjs.AlphaMapFilter(cache));
    }

    private markForDeath():void {
        this._isFading = true;
        this._currentFrame = 0;
    }

    private fade():void {
        this._tileShape.alpha -= this._maxAlpha/this.FADE_OUT_FRAMES;
        if(this._tileShape.alpha <= 0) {
            this._isFading = false;
            this.redraw();
        }
    }

    public setPosition(col:number, row:number) {
        this.getElement().x = this.getWidth() * col;
        this.getElement().y = this.getHeight() * row;
    }

    public update():void {
        if(!this._isInit) {
            return;
        }

        if(this._isFading) {
            this.fade();
            return;
        }

        if(this.$utilities.getRandomBetween(0, this.UNLIKELIHOOD) === 0) {
            this.markForDeath();
            return;
        }
    }

    public getWidth():number {
        return this._bounds.width;
    }

    public getHeight():number {
        return this._bounds.height;
    }

    public getElement():createjs.Container {
        return this._container;
    }
}

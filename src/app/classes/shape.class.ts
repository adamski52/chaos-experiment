/// <reference path="../../../node_modules/@types/createjs/index.d.ts" />

import { Injectable } from "@angular/core";
import { Utilities } from "../services/utilities.service";
import { IRGB } from "../interfaces/rgb.interface";

@Injectable()
export class Shape {
    private _container:createjs.Container;
    private _shape:createjs.Shape;
    private _outline:createjs.Shape;

    private MIN_VERTICES:number = 3;
    private MAX_VERTICES:number = 9;

    private MIN_FLICKERS:number = 10;
    private MAX_FLICKERS:number = 15;

    private UNLIKELIHOOD:number = 500;

    private _isFlickering:boolean = false;
    private _numFlickers:number;
    private _currentFlickers:number;

    constructor(private $utilities:Utilities) {
        this._container = new createjs.Container();
        this._shape = new createjs.Shape();
        this._outline = new createjs.Shape();

        this._container.addChild(this._outline);
        this._container.addChild(this._shape);

        this.draw();
    }

    public getElement():createjs.Container {
        return this._container;
    }

    public update():void {
        if(this._isFlickering) {
            this.flicker();
            return;
        }

        if(this.$utilities.getRandomBetween(0, this.UNLIKELIHOOD) === 0) {
            this.markForDeath();
            return;
        }
    }

    public draw():void {
        let i:number = 0;

        this._container.x = this.$utilities.getRandomBetween(0, window.innerWidth);
        this._container.y = this.$utilities.getRandomBetween(0, window.innerHeight);
        this._container.rotation = this.$utilities.getRandomBetween(0, 359);

        this.reset();
        this.begin();


        while(i++ < this.$utilities.getRandomBetween(this.MIN_VERTICES, this.MAX_VERTICES)) {
            this.drawVertex();
        }

        this.finish();
    }

    private markForDeath():void {
        this._isFlickering = true;

        this._numFlickers = this.$utilities.getRandomBetween(this.MIN_FLICKERS, this.MAX_FLICKERS);
        this._currentFlickers = 0;
    }

    private flicker():void {
        this.getElement().visible = this._currentFlickers % 2 === 0;
        if(this._currentFlickers++ > this._numFlickers) {
            this._isFlickering = false;
            this.draw();
        }
    }

    private finish():void {
        this._shape.graphics.closePath();
        this._shape.graphics.endFill();

        this._outline.graphics.closePath();
        this._outline.graphics.endStroke();
    }

    private reset():void {
        this._shape.graphics.clear();
        this._outline.graphics.clear();
    }

    private getRandomColor():IRGB {
        return {
            r: this.$utilities.getRandomBetween(100, 255),
            g: this.$utilities.getRandomBetween(100, 255),
            b: this.$utilities.getRandomBetween(100, 255)
        };
    }

    private begin():void {
        let color:IRGB = this.getRandomColor();
        this._shape.graphics.beginFill("rgba(" + color.r + ", " + color.g + ", " + color.b + ", .025)");
        this._outline.graphics.beginStroke("rgba(" + color.r + ", " + color.g + ", " + color.b + ", .05)");
        this._outline.graphics.setStrokeStyle(1);
        this.moveTo(0, 0);
    }

    private moveTo(x:number, y:number) {
        this._shape.graphics.moveTo(x, y);
        this._outline.graphics.moveTo(x, y);
    }

    private drawVertex():void {
        let x:number = this.$utilities.getRandomBetween(0, window.innerWidth),
            y:number = this.$utilities.getRandomBetween(0, window.innerHeight);

        this._shape.graphics.lineTo(x, y);
        this._outline.graphics.lineTo(x, y);
    }
}

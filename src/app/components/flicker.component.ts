import {Component, Renderer, ElementRef, OnInit} from '@angular/core';

import {Utilities} from "../services/utilities.service";

@Component({
    selector: 'flicker',
    template: '<ng-content></ng-content>'
})

export class FlickerComponent implements OnInit {
    private UNLIKELIHOOD:number = 20;

    constructor(private _el: ElementRef, private _renderer: Renderer, private $utilities:Utilities) {}

    ngOnInit():void {
        window.setInterval(() => {
            this.flicker();
        }, 10);
    }


    private flicker():void {
        let num:number = this.$utilities.getRandomBetween(0, this.UNLIKELIHOOD);
        this._renderer.setElementStyle(this._el.nativeElement, "visibility", num === 0 ?  "hidden" : "visible");
    }
}

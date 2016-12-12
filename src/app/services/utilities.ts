import { Injectable } from "@angular/core";

@Injectable()
export class Utilities {
    public getRandomBetween(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

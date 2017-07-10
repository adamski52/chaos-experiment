import { Injectable } from "@angular/core";

@Injectable()
export class RandomImage {
    public get():string {
        return "assets/img/" + Math.floor(Math.random() * 15) + ".jpg";
    }
}

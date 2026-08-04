import {Component} from '@angular/core';
import {Typewriter} from '../../../../shared/ui/typewriter/typewriter';

@Component({
    selector: 'app-hero',
    imports: [
        Typewriter
    ],
    templateUrl: './hero.html',
    styleUrl: './hero.css',
})
export class Hero {

}

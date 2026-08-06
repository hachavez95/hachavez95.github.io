import { Component } from '@angular/core';
import {Typewriter} from '../../../../shared/ui/typewriter/typewriter';

@Component({
    selector: 'app-about',
    imports: [
        Typewriter
    ],
    templateUrl: './about.html',
    styleUrl: './about.css',
})
export class About {}

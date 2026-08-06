import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-icon',
    imports: [NgClass],
    standalone: true,
    templateUrl: './icon.html',
    styleUrl: './icon.css',
})
export class Icon {
    name = input.required<string>();
    size = input<string>('size-6');
    color = input<string>('text-white');
}

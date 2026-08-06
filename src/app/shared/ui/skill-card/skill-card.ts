import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
    selector: 'app-skill-card',
    imports: [Icon],
    templateUrl: './skill-card.html',
    styleUrl: './skill-card.css',
})
export class SkillCard {
    icon = input.required<string>();
    title = input.required<string>();
    description = input.required<string>();
}

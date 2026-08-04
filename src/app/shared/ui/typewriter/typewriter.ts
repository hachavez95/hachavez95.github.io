import { Component, OnInit, OnDestroy, Input, signal } from '@angular/core';

@Component({
    selector: 'app-typewriter',
    imports: [],
    standalone: true,
    templateUrl: './typewriter.html',
    styleUrl: './typewriter.css',
})
export class Typewriter implements OnInit, OnDestroy {
    @Input() texts: string[] = [];
    @Input() speed = 100;        // ms por caracter al escribir
    @Input() deleteSpeed = 50;  // ms por caracter al borrar
    @Input() pause = 3000;      // ms de espera antes de borrar
    @Input() loop = true;       // si vuelve al inicio al terminar el array

    displayedText = signal('');
    isDone = signal(false);

    private textIndex = 0;
    private timeoutId?: ReturnType<typeof setTimeout>;

    ngOnInit() {
        if (this.texts.length) this.type();
    }

    ngOnDestroy() {
        clearTimeout(this.timeoutId);
    }

    /*Escribe progresivamente las letras de un texto.*/
    private type() {
        const currentText = this.texts[this.textIndex];
        let i = 0;

        const writeChar = () => {
            this.displayedText.update(t => t + currentText[i]);
            i++;
            if (i < currentText.length) {
                this.timeoutId = setTimeout(writeChar, this.speed);
            } else {
                this.isDone.set(true);
                this.timeoutId = setTimeout(() => this.erase(currentText), this.pause);
            }
        };

        writeChar();
    }

    /*Borra progresivamente las letras de un texto.*/
    private erase(currentText: string) {
        let i = currentText.length;

        const deleteChar = () => {
            this.displayedText.update(t => t.slice(0, -1));
            i--;
            if (i > 0) {
                this.timeoutId = setTimeout(deleteChar, this.deleteSpeed);
            } else {
                this.isDone.set(false);
                this.nextText();
            }
        };

        deleteChar();
    }

    /*Salta a la siguiente palabra.*/
    private nextText() {
        this.textIndex++;
        if (this.textIndex >= this.texts.length) {
            if (!this.loop) return;
            this.textIndex = 0;
        }
        this.type();
    }
}

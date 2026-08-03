import {AfterViewInit, Component, computed, ElementRef, HostListener, OnInit, signal, viewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Icon} from '../../shared/ui/icon/icon';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, Icon],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit {
    isMenuOpen = signal(false);
    headerHeight = signal(0);
    isResizing = signal(false);

    private resizeTimeout?: ReturnType<typeof setTimeout>;

    /*Apunta al elemento con ID topBar.*/
    topBar = viewChild.required<ElementRef<HTMLDivElement>>('topBar');

    /*Posición vertical del nav.*/
    navTop = computed(() => `${this.headerHeight()}px`);

    /*Altura del nav.*/
    navHeight = computed(() => `calc(100vh - ${this.headerHeight()}px)`);

    ngAfterViewInit() {
        this.measureHeader();
    }

    @HostListener('window:resize')
    onResize() {
        this.isResizing.set(true);
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => this.isResizing.set(false), 150);

        this.measureHeader();
        if (window.innerWidth >= 768) {
            this.closeMenu();
        }
    }

    navClasses = computed(() => {
        const base = 'gap-x-4 md:static md:flex md:flex-row md:items-center md:bg-transparent md:w-auto md:opacity-100 md:scale-100 md:pointer-events-auto';

        const mobileOverlay = 'max-md:fixed max-md:inset-0 max-md:flex max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-y-2 max-md:bg-[#182028]';

        const mobileState = this.isMenuOpen()
            ? 'max-md:opacity-100 max-md:scale-100 max-md:pointer-events-auto'
            : 'max-md:opacity-0 max-md:scale-95 max-md:pointer-events-none';

        const transition = this.isResizing()
            ? '!transition-none'
            : 'max-md:transition-all max-md:duration-300 max-md:ease-in-out';

        return `${base} ${mobileOverlay} ${mobileState} ${transition}`;
    });

    private measureHeader() {
        const height = this.topBar().nativeElement.offsetHeight;
        this.headerHeight.set(height);
    }

    toggleMenu() {
        this.isMenuOpen.update(open => !open);
    }

    closeMenu() {
        this.isMenuOpen.set(false);
    }
}

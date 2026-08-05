import {
    AfterViewInit,
    Component,
    computed,
    effect,
    ElementRef,
    HostListener,
    inject,
    OnDestroy,
    PLATFORM_ID,
    signal,
    viewChild
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Icon} from '../../shared/ui/icon/icon';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, Icon],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit, OnDestroy {
    isMenuOpen = signal(false);
    headerHeight = signal(0);
    isResizing = signal(false);
    private resizeTimeout?: ReturnType<typeof setTimeout>;
    private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    topBar = viewChild.required<ElementRef<HTMLDivElement>>('topBar');

    navTop = computed(() => `${this.headerHeight()}px`);
    navHeight = computed(() => `calc(100vh - ${this.headerHeight()}px)`);

    constructor() {
        effect(() => {
            if (!this.isBrowser) return;
            document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
        });
    }

    ngAfterViewInit() {
        this.measureHeader();
    }

    ngOnDestroy() {
        if (this.isBrowser) {
            document.body.style.overflow = '';
        }
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
        const mobileOverlay = 'max-md:fixed max-md:z-[99999] max-md:inset-0 max-md:flex max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-y-2 max-md:bg-[#182028]';
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

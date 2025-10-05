import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'logo-component',
    standalone: true,
    imports: [],
    template: `
        <div class="flex items-center space-x-2  w-[150px]">
          <div class="w-8 h-8 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift w-5 h-5 text-white" aria-hidden="true">
              <rect x="3" y="8" width="18" height="4" rx="1"></rect>
              <path d="M12 8v13"></path>
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
            </svg>
          </div>
          <span class="text-xl font-bold bg-[var(--primary-color)] bg-clip-text text-transparent">RifasYA</span>
        </div>
    `
})

export class LogoComponent { }
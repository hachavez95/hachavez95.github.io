import { Component } from '@angular/core';
import { SkillCard } from '../../../../shared/ui/skill-card/skill-card';

@Component({
    selector: 'app-skills',
    imports: [SkillCard],
    templateUrl: './skills.html',
    styleUrl: './skills.css',
})
export class Skills {
    skills = [
        {
            icon: 'typescript',
            title: 'TypeScript',
            description:
                'Desarrollo de aplicaciones con seguridad de tipos para bases de código escalables y fáciles de mantener.',
        },
        {
            icon: 'nodejs',
            title: 'Node.js',
            description: 'Creación de lógica de servidor de alto rendimiento y API asíncronas.',
        },
        {
            icon: 'mysql',
            title: 'MySQL',
            description:
                'Diseño de esquemas relacionales eficientes y optimización de consultas complejas.',
        },
        {
            icon: 'git',
            title: 'Git',
            description:
                'Gestión del control de versiones con un historial de *commits* limpio y un flujo de trabajo ordenado.',
        },
        {
            icon: 'postman',
            title: 'Postman',
            description: 'Prueba y documentación rigurosas de API RESTful para su integración.',
        },
        {
            icon: 'tailwindcss',
            title: 'Tailwind CSS',
            description:
                'Diseño rápido de interfaces de usuario modernas, adaptables y accesibles.',
        },
        {
            icon: 'docker',
            title: 'Docker',
            description:
                'Contenerización de aplicaciones para garantizar la coherencia entre entornos.',
        },
        {
            icon: 'python',
            title: 'Python',
            description:
                'Aprovechamiento de Python para tareas de scripting, automatización y procesamiento de datos.',
        },
    ];
}

/* ==========================================================================
   APP.JS - LÓGICA DE INTERACCIÓN DEL PORTAFOLIO
   Yuritza Juliana Rojas Mantilla
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MENÚ MÓVIL
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            mobileToggle.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // 2. SCROLLSPY (RESALTAR SECCIÓN ACTIVA EN NAVEGACIÓN)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. FILTRADO INTERACTIVO DE PROYECTOS
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'todos' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. COPIAR CORREO AL PORTAPAPELES
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'yuritrojasmantilla@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('¡Correo copiado al portapapeles!');
            }).catch(() => {
                showToast('Error al copiar el correo');
            });
        });
    }

    function showToast(mensaje) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = mensaje;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 5. VENTANA MODAL CON INFORMACIÓN REAL DE REPOSITORIOS
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalGithubLink = document.getElementById('modalGithubLink');

    const projectDetailsData = {
        'p1': {
            title: 'N8N Automatización Libreta de Campo',
            category: 'AUTOMATIZACIÓN / WORKFLOWS / n8n',
            desc: 'Flujo de trabajo creado en n8n enfocado en la automatización del flujo de información de libretas de campo empleadas en geología. Facilita la extracción, estructuración y sincronización de datos con servicios remotos sin intervención manual.',
            url: 'https://github.com/yuritrojasmantilla/N8N-Automatizacion-Libreta_Campo'
        },
        'p2': {
            title: 'TalentFlow AI',
            category: 'INTELIGENCIA ARTIFICIAL / PYTHON',
            desc: 'Proyecto colaborativo que integra herramientas de Inteligencia Artificial para agilizar los procesos de selección y evaluación de candidatos, analizando perfiles e integrando flujos de datos inteligentes.',
            url: 'https://github.com/yuritrojasmantilla/TalentFlow_AI-YuritzaRojas-SergioFlorez'
        },
        'p3': {
            title: 'Proyecto Acme School',
            category: 'DESARROLLO WEB / JAVASCRIPT',
            desc: 'Aplicación en JavaScript para la administración y control de un entorno académico. Implementa validaciones, manipulación dinámica del DOM y lógica modular.',
            url: 'https://github.com/yuritrojasmantilla/ProyectoAcmeschool_JavaScript_RojasYuritza-JimenezCamilo-PerezDavid'
        },
        'p4': {
            title: 'Consumo de APIs REST',
            category: 'INTEGRACIÓN WEB / FETCH API',
            desc: 'Repositorio dedicado a la interacción con fuentes de datos externas mediante peticiones HTTP asíncronas, procesando respuestas en formato JSON para presentarlas dinámicamente.',
            url: 'https://github.com/yuritrojasmantilla/consumoAPI-s'
        },
        'p5': {
            title: 'Proyecto Python',
            category: 'PROGRAMACIÓN / PYTHON 3',
            desc: 'Estructura de soluciones algorítmicas desarrolladas en Python, abarcando gestión de estructuras de datos, lógica de control y procesamiento de información.',
            url: 'https://github.com/yuritrojasmantilla/Proyecto_Python_YuritzaJulianaRojasMantilla'
        },
        'p6': {
            title: 'Página Web Personal',
            category: 'MAQUETACIÓN / HTML5 & CSS3',
            desc: 'Desarrollo de sitio web personal implementando principios de diseño responsivo, estructura HTML semántica y hojas de estilo optimizadas.',
            url: 'https://github.com/yuritrojasmantilla/PaginaWeb'
        }
    };

    document.querySelectorAll('.detail-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            const projectId = card.getAttribute('data-id');
            const data = projectDetailsData[projectId];

            if (data && projectModal) {
                modalTitle.textContent = data.title;
                modalCategory.textContent = data.category;
                modalDescription.textContent = data.desc;
                modalGithubLink.setAttribute('href', data.url);
                projectModal.classList.add('open');
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            projectModal.classList.remove('open');
        });
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('open');
            }
        });
    }

    // 6. FORMULARIO DE CONTACTO
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('¡Mensaje enviado con éxito!');
            contactForm.reset();
        });
    }
});

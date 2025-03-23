

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.mobile-header__gamburger-button');
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay')
    

    let isOpen = false;

    // Открытие и закрытие по клику на бургер
    burger.addEventListener('click', () => {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    
    

// Закрытие при нажатии на ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});


    // Функция открытия меню
    function openMenu() {
        menu.classList.remove('close');
        menu.classList.add('open');
       
        burger.classList.add('open');
        document.body.classList.add('no-scroll');
        isOpen = true;
       
    }

    // Функция закрытия меню
    function closeMenu() {
        menu.classList.remove('open');
        menu.classList.add('close');
        
        burger.classList.remove('open');
        document.body.classList.remove('no-scroll');
        isOpen = false;
       
    }
});








  
         
         
      
         
                


        /* const service_cards = document.querySelectorAll('.services .services__item');
         const arrowLeft = document.querySelector('.services-arrow-prev');
         const arrowRight = document.querySelector('.services-arrow-next');
         const countSlide = service_cards.length;
         let current = 0;
         
         
         function showSlide(index) {
            service_cards.forEach(s => s.classList.remove('service-card-show'));
            service_cards[index].classList.add('service-card-show');
        
            
            arrowLeft.disabled = (index === 0);
            arrowRight.disabled = (index === countSlide - 1);
        
            
            arrowLeft.classList.toggle('disabled', index === 0);
            arrowRight.classList.toggle('disabled', index === countSlide - 1);
        }
         
         
         arrowLeft.addEventListener('click', () => {
             if (current > 0) {
                 current--;
                 showSlide(current);
             }
         });
         
         
         arrowRight.addEventListener('click', () => {
             if (current < countSlide - 1) {
                 current++;
                 showSlide(current);
             }
         });
         
         
         showSlide(current);
         
         */

         
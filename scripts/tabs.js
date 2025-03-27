document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tabs__link');
    const tabPanes = document.querySelectorAll('.viewer__pane');

    function switchTab(e) {
        e.preventDefault();
        
        // Удаляем активный класс у всех табов
        tabLinks.forEach(link => link.classList.remove('tabs__link_active'));
        tabPanes.forEach(pane => pane.classList.remove('viewer__pane_active'));
        
        // Добавляем активный класс кликнутому табу
        const clickedTab = e.target;
        clickedTab.classList.add('tabs__link_active');
        
        // Показываем соответствующий контент
        const tabId = clickedTab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('viewer__pane_active');
    }

    // Добавляем обработчики событий для каждого таба
    tabLinks.forEach(tab => {
        tab.addEventListener('click', switchTab);
    });
}); 
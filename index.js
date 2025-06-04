let startX = 0;
let startY = 0;
const threshold = 100; // Minimum swipe distance to trigger action

// Detect swipe start
document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

// Detect swipe end and trigger actions
document.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const deltaX = startX - endX; // Positive = swipe left, Negative = swipe right
  const deltaY = startY - endY;

  // Only consider horizontal swipes with minimal vertical movement
  if (Math.abs(deltaX) > threshold && Math.abs(deltaY) < threshold) {
    const activeSection = document.querySelector('.section.active');

    if (activeSection?.classList.contains('hidden')) {
      // In a submenu: swipe left (deltaX positive) to go back
      if (deltaX > threshold) {
        goBack();
      }
    } else {
      // In main menu: swipe left/right to switch tabs
      const tabs = document.querySelectorAll('.tabs');
      const currentTab = document.querySelector('.tab.active');
      const currentTabIndex = Array.from(tabs).indexOf(currentTab);

      if (currentTabIndex === -1) return;

      if (deltaX > threshold) { // Swipe left → Previous tab
        if (currentTabIndex > 0) {
          tabs[currentTabIndex - 1].click();
        }
      } else if (deltaX < -threshold) { // Swipe right → Next tab
        if (currentTabIndex < tabs.length - 1) {
          tabs[currentTabIndex + 1].click();
        }
      }
    }
  }
});
const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".section");


function handleTabClick(event) {

  tabs.forEach(tab => tab.classList.remove("active"));
  sections.forEach(section => section.classList.remove("active"));

  const clickedTab = event.target;
  clickedTab.classList.add("active");

  
  const targetSectionId = clickedTab.dataset.section;

  
  const targetSection = document.getElementById(targetSectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }
}


tabs.forEach(tab => {
  tab.addEventListener("click", handleTabClick);
});

function showSubMenu(submenuId) {
  const mainMenu = document.querySelector('.main-menu');
  const subMenu = document.getElementById(submenuId + '-submenu');
 

  if (mainMenu) mainMenu.style.display = 'none';
  if (subMenu) subMenu.style.display = 'block';
}


function goBack() {
  const mainMenu = document.querySelector('.main-menu');
  const subMenus = document.querySelectorAll('.hidden');

  if (mainMenu) mainMenu.style.display = 'block';

  
  subMenus.forEach(sub => {
      sub.style.display = 'none';
  });


}

document.body.addEventListener('touchmove', (e) => {
  if (isSwiping) {
    e.preventDefault();
  }
});

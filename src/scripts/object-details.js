// Object Details Tabs
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.details-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and panes
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Add active class to clicked tab and corresponding pane
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      document.getElementById(tabName).classList.add('active');
    });
  });
  
  // Set initial active state
  document.querySelector('.details-tab.active').classList.add('active');
  document.querySelector('.tab-pane.active').classList.add('active');
});
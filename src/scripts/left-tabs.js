document.addEventListener('DOMContentLoaded', function(){
  var tabs = document.querySelectorAll('.lt-tab');
  var panes = document.querySelectorAll('.lt-pane');
  if(!tabs.length) return;
  tabs.forEach(function(t){
    t.addEventListener('click', function(){
      tabs.forEach(function(x){x.classList.remove('active');x.setAttribute('aria-selected','false');});
      panes.forEach(function(p){p.classList.remove('active');});
      this.classList.add('active');
      this.setAttribute('aria-selected','true');
      var id = this.getAttribute('data-target');
      var pane = document.getElementById(id);
      if(pane) pane.classList.add('active');
    });
  });
});

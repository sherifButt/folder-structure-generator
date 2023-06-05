document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.querySelector('.dropdown-trigger');
  
    dropdown.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentElement.classList.toggle('is-active');
    });
  
    dropdown.addEventListener('touchstart', function(e) {
      e.preventDefault();
      this.parentElement.classList.toggle('is-active');
    });
  
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        var dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(function(dd) {
          dd.classList.remove('is-active');
        });
      }
    });
  
    document.addEventListener('touchstart', function(e) {
      if (!dropdown.contains(e.target)) {
        var dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(function(dd) {
          dd.classList.remove('is-active');
        });
      }
    });
  });
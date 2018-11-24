import * as $ from "jquery";
$(function() {
  
    /* hide list */
    $('body').on('click',function(e){
      $('.dropdown').removeClass('dropdown--open');
    });
    
    /* show list */
    $('.dropdown input').on('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      $('.dropdown').removeClass('dropdown--open');
      $(this).parents('.dropdown').toggleClass('dropdown--open');
      $('.dropdown--open ul').scrollTop(0);
    });
    
    /* select value from list */
    $('.dropdown li').on('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      var $dropdown = $(this).parents('.dropdown');
      $dropdown.find("input").val( $(this).text() );
      $dropdown.find("input[type='hidden']").val( $(this).data('value') );
      $dropdown.find('input').trigger('change');
      $dropdown.removeClass('dropdown--open');
    });
  
  });
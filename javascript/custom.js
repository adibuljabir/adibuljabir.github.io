jQuery(document).ready(function () {

  //if (jQuery("[rel=tooltip]").length) {jQuery("[rel=tooltip]").tooltip();}
 // jQuery('button').addClass('btn');
// ____________________________________________________________________________________________ resize display
/*
        var myWidth = 0;
        myWidth = window.innerWidth;
        jQuery('body').prepend('<div id="size" style="background:#000;padding:5px;position:fixed;z-index:999;color:#fff;">Width = '+myWidth+'</div>');
        jQuery(window).resize(function(){
            var myWidth = 0;
            myWidth = window.innerWidth;
            jQuery('#size').remove();
            jQuery('body').prepend('<div id="size" style="background:#000;padding:5px;position:fixed;z-index:999;color:#fff;">Width = '+myWidth+'</div>');
        });
*/
// ____________________________________________________________________________________________ responsive menu

	var mainMenu = jQuery('.main_menu ul.menu');
  mainMenu.find('li.parent > a').append('<span class="arrow"></span>');
  mainMenu.find(' > li').last().addClass('lastChild');
// ____________________________________________________________________________________________
// scroll to Top



jQuery('body').append("<a href='#' id='Go_Top' class='arrow--hide'><span class='arrow' ></span></a><a href='#' id='Go_Bottom' class='arrow--hide'><span class='arrow' ></span></a>");


 if (jQuery(window).scrollTop()>="250") jQuery("#Go_Top").removeClass("arrow--hide")
 jQuery(window).scroll(function(){
  if (jQuery(window).scrollTop()<="250") jQuery("#Go_Top").addClass("arrow--hide")

  else jQuery("#Go_Top").removeClass("arrow--hide")

 });


 if (jQuery(window).scrollTop()<=jQuery(document).height()-"999") jQuery("#Go_Bottom").removeClass("arrow--hide")
 jQuery(window).scroll(function(){
  if (jQuery(window).scrollTop()>=jQuery(document).height()-"999") jQuery("#Go_Bottom").addClass("arrow--hide")
  else jQuery("#Go_Bottom").removeClass("arrow--hide")
 });

 jQuery("#Go_Top").click(function(){
  jQuery("html, body").animate({scrollTop:0},"3500")
 })
 jQuery("#Go_Bottom").click(function(){
  jQuery("html, body").animate({scrollTop:jQuery(document).height()},"3500")
 })






 });
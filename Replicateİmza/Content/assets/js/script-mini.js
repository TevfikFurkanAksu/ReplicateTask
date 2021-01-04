function is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

function gr_form_init() {
  $('.gr-form-group input').each(function(){
    if ($(this).val()) { $(this).addClass('filled'); }
  })
	$('.gr-form-group input').on('keyup', function () { $(this).attr('value', this.value); });
	$('.gr-form-group input').on('blur', function () {
		if ($(this).val()) { $(this).addClass('filled'); } else { $(this).removeClass('filled'); }
	});
}
gr_form_init();
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
$('.step-item').on('click',function(e){
  $(this).addClass('active').siblings().removeClass('active');
  $(this).prevAll().addClass('done');
  $(this).nextAll().removeClass('done');
})

$('.step-item').on({
  mouseenter: function () {
    $(this).addClass('active').siblings().removeClass('active');
    $(this).prevAll().addClass('done');
    $(this).nextAll().removeClass('done');
  },
  mouseleave: function () {

  }
});
$('.step-item.active').prevAll().addClass('done');
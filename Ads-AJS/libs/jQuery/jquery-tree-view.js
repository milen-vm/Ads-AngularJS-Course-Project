(function($) {	
	$.fn.treeView = function() {
		var $this = $(this);
		$this.on('click', function(event) {
			var target = $(event.target);
			target.children('ul').toggle().find('ul').css('display', 'none');
			event.stopPropagation();
			console.log('from plugin');
		});
		return $this;
	};
}(jQuery));

$(document).ready(function() {
    $('#tree').treeView();
    // $.fn.treeView('#tree');
});
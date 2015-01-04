(function($) {	
	$.fn.treeView = function() {
		var $this = $(this);
		$this.on('click', function(event) {
			var target = $(event.target).parent();
			target.children('ul').toggle().find('ul').css('display', 'none');
			event.stopPropagation();
		});
		
		return $this;
	};
}(jQuery));

$(document).ready(function() {
    $('#tree').treeView();
    // $.fn.treeView('#tree');
});
(function(){
	var uibuilder = require('ui/UiBuilder');
	var scrollView = Ti.UI.createScrollView({layout: 'vertical'});
	
	var title1 = uibuilder.labelCentered(scrollView, '5dp');
	title1.text = Ti.Locale.getString('ui','');
	title1.font = {fontSize:22, fontWeight: "bold"};
	
	scrollView.add(title1);
	module.exports = scrollView;
}());

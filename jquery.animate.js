//	jQuery.animate()
//	This is a basic override for jQuery.fn.animate() that allows you to pass functions as property values.
//	A function is created that sets the fx.end property on each step of the animation.

//	(c) 2015 Stephen Rushing, eSiteful
//	jQuery.animate may be freely distributed under the MIT license.
//	For all details and documentation:
//	https://github.com/stephenr85/jquery.animate

(function($){
	var originalAnimate = $.fn.animate;
	
	$.fn.animate = function(properties, options){
		options || (options = {});
		
		//Make sure we have objects for our arguments.
		if(typeof properties !== 'object' || typeof options !== 'object'){
			//If not, send them to the original function.
			return originalAnimate.apply(this, arguments);
		}
		
		var I = this,
			statics = $.extend({}, properties),
			step = options.step || $.noop;
			
		//Wrap the original step function.
		options.step = function(){				
			if(typeof properties[fx.prop] === 'function'){
				//Set the animation target value with the property function.
				fx.end = properties[fx.prop].apply(this, arguments);
			}
			//Call the original step function.
			return stepFn.apply(this, arguments);
		};
		
		$.each(properties, function(prop, value){
			if(typeof value === 'function'){
				//Set the initial value of the property for the animate function.
				statics[prop] = value.call(I);
			}
		});
		//Call the original jQuery.animate function with the modified arguments.
		return originalAnimate.call(this, statics, options);
	};
	
	//Make the original jQuery.animate() function available via $.fn.animate.original, just because.
	$.fn.animate.original = originalAnimate;

})(jQuery);

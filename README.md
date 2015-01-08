# jquery.animate
A simple override for jQuery animate that allows properties to be passed as functions for dynamic values.

For instance, if you have a container that needs to scroll to a specific element, but other children of the container are being toggled, the necessary scrollTop for the container will change before the animation completes. Now we can pass a function for scrollTop, or any other property. 

````
$('#container').animate({
  scrollTop: function(){
    return $('#container').scrollTop() + $('#container .item.selected').position().top;
  }
});
````

Example: http://jsfiddle.net/stephenr85/y7n5bq00/

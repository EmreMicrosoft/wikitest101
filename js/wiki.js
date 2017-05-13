//Makes the ajax query.
function getWikiContent(title)
{
	var xmlHttp = null;
	var theUrl = "http://" + langArray[selectedlang] + ".wikipedia.org/w/api.php?action=parse&callback=parseResults&format=json&origin=*&page=" + title;
    xhr = new XMLHttpRequest();

    removeClass(document.getElementById("boton"), "searchable");
	addClass(document.getElementById("boton"), "loading");

	//start AJAX query
    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
        eval(this.responseText.slice(4));
        removeClass(document.getElementById("boton"), "loading");
		addClass(document.getElementById("boton"), "searchable");
		timeout = null;
    }
};
    xhr.open( "GET", theUrl, true );
    xhr.send();
}

// Parses the results into the content div.
function parseResults(response)
{
	//if it didn't parse, variable name is error
	if (typeof response.parse !== 'undefined')
		document.getElementById("content").innerHTML=response.parse.text["*"];
	else
		document.getElementById("content").innerHTML=response.error.info;

// Changes language from the selector
function langSelectorChange(key)
{
 	selectedlang = key;
}

document.addEventListener("DOMContentLoaded", function(event) 
{ 
	var is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
	if (is_mobile)
	{
		addClass(document.getElementById("phonebar"), "hidden");
	}
	else
	{
		addClass(document.getElementById("bar"), "hidden");
	}
});

var timeout= null;

// Starts trigger when keyup in searchbox
function startSearch(text)
{
	if (timeout == null)
	{
		timeout = setTimeout(function(){getWikiContent(text)},1500);
		removeClass(document.getElementById("boton"),"searchable");
		addClass(document.getElementById("boton"), "loading");
	}
	else
	{
		clearTimeout(timeout);
		timeout = setTimeout(function(){getWikiContent(text)},1500);
	}
}

// auxiliary function to check for classes.
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

//mimics addClass JQUERY
function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

//mimics removeClass JQUERY
function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
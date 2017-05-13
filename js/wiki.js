var langArray = ["es","hi","ru","en","fr", "jp", "ne","ca" ,"ar", "ka"];
var langValue = ["Spanish", "Hindi", "Russian", "English", "French", "Japanese", "Nepali", "Catalan", "Arab", "Georgian"];
var selectedlang = 3;

function getWikiContent(title)
{
	var xmlHttp = null;
	var theUrl = "http://" + langArray[selectedlang] + ".wikipedia.org/w/api.php?action=parse&callback=parseResults&format=json&origin=*&page=" + title;
    xhr = new XMLHttpRequest();

    removeClass(document.getElementById("boton"), "searchable");
	addClass(document.getElementById("boton"), "loading");

    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
        eval(this.responseText.slice(4));
        removeClass(document.getElementById("boton"), "loading");
		addClass(document.getElementById("boton"), "searchable");
    }
};
    xhr.open( "GET", theUrl, true );
    xhr.send();
}

function parseResults(response)
{
	document.getElementById("content").innerHTML=response.parse.text["*"];
	getWikiContent(document.getElementById('titlefield').value);
}

function langSelectorChange(key)
{
 	selectedlang = key;
}


var timeout= null;

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

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
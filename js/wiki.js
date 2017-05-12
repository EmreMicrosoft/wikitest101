var langArray = ["es","hi","ru","en","fr", "jp", "ne","ca" ,"ar", "ka"];
var langValue = ["Spanish", "Hindi", "Russian", "English", "French", "Japanese", "Nepali", "Catalan", "Arab", "Georgian"];
var selectedlang = 0;

function getWikiContent(title)
{
	var xmlHttp = null;
	var theUrl = "http://" + langArray[selectedlang] + ".wikipedia.org/w/api.php?action=parse&format=json&page=" + title;


    xhr = new XMLHttpRequest();
    xhr.open( "GET", theUrl, true );
    xhr.responseType = 'json';
    xhr.setRequestHeader("Origin", "http://wiki.innovastudios.net");
    xhr.send();
    document.getElementById("content").innerHtml=xhr.text;
}


var timeout= null

function startSearch(text)
{
	if (timeout == null)
	{
		timeout = setTimeout(function(){getWikiContent(text)});
	}
	else
	{
		clearTimeout(timeout);
		timeout = setTimeout(function(){getWikiContent(text)});
	}
}
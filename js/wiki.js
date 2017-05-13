var langArray = ["es","hi","ru","en","fr", "jp", "ne","ca" ,"ar", "ka"];
var langValue = ["Spanish", "Hindi", "Russian", "English", "French", "Japanese", "Nepali", "Catalan", "Arab", "Georgian"];
var selectedlang = 3;

function getWikiContent(title)
{
	var xmlHttp = null;
	var theUrl = "http://" + langArray[selectedlang] + ".wikipedia.org/w/api.php?action=parse&callback=parseResults&format=json&origin=*&page=" + title;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
        eval(this.responseText.slice(4));
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
	}
	else
	{
		clearTimeout(timeout);
		timeout = setTimeout(function(){getWikiContent(text)},1500);
	}
}
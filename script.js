// reading of .JSON file
var request = new XMLHttpRequest();
request.responseType = 'json';
request.onload = function() {
  if (request.response != null) {
    for (let url of request.response.URLlist) {
      loadArticle(url);
    }
  }
}

request.open('GET', "article_list.json");
request.send();


function parseHTML(html) {
  var t = document.createElement('template');
  t.innerHTML = html;
  return t.content.cloneNode(true);
}
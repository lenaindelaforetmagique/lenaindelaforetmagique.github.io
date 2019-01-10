// reading of .JSON file
var request = new XMLHttpRequest();
request.responseType = 'json';
request.onload = function() {
  if (request.response != null) {
    for (let url of request.response.list) {
      let dom = document.createElement('article');
      let main = document.getElementById('main');
      main.appendChild(dom);
      console.log(url);
      loadArticle(url, dom);
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



loadArticle = function(url, dom) {
  let requ = new XMLHttpRequest();
  requ.responseType = "json";
  requ.onload = function() {
    if (requ.response != null) {
      let h2 = document.createElement('h2');
      h2.innerHTML = requ.response.title;
      dom.appendChild(h2);

      let a_link = document.createElement('a');
      a_link.setAttribute('href', requ.response.URL);
      a_link.setAttribute('target', 'blank');

      let img = document.createElement('img');
      img.setAttribute("src", requ.response.imgURL);
      a_link.appendChild(img);
      dom.appendChild(a_link);

      for (let line of requ.response.longDescription) {
        let longDescr = document.createElement('p');
        longDescr.innerHTML = line;
        dom.appendChild(longDescr);
      }

    } else {
      dom.innerHTML = "<p>L'article <em>" + url + "</em> est introuvable...</p>";
    }
  };
  requ.open('GET', url);
  requ.send();
}
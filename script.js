loadPage = function(jsonURL) {
  let request = new XMLHttpRequest();
  request.responseType = 'json';
  request.onload = function() {
    if (request.response != null) {
      loadArticles(request.response.articlesURL);
    }
  }
  request.open('GET', jsonURL);
  request.send();
}

loadMenu = function(jsonURL) {
  let menu = null;
  let request = new XMLHttpRequest();
  request.responseType = 'json';
  request.onload = function() {
    if (request.response != null) {
      menu = new Menu(request.response);
    }
  }
  request.open('GET', jsonURL);
  request.send();
}

loadMenu("menu.json");

function parseHTML(html) {
  var t = document.createElement('template');
  t.innerHTML = html;
  return t.content.cloneNode(true);
}


class Menu {
  constructor(jsonMenu) {
    this.items = jsonMenu.items;
    console.log(this.items);
    this.show();
    loadPage(this.items[0].jsonURL);
  }

  show() {
    let parentDOM = document.getElementById('nav');
    let ul = document.createElement('ul');
    parentDOM.appendChild(ul);
    for (let item of this.items) {
      console.log(item);
      let li = document.createElement('li');
      ul.appendChild(li);
      let a = document.createElement('a');
      a.onclick = function() {
        loadPage(item.jsonURL);
      }
      a.innerHTML = item.name;
      li.appendChild(a);
    }
  }
}
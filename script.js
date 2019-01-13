loadPage = function(jsonURL) {
  let main = document.getElementById('main');
  // clear "main"
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }


  let request = new XMLHttpRequest();
  request.responseType = 'json';
  request.onload = function() {
    if (request.response != null) {
      loadArticles(request.response.articlesURL);
    } else {
      // console.log(jsonURL, "inexistant");
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

    this.links = [];
    // console.log(this.items);
    this.show();
    this.links[0].onclick();
    // loadPage(this.items[0].jsonURL);

  }

  show() {
    let parentDOM = document.getElementById('nav');
    let ul = document.createElement('ul');
    parentDOM.appendChild(ul);
    for (let item of this.items) {
      // console.log(item);
      let li = document.createElement('li');
      ul.appendChild(li);
      let a = document.createElement('a');
      // a.setAttribute('href', '#');
      a.onclick = function() {
        loadPage(item.jsonURL);
        for (let item of document.getElementsByClassName('selected')) {
          item.setAttribute("class", "");
        }
        li.setAttribute("class", "selected");
      }
      a.innerHTML = item.name;
      this.links.push(a);
      li.appendChild(a);
    }
  }
}
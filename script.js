//////////////////////////////////////////////////////////////////////////////

class PageContent {
  constructor(jsonURL, parent_) {
    this.parent = parent_;
    this.articlesURL = [];
    this.articles = [];
    this.dom = document.getElementById('main');
    // clear "main"
    while (this.dom.firstChild) {
      this.dom.removeChild(this.dom.firstChild);
    }

    let thiz = this;
    // Load jsonURL content
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.onload = function() {
      if (request.response != null) {
        thiz.articlesURL = request.response.articlesURL;
        // while (thiz.loadArticle()) {}
        thiz.parent.addArticle();
      } else {
        console.log(jsonURL, " inexistant !");
      }
    }
    request.open('GET', jsonURL);
    request.send();
  }

  loadArticle() {
    let loadedCount = this.articles.length;
    let totalCount = this.articlesURL.length;

    if (loadedCount < totalCount) {
      this.articles.push(new Article(this.articlesURL[loadedCount], this));
      return true;
    } else {
      return false;
    }
  }
}

///////////////////////////////////////////////////////////////////////////////

class Menu {
  constructor(jsonMenuURL, parent_) {
    this.parent = parent_;
    this.items = null;
    this.links = [];

    let thiz = this;
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.onload = function() {
      if (request.response != null) {
        thiz.items = request.response.items;
        thiz.show();
        thiz.links[0].onclick();
      }
    }
    request.open('GET', jsonMenuURL);
    request.send();
  }

  show() {
    let thiz = this;
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
        thiz.parent.loadPageContent(item.jsonURL);
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

///////////////////////////////////////////////////////////////////////////////

class PageStructure {
  constructor(jsonMenuURL) {
    this.menu = new Menu(jsonMenuURL, this);
    this.currentPageContent = null;
    this.footer = document.getElementById("footer");

    this.prevPageYOffset = 0;
    this.bottomCount = 0;
    let thiz = this;
    //
    // document.addEventListener("mousedown", function(e) {
    //   e.preventDefault();
    //   console.log(e);
    //   thiz.addArticle();
    // });

    document.onwheel = function(e) {
      thiz.handle_onwheel(e);
    }

    document.onscroll = function(e) {
      thiz.handle_onwheel(e);
    }
    document.addEventListener("touchmove", function(e) {
      thiz.handle_touchmove(e)
    })

  }

  loadPageContent(jsonURL) {
    this.currentPageContent = new PageContent(jsonURL, this);
  }

  addArticle() {
    let bool = true;
    if (bool && (window.pageYOffset + window.innerHeight > this.footer.offsetTop)) {
      bool = this.currentPageContent.loadArticle();
    }
  }

  handle_touchmove(e) {
    // this.addArticle();
  }

  handle_onwheel(e) {
    this.addArticle();
    //
    // // console.log(this.bottomCount);
    // if (e.deltaY > 0) {
    //   // console.log("descente");
    //   if (window.pageYOffset == this.prevPageYOffset) {
    //     // console.log("haha");
    //     this.bottomCount += 1;
    //     if (this.bottomCount > 30) {
    //       this.addArticle();
    //       this.bottomCount = 0;
    //     }
    //   }
    // } else {
    //   // console.log("montee");
    //   this.bottomCount = 0;
    // }
    // this.prevPageYOffset = window.pageYOffset;
  }
}


let pageStructure = new PageStructure("menu.json");
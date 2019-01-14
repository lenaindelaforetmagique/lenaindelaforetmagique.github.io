loadArticles = function(articlesURL) {
  let main = document.getElementById('main');

  for (let url of articlesURL) {
    loadArticle(url, main);
  }
}

loadArticle = function(url, parentDOM) {
  let dom = document.createElement('article');
  parentDOM.appendChild(dom);

  let requ = new XMLHttpRequest();
  requ.responseType = "json";
  requ.onload = function() {
    if (requ.response != null) {
      let article = new Article(requ.response, dom);
      article.show();
    } else {
      dom.innerHTML = "<p class=\"error\">L'article <em>" + url + "</em> n'a pas pu être chargé correctement...</p>";

    }
  };
  requ.open('GET', url);
  requ.send();
}



class Article {
  constructor(data, dom_) {
    this.dom = dom_;
    this.title = data.title;
    this.date = data.date;
    this.author = data.author;
    this.URL = data.URL;
    this.imgURL = data.imgURL;
    this.introduction = data.introduction;
    this.content = data.content;
    // Structure of longDescription
    // for (let par of this.longDescription) {
    //   console.log(par.title);
    //   for (let line of par.lines) {
    //     console.log("*" + line);
    //   }
    // }
  }

  show() {
    let h2 = document.createElement('h2');
    h2.innerHTML = this.title;
    this.dom.appendChild(h2);

    let date = document.createElement("div");
    date.setAttribute("class", "date");
    date.innerHTML = this.date;
    this.dom.appendChild(date);

    if (this.imgURL != "") {
      let a_link = document.createElement('a');
      a_link.setAttribute('href', this.URL);
      a_link.setAttribute('target', 'blank');

      let img = document.createElement('img');
      img.setAttribute("src", this.imgURL);
      img.setAttribute("class", "vignette");
      a_link.appendChild(img);
      this.dom.appendChild(a_link);
    }
    let intro = document.createElement('p');
    intro.innerHTML = this.introduction;
    this.dom.appendChild(intro);

    for (let para of this.content) {
      if (para.title != "") {
        let h3 = document.createElement('h3');
        h3.innerHTML = para.title;
        this.dom.appendChild(h3);
      }

      for (let line of para.lines) {
        let domLine = document.createElement('p');
        domLine.innerHTML = line;
        this.dom.appendChild(domLine);
      }

    }
    // let author = document.createElement("p");
    // author.setAttribute("class", "author");
    // author.innerHTML = this.author;
    // this.dom.appendChild(author);

  }
}
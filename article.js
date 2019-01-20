class Article {
  constructor(jsonURL, parent) {
    this.dom = document.createElement('article');
    parent.dom.appendChild(this.dom);
    this.parent = parent;
    this.title = "";
    this.date = "";
    this.author = "";
    this.URL = "";
    this.imgURL = "";
    this.introduction = "";
    this.content = "";

    let thiz = this;
    let requ = new XMLHttpRequest();
    requ.responseType = "json";
    requ.onload = function() {
      if (requ.response != null) {
        thiz.title = requ.response.title;
        thiz.date = requ.response.date;
        thiz.author = requ.response.author;
        thiz.URL = requ.response.URL;
        thiz.imgURL = requ.response.imgURL;
        thiz.introduction = requ.response.introduction;
        thiz.content = requ.response.content;
        thiz.show();
        thiz.parent.parent.addArticle();
      } else {
        this.dom.innerHTML = "<p class=\"error\">L'article <em>" + url + "</em> n'a pas pu être chargé correctement...</p>";
      }
    };
    requ.open('GET', jsonURL);
    requ.send();
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
      let p_ = document.createElement('p');
      let a_link = document.createElement('a');
      a_link.setAttribute('href', this.URL);
      a_link.setAttribute('target', 'blank');

      let img = document.createElement('img');
      img.setAttribute("src", this.imgURL);
      img.setAttribute("class", "vignette");
      a_link.appendChild(img);
      p_.appendChild(a_link);
      this.dom.appendChild(p_);
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
        if (typeof line == "string") {
          domLine.innerHTML = line;
        } else if (line.type == "List") {
          let ul = document.createElement('ul');
          ul.setAttribute("class", line.style);
          domLine.appendChild(ul);
          for (let item of line.items) {
            let li = document.createElement('li');
            li.innerHTML = item;
            ul.appendChild(li);
          }
        }
        this.dom.appendChild(domLine);
      }

    }
    // let author = document.createElement("p");
    // author.setAttribute("class", "author");
    // author.innerHTML = this.author;
    // this.dom.appendChild(author);

  }
}
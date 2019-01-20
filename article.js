class Article {
  constructor(jsonURL, parentDOM) {
    this.dom = document.createElement('article');
    parentDOM.appendChild(this.dom);

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
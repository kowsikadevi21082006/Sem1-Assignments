class Blog {
    constuctor(title, detail){
       this.title = title;
       this.detail = detail;
    }

    addTitle() {
      let title_card = document.createElement('h1');
      title_card.setAttribute("id","blog-title");
      document.getElementById('card-text').appendChild(title_card);
      title_card.innerHTML += this.title;
    }

    addDescription(){
      let description_card = document.createElement('p');
      description_card.setAttribute("id", "blog-description");
      document.getElementById("card-text").appendChild(description_card);
      description_card.innerHTML += this.detail;
    }   
}
let toggle;
function helperAddPost() {
  if (toggle == 1) {
    document.getElementById('popupContact').style.display = 'inline';
    return (toggle = 0);
  } else {
      document.getElementById('popupContact').style.display = 'none';
      return (toggle = 1);
  }
}

function helperPost(){
  let title = document.getElementById('title').value;
  let detail = document.getElementById('detail').value;
  let blog = new Blog (title, detail);

  blog.addTitle();
  blog.addDescription();
}


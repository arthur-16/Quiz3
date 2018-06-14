let createButton;
let mainContainer;
let cardsContainer;
let renderedMovie = [];

let progressMessage = document.createElement("p");
document.addEventListener("DOMContentLoaded", () => {
  createButton = document.getElementById("createButton");
  mainContainer = document.getElementById("mainContainer");
  cardsContainer = document.getElementById("cardsContainer");
  progressMessage.classList = "text-center progress-message";
  document.body.appendChild(progressMessage);

  progress(false);

  getPeople();
});

let peopleCollection;
let retries = 0;

function progress(show, message = "Working...") {
  if (!show) {
    progressMessage.style.display = "none";
    progressMessage.innerText = "";
  } else {
    progressMessage.style.display = "block";
    progressMessage.innerText = message;
  }
}

function getPeople() {
  progress(true);

  api
    .all()
    .then(people => {
      peopleCollection = people;
      createButton.addEventListener("click", createPerson);
      progress(true, "READY");
    })
    .catch(err => {
      if (retries < 1) {
        retries++;
        getPeople();
        return;
      }

      let ticks = 5;

      setInterval(() => {
        progress(
          true,
          `Something went wrong, refreshing the page in ${--ticks} seconds`
        );
      }, 1000);

      setTimeout(() => {
        location.reload(true);
      }, 5000);
    });
}

function createPerson() {
  if (renderedMovie.length === 0) {
    progress(false);
  }

  let rand = Math.floor(Math.random() * peopleCollection.length);
  let movie = peopleCollection[rand];

  let movieID = movie.title;

  let found = renderedMovie.find(movie => {
    return movie.title === movieID;
  });

  if (found !== undefined) {
    createPerson();
    return;
  }

  renderedMovie.push(new Movie(movie));
}

removeCard() {
    $('.btn btn-warning').click(function(){
        let val = $(this).closest('div.card').find(".name").text();
        console.log(val);
        let index = arr.findIndex(function(item) {return item.name == val});
        console.log(index);
        arr.splice(index, 1);
        console.log(arr);
    })};
// function removeCard() {
//    console.log('removing')
// };

let template;

class Movie {
  constructor({ title, poster, director }) {
    this.title = title;
    this.poster = poster;
    this.director = director;
    this.render();
  }

  removeCard() {
    // $('.btn btn-warning').click(function(){
    //     let val = $(this).closest('div.card').find(".name").text();
    //     console.log(val);
    //     let index = arr.findIndex(function(item) {return item.name == val})
    //     console.log(index)
    //     arr.splice(index, 1)
    //     console.log(arr);
    // })};
  }

  render() {
    let template = `<div id="cards" class="card" style="width: 18rem;">
  <img class="card-img-top" src="${this.poster}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${this.title}</h5>
    <p class="card-text">${this.director}</p>
    <button type="button" onclick="removeCard()" class="btn btn-warning">Removal</button>
  </div>
</div>`;

    cardsContainer.innerHTML += template;
  }
}

let api = (() => {
  let data = [
    {
      title: "lost in translation",
      poster:
        "https://i.pinimg.com/originals/8b/04/11/8b0411f37c3a635d9321d7052439024c.jpg",
      director: "sophia coppola"
    },
    {
      title: "inherent vice",
      poster: "http://www.impawards.com/2014/posters/inherent_vice.jpg",
      director: "paul thomas anderson"
    },
    {
      title: "ex machina",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
      director: "alex garland"
    }
  ];


let newButton = document.getElementById("newButton")


  let create = newButton.addEventListener("click", () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let randNum = Math.floor(Math.random() * 2);

        if (randNum % 2 === 0) {
          resolve(new Movie);
        } else {
          reject(new Error("Code 500: Internal Service Error"));
        }
      }, 2000);
    });
  });

  let all = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let rand = 2;

        if (rand % 2 === 0) {
          resolve(data);
        } else {
          reject(new Error("Code 500: Internal Server Error"));
        }
      }, 1000);
    });
  };

  return { all, create };
})();

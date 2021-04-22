/* NAVIGATION  */
$(document).ready(function () {
    $(".cont-wrapp").load('./views/home.html')
    loadView("./views/home.html", "home");
})

$('#post-btn-nav').click(ev => {
    let view = ev.target.dataset.view;
    let url = "./views/newPost.html"
    $(".cont-wrapp").load('./views/newPost.html')
    loadView(url,view)
})

$('.dropdown-menu a.new-view').click(event => {
    event.preventDefault()
    let view = event.target.dataset.view
    if (view) {
        let url = `./views/${view}.html`
        //$(".cont-wrapp").load(url, view)
        loadView(url,view)
    } else {
        alert('La opcion se encuentra deshabilitada...');
    }
})


$(".dropdown-menu #change-user-nav").click(() => {
  $("#myModal").modal("toggle");
});

const loadView = (url, view) => {
  $(".cont-wrapp").load(url, () => {
    console.log(view);
    switch (view) {
      case "home":
        printAllPost(getPosts());

        break;

      case "newPost":
        //getPets()
        break;

      case "viewPost":
        //alert("cargando users")
        break;

      default:
        //alert("cargando home")
        break;
    }
  });
};

/* GENERAL METHODS */

const setUser = () => {
  let inputGroup = $('#form-users input[type="text"]');
  let idUser = Date.now();
  let config = { day: "numeric", year: "numeric", month: "long" };
  let today = new Date();
  let joined = today.toLocaleDateString("en-US", config);

  let newUser = {
    idUser,
    joined,
  };
  $.each(inputGroup, (idx, currentInput) => {
    newUser = {
      ...newUser,
      [currentInput.name]: currentInput.value,
    };
  });

  postUsers(newUser);

  $.each(inputGroup, (idx, currentInput) => {
    currentInput.value = "";
  });
};

const printUserInfo = (users) => {
  let groupSelect = $("#users-selector");
  let groupText = $("#users-item-wrapper");
  groupSelect.children().remove();
  let options,
    idx = 0,
    text;
  for (key in users) {
    if (idx == 0) {
      option = `
                <option value=${users[key].idUser} selected>${users[key].nickname}</option>
                `;
      text = `
                <p class="p-0 m-0 font-weight-bold ">${users[key].fullName}</p>
                <p class="p-0 m-0"><small>@${users[key].nickname}</small></p>
            `;
      $("#user-dropdown-pic").attr("src", users[key].avatarUrl);

      $("#user-dropdown-pic").attr("src", users[key].avatarUrl);
    } else {
      option = `
                <option value=${users[key].idUser}>${users[key].nickname}</option>
                `;
    }
    idx++;
    groupSelect.append(option);
  }
  groupText.append(text);
};

printUserInfo(getUsers());

const filteredUserById = (users, idUser) => {
  let filteredUser;
  for (key in users) {
    if (users[key].idUser == idUser) {
      filteredUser = users[key];
    }
  }
  return filteredUser;
};

$("#users-selector").change((ev) => {
  let selectedOwnerData = filteredUserById(getUsers(), ev.target.value);
  $("#user-dropdown-pic").attr("src", selectedOwnerData.avatarUrl);
  $("#users-item-wrapper").children().remove();
  let newText = `
            <p class="p-0 m-0 font-weight-bold ">${selectedOwnerData.fullName}</p>
            <p class="p-0 m-0"><small>@${selectedOwnerData.nickname}</small></p>
        `;
  $("#users-item-wrapper").append(newText);
});

const setPost = () => { 
    let idUser = $('#users-selector option:selected').val();
    let idPost = Date.now();
    let config = { day: 'numeric', year: 'numeric', month: 'long' };
    let today = new Date();
    let createdDate = today.toLocaleDateString("en-US", config);
    let createdTime = `${today.getHours()}:${today.getMinutes()<=9 ? '0' + today.getMinutes(): today.getMinutes()}`;

    let newPost = {
        idPost,
        idUser,
        createdDate,
        createdTime
    }

    let inputGroup = $('#form-new-post input[type="text"]')
    $.each(inputGroup, (idx,currentIn)=>{
        newPost = {
            ...newPost,
            [currentIn.name]: currentIn.value
        }
    });

    let tagsArr = newPost.tags.replace(/,/gi,'').split(' ');
    tagsArr.splice(tagsArr.length-1,1);
    
    newPost.tags = tagsArr;
    
    savePost(newPost);

    $.each(inputGroup, (idx,currentIn)=>{
        currentIn.value = ""
    });

}

/* EVENT HANDLERS */
$(".cont-wrapp").on("click", "#set-user", () => {
    //console.log( " agregando usuario ")
    setUser()
})
$(".cont-wrapp").on('click','#save-new-post', ()=> {
    setPost()
})

/* Jaimes */

/* Juan de Dios */

/* Mary */
const printAllPost = (postCollection) => {
  var cardWrapper = $("#card-wrapper");
  cardWrapper.empty();

  Object.keys(postCollection).forEach((post) => {
    let {
      idPost,
      postTitle,
      tags,
      imgPost,
      contentPost,
      createdDate,
      createdTime,
      idUser,
    } = postCollection[post];

    var tagsAnc = tags.reduce((accum, tag) => {
      return accum + `<a href = "#" > <span>#</span>${tag}</a>`;
    }, "");
    var user = filteredUserById(getUsers(), idUser);

    var cardHtml = `<article class="card mb-3" id="post${post}" data-postkey="${post}">
        <img src="${imgPost}" class="card-img-top" alt="...">
        <div class="card-body">
          <div class="autor">
            <img class="rounded-circle border border-secondary ico-profile" src="${user.avatarUrl}" />
            <div class="autor-name">
              <div>${user.fullName}</div>
              <div>${user.joined}</div>
            </div>
          </div>
          <div>
            <h2 class="card-title feature">
              <a href="#">${postTitle}</a>
            </h2>
          </div>
          <div class="tags">${tagsAnc}
    </div>
          <div class="reacts">
            <div class="react-left">
              <a href="#">
                <img src="images/single/reaction-heart.svg" />
                <span> 10 </span><span class="react-text"> &nbsp;reactions</span>
              </a>
              <a href="#">
                <img src="images/single/comentario.svg" />
                <span> 2 </span><span class="react-text"> &nbsp;comments</span>
              </a>
            </div>
            <div class="react-right">
              <span>4 min read</span>
              <button>Save</button>

            </div>
          </div>
        </div>
      </article>`;

    cardWrapper.append(cardHtml);
    $("article:not(:first-of-type) .card-img-top").remove();
    console.log();
    $(".cont-wrapp").on("click", `#post${post}`, (event) => {
      //console.log($(event.target).data("postkey"));
      //console.log($(`#post${post}`).attr("data-postkey")); //.event.target.data("postkey");
      loadView(`./views/viewPost.html?postkey=${post}`, "viewPost");
    });
  });
};

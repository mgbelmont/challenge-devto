/* NAVIGATION  */
$(document).ready(function () {
  $(".cont-wrapp").load('./views/home.html');
  $('#filter-regex input[type="text"]').val('');
  loadView("./views/home.html", "home");
})

$('#post-btn-nav').click(ev => {
  let view = ev.target.dataset.view;
  let url = "./views/newPost.html"
  $(".cont-wrapp").load('./views/newPost.html');
  $('#filter-regex input[type="text"]').val('');
  loadView(url, view)
})

$('.dropdown-menu a.new-view').click(event => {
  event.preventDefault()
  let view = event.target.dataset.view
  if (view) {
    let url = `./views/${view}.html`
    //$(".cont-wrapp").load(url, view)
    $('#filter-regex input[type="text"]').val('');
    loadView(url, view)
  } else {
    alert('La opcion se encuentra deshabilitada...');
  }
})

$('#nav-home').click(ev => {
  let view = ev.target.dataset.view;
  let url = `./views/${view}.html`
  //$(".cont-wrapp").load('./views/newPost.html')
  $('#filter-regex input[type="text"]').val('');
  loadView(url, view)
})


$(".dropdown-menu #change-user-nav").click(() => {
  $("#myModal").modal("toggle");
});

const loadView = (url, view) => {
  $(".cont-wrapp").load(url, () => {
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

      case "filteredView":

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
  $("#replies-pic").attr("src", selectedOwnerData.avatarUrl);
});

const setPost = () => {
  let idUser = $('#users-selector option:selected').val();
  let idPost = Date.now();
  let config = { day: 'numeric', year: 'numeric', month: 'long' };
  let today = new Date();
  let createdDate = today.toLocaleDateString("en-US", config);
  let createdTime = `${today.getHours()}:${today.getMinutes() <= 9 ? '0' + today.getMinutes() : today.getMinutes()}`;

  let newPost = {
    idPost,
    idUser,
    createdDate,
    createdTime
  }

  let inputGroup = $('#form-new-post input[type="text"]')
  $.each(inputGroup, (idx, currentIn) => {
    newPost = {
      ...newPost,
      [currentIn.name]: currentIn.value
    }
  });

  let tagsArr = newPost.tags.replace(/,/gi, '').split(' ');
  tagsArr.splice(tagsArr.length - 1, 1);

  newPost.tags = tagsArr;

  savePost(newPost);

  $.each(inputGroup, (idx, currentIn) => {
    currentIn.value = ""
  });

}

const filteredCardsByTitle = regex => {
  let patternFilter = new RegExp(regex, "gi");
  let newTitles = getPosts();
  let filteredPosts = [], keyFiltered;
  for (key in newTitles) {
    if (newTitles[key].postTitle.match(patternFilter)) {
      newTitles[key] = {
        ...newTitles[key],
        key
      }
      filteredPosts.push(newTitles[key])
    }
  }

  return filteredPosts;
}


const printFilteredPost = post => {
  let cardsWrapper = $('#cards-wrapper');

  post.forEach(post => {
    let tagsAnc = post.tags.reduce((accum, tag) => {
      return accum + `<a href = "#" > <span>#</span>${tag}</a>`;
    }, "");
    let user = filteredUserById(getUsers(), post.idUser);

    let cardHtml = `<article class="card mb-3 nav-view-post" data-postkey=${post.key} >
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
              <a href="#">${post.postTitle}</a>
            </h2>
          </div>
          <div class="tags tags-color">${tagsAnc}
    </div>
          <div class="reacts">
            <div class="react-left">
              <a href="#">
                <img src="images/single/reaction-heart.svg" />
                <span> 10 </span><span class="react-text"> &nbsp;reactions</span>
              </a>
              <a href="#">
                <img src="images/single/comentario.svg" class="/>
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

    cardsWrapper.append(cardHtml);

  })
}


const getFilteredReplies = replies => {
  let idPost = $('#post-article').data('idpost');
  let arrReplies = []
  for (key in replies) {
    if(replies[key].idPost == idPost){
      arrReplies.push(replies[key])
    }
  }

  console.log(arrReplies)
  return arrReplies;
}

const printViewPost = post => {
  let accumTags = "";
  let postOwner = filteredUserById(getUsers(), post.idUser);
  let selectedUser = $("#users-selector").val();
  let currentUserInfo = filteredUserById(getUsers(), selectedUser);
  //console.log(postOwner)
  post.tags.forEach(tag => {
    accumTags += `<a href="#" class="mr-1"><span>#</span>${tag}</a>`
  })
  let articleContent =
    `
   <article class="card mb-3 mt-3" id="post-article" data-idpost=${post.idPost}>
   <img src=${post.imgPost} class="card-img-top" alt="img">
   <div class="card-body p-2">
     <div>
       <h1 class="card-title feature">
         <a href="">${post.postTitle}</a>
       </h1>
     </div>

     <div class="tags" d-inline-flex>
      ${accumTags}
     </div>
     
     <div class="autor">
       <img class="rounded-circle border border-secondary ico-profile"
         src=${postOwner.avatarUrl} />
       <div class="autor-name">
         <div>${postOwner.fullName}</div>
         <div>
           <time datetime="2021-03-01T14:40:00Z" class="date-no-year"
             title="${post.createdDate} - ${post.createdTime}">${post.createdDate}</time>

           <em>
             Originally published at
             <a href="#" style="color:#1395b8">${postOwner.nickname}</a>
           </em>

           <span class="mr-4">・7 min read</span>
         </div>
       </div>
     </div>
     <div class="article-content">
       <p class="mt-2">${post.contentPost}</p>
     </div>

   </div>
 </article>
   `;


  let discussionContent =
    `
   <article class="card p-4 mb-3 w-100">
        <div class="d-flex flex-column ">
        <div class="d-flex flex-row justify-content-between mb-4">
          <h2 class="font-weight-bold m-0 my-auto">Discussion (0)</h2>
          <button class="btn btn-outline-secondary rounded">Suscribe</button>
        </div>
        <div class="w-100 d-flex flex-row mb-3">
          <div class="">
            <img src=${currentUserInfo.avatarUrl} alt="profile-pic" class="rounded-circle mr-2" style="height: 32px;width: 32px;" id="replies-pic">
          </div>
          <input id="reply-input" type="text" placeholder="Add to the discussion" class="w-75 rounded"></input>
          </div>
          <div class="d-flex">
            <button type="button" class="btn bg-blue-boton text-white mt-2 mr-3" id="reply-comment">Comentar</button> 
          </div>

          <div id="wrapper-replies" class="mt-2">
          </div>
        <div class="code-conduct d-flex justify-content-center">
          <a href="#" ">Code of conduct</a>
          <span role="presentation">•</span>
          <a href="#" ">Report abuse</a>
        </div>
      </div>
      </article>
   `;

  let articleReadNext =
  `
  <article class="card mb-3 w-100">
        <div class="card-body">
          <h2 class="card-title pl-4">Read next</h2>
          <div class="list-next pl-4">
            <a href="#">

              <div class="next-article d-flex align-items-center">

                <img class="ico-profile rounded-circle border border-secondary" loading="lazy"
                  alt="kauresss profile image" src="images/single/user6.webp" />

                <div class="d-flex flex-column justify-content-center ">
                  <h4>Getting paid less to do the same work on Upwork</h4>
                  <p>
                    Kauress - <time datetime="2021-03-06T00:21:07Z">Mar 6</time>
                  </p>
                </div>
              </div>

            </a>
            <a href="#">
              <div class="next-article d-flex align-items-center">
                <span>
                  <img class="ico-profile rounded-circle border border-secondary" loading="lazy"
                    alt="bekbrace profile image" src="images/single/user7.webp" />
                </span>
                <div class="d-flex flex-column justify-content-center">
                  <h4>Stripe for online payments</h4>
                  <p>
                    Bek Brace - <time datetime="2021-03-05T17:46:15Z">Mar 5</time>
                  </p>
                </div>
              </div>
            </a>
            <a href="#">
              <div class="next-article d-flex align-items-center">

                <img class="ico-profile rounded-circle border border-secondary" loading="lazy"
                  alt="jackssonandrey profile image" src="images/single/user8.webp" />

                <div class="d-flex flex-column justify-content-center">
                  <h4>Usando Docker e docker-composer no dia a dia</h4>
                  <p>
                    Andrey Araújo - <time datetime="2021-03-05T22:40:24Z">Mar 5</time>
                  </p>
                </div>
              </div>
            </a>
            <a href="#">
              <div class="next-article d-flex align-items-center ">

                <img class="ico-profile rounded-circle border border-secondary" loading="lazy"
                  alt="ilizette profile image" class="crayons-avatar__image" src="images/single/user9.webp" />

                <div class="d-flex flex-column justify-content-center">
                  <h4>Understanding useReducer in react</h4>
                  <p>
                    Elizabeth - <time datetime="2021-03-05T19:14:27Z">Mar 5</time>
                  </p>
                </div>
              </div>
            </a>

          </div>
        </div>
  </article>
  `


  $('#post-article-wrapper').append(articleContent);
  $('#post-article-wrapper').append(discussionContent);
  $('#post-article-wrapper').append(articleReadNext);



  let userCardInfo = 
  `
  <div class="card bg-white1">
      <h5 class="card-header profile p-3"></h5>
      <div class="card-body">
        <div>
          <img class="rounded-circle ico-profile2" src=${postOwner.avatarUrl}>
          <span class="text-center font-weight-bold text-profile">${postOwner.fullName}</span>

        </div>

        <p class="card-text">${postOwner.description}</p>
        <a href="#" class="btn btn-blue btn-lg btn-block">Follow</a>
        <div class="pt-2">
          <span class=" card-title-sec">WORK</span><br />
          ${postOwner.work}
        </div>
        <div class="pt-2">
          <span class=" card-title-sec">LOCATION</span><br />
          ${postOwner.location}
        </div>
        <div class="pt-2">
          <span class=" card-title-sec">JOINED</span><br />
          ${postOwner.joined}
        </div>

      </div>
    </div>
  `
  $('#owner-card-info').prepend(userCardInfo)

  let accumReplies = "";
  let currentUserReply;
  let replies = getFilteredReplies(getReplies())
  replies.forEach(reply => {
    currentUserReply=filteredUserById(getUsers(),reply.idUser)
    accumReplies += 
    `
    <div class="d-flex flex-column" data-idreply=${reply.idReply}>
      <div class="w-100 d-flex flex-row mb-3">
        <div class="">
          <img src="${currentUserReply.avatarUrl}" alt="profile-pic" class="rounded-circle mr-2" style="height: 32px;width: 32px;">
        </div>
        <div class="w-75 border rounded">
        <p>
          ${reply.nickname} • ${reply.createdDate}
        </p>
        <p>${reply.contentReply}</p>
        </div>
      </div>
  </div>
    `
  })

  $('#wrapper-replies').append(accumReplies);

}


const setReply = () => {
    let idUser = $('#users-selector option:selected').val();
    let idReply = Date.now();
    let config = { day: 'numeric', year: 'numeric', month: 'long' };
    let today = new Date();
    let createdDate = today.toLocaleDateString("en-US", config);
    let createdTime = `${today.getHours()}:${today.getMinutes() <= 9 ? '0' + today.getMinutes() : today.getMinutes()}`;
    let idPost = $('#post-article').data('idpost');
    let contentReply = $('#reply-input').val()
    let newReply = {
      idUser,
      idReply,
      idPost,
      createdDate,
      createdTime,
      contentReply
    }
    let userFiltered = filteredUserById(getUsers(), idUser)
    newReply = {
      ...newReply,
      nickname: userFiltered.nickname
    }
    saveReply(newReply)
    contentReply = $('#reply-input').val('')
}

$('#filter-regex input[type="text"]').keypress(ev => {
  let keycode = (ev.keyCode ? ev.keyCode : ev.which);
  let regexFilter;
  if (keycode == '13') {
    ev.preventDefault()
    regexFilter = ev.target.value;
    $('.cont-wrapp').children().remove();
    $('.cont-wrapp').load('./views/filteredView.html', () => {
      let filteredCards = filteredCardsByTitle(regexFilter)
      printFilteredPost(filteredCards)
    })
  }
})

/* EVENT HANDLERS */
$(".cont-wrapp").on("click", "#set-user", () => {
  //console.log( " agregando usuario ")
  setUser()
})
$(".cont-wrapp").on('click', '#save-new-post', () => {
  setPost()
})

$(".cont-wrapp").on('click', '.nav-view-post', ev => {
  //console.log(ev.currentTarget.dataset.postkey)
  let key = ev.currentTarget.dataset.postkey;
  let viewPostContent = getPostByKey(key);
  $(".cont-wrapp").load('./views/viewPost.html', () => {
    //$('#post-article-wrapper').children().remove();
    printViewPost(viewPostContent)
  });
})

$(".cont-wrapp").on('click', '#reply-comment', ev => {
  setReply()
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

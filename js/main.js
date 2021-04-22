/* NAVIGATION  */
$(document).ready(function () {
    $(".cont-wrapp").load('./views/home.html')
})

$('#post-btn-nav').click(ev => {
    let view = ev.target.dataset.view;
    let url = "./views/newPost.html"
    $(".cont-wrapp").load('./views/newPost.html')
})

$('.dropdown-menu a.new-view').click(event => {
    event.preventDefault()
    let view = event.target.dataset.view
    if (view) {
        let url = `./views/${view}.html`
        $(".cont-wrapp").load(url, view)
    } else {
        alert('La opcion se encuentra deshabilitada...');
    }
})

$('.dropdown-menu #change-user-nav').click(() => {
    $('#myModal').modal('toggle')
})


const loadView = (url, view) => {
    $('.content-wrapper').load(url, () => {
        console.log(view)
        switch (view) {
            case "home":
                //alert("cargando home")
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
    })
}

/* HTTP METHODS USERS  */
const getUsers = () => {
    let usersCollection;
    $.ajax({
        method: "GET",
        url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamb/users.json",
        success: (response) => {
            usersCollection = response;
        },
        error: (error) => {
            console.log(error);
        },
        async: false,
    });
    return usersCollection;
};

const postUsers = newOwner => {
    $.ajax({
        method: "POST",
        url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamb/users.json",
        data: JSON.stringify(newOwner),
        success: (response) => {
            console.log(response);
        },
        error: (error) => {
            console.log(error);
        },
    });
};
const deleteUsers = key => {
    $.ajax({
        method: "DELETE",
        url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamb/users/${key}.json`,
        success: (response) => {
            console.log(response);
        },
        error: (error) => {
            console.log(error);
        },
    });
};

const putUsers = (key, data) => {
    $.ajax({
        method: "PUT",
        url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamb/users/${key}.json`,
        data: JSON.stringify(data),
        success: (response) => {
            console.log(response);
        },
        error: (error) => {
            console.log(error);
        },
    });
};

/* GENERAL METHODS */

const setUser = () => {
    let inputGroup = $('#form-users input[type="text"]');
    let idUser = Date.now();
    let config = { day: 'numeric', year: 'numeric', month: 'long' };
    let today = new Date();
    let joined = today.toLocaleDateString("en-US", config);

    let newUser = {
        idUser,
        joined,
    }
    $.each(inputGroup, (idx, currentInput) => {
        newUser = {
            ...newUser,
            [currentInput.name]: currentInput.value
        }
    })

    postUsers(newUser);


    $.each(inputGroup, (idx, currentInput) => {
        currentInput.value = '';
    })
}


const printUserInfo = users => {
    let groupSelect = $('#users-selector');
    let groupText = $('#users-item-wrapper');
    groupSelect.children().remove();
    let options, idx = 0, text;
    for (key in users) {
        console.log(users[key])
        if (idx == 0) {
            option =
                `
                <option value=${users[key].idUser} selected>${users[key].nickname}</option>
                `;
            text =
                `
                <p class="p-0 m-0 font-weight-bold ">${users[key].fullName}</p>
                <p class="p-0 m-0"><small>@${users[key].nickname}</small></p>
            `
            $('#user-dropdown-pic').attr('src', users[key].avatarUrl)

        } else {
            option =
                `
                <option value=${users[key].idUser}>${users[key].nickname}</option>
                `;

        }
        idx++;
        groupSelect.append(option);
    }
    groupText.append(text);
}

printUserInfo(getUsers())


const filteredUserById = (users, idUser) => {
    let filteredUser;
    for (key in users) {
        if (users[key].idUser == idUser) {
            filteredUser = users[key];
        }
    }
    return filteredUser
}


$('#users-selector').change(ev => {
    let selectedOwnerData = filteredUserById(getUsers(), ev.target.value);
    $('#user-dropdown-pic').attr('src', selectedOwnerData.avatarUrl);
    $('#users-item-wrapper').children().remove();
    let newText =
        `
            <p class="p-0 m-0 font-weight-bold ">${selectedOwnerData.fullName}</p>
            <p class="p-0 m-0"><small>@${selectedOwnerData.nickname}</small></p>
        `;
    $('#users-item-wrapper').append(newText)
})

/* EVENT HANDLERS */
$(".cont-wrapp").on("click", "#set-user", () => {
    //console.log( " agregando usuario ")
    setUser()
})



/* Jaimes */

/* Juan de Dios */

/* Mary */
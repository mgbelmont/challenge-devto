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

const postUsers = (newOwner) => {
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
const deleteUsers = (key) => {
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

/* HTTP METHODS POST*/
const getPosts = () => {
  let usersCollection;
  $.ajax({
    method: "GET",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamb/posts.json",
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

const getPostByKey = key => {
  let usersCollection;
  $.ajax({
    method: "GET",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamb/posts/${key}.json`,
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


const savePost = newOwner => {
  $.ajax({
    method: "POST",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamb/posts.json",
    data: JSON.stringify(newOwner),
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

const deletePost = key => {
  $.ajax({
    method: "DELETE",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamb/posts/${key}.json`,
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

const putPost = (key, data) => {
  $.ajax({
    method: "PUT",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamb/posts/${key}.json`,
    data: JSON.stringify(data),
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

/*METHODS HTTP REPLIES */

const getReplies = () => {
  let repliesCollection;
  $.ajax({
    method: "GET",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamb/replies.json",
    success: (response) => {
      repliesCollection = response;
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
  return repliesCollection;
};

const saveReply = newReply => {
  $.ajax({
    method: "POST",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamb/replies.json",
    data: JSON.stringify(newReply),
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

const deleteReply = key => {
  $.ajax({
    method: "DELETE",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamb/replies/${key}.json`,
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

const putReply = (key, data) => {
  $.ajax({
    method: "PUT",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamb/replies/${key}.json`,
    data: JSON.stringify(data),
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

const saveReaction = (newReaction)=>{
  $.ajax({
    async:false,
    method: "POST",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamb/reactions.json`,
    data: JSON.stringify(newReaction),
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
}

const getReactions = () =>{
  let reactions;
  $.ajax({
    async:false,
    method: "GET",
    url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamb/reactions.json",
    success: (response) => {
      reactions = response;
    },
    error: (error) => {
      console.log(error);
    },
    
  });
  return reactions;
}

const deleteReactions = (key) =>{
  $.ajax({
    method: "DELETE",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamb/reactions/${key}.json`,
    success: (response) => {
      console.log(response);
    },
    error: (error) => {
      console.log(error);
    },
  });
}
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
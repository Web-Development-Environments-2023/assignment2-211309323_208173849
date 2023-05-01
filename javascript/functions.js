/** init player class */
var player = {
  firstname: "",
  lastName: "",
  username: "",
  password: "",
  email: "",
  birth: ""
};
var players = [];
/**init player with defaults values! */
var defaultPlayer = { 
firstname: "p",
lastName: "p",
username: "p",
password: "testuser",
email: "p@example.com",
birth: "1/1/1987"
};
players.push(defaultPlayer);

$(document).ready(function () {
  homePage();
});

/**what to show in the welcome page */
function homePage() {
  $("#homePage").show();
  $("#loginPage").hide();
  $("#registerPage").hide();
  $("#settingPage").hide();
  $("#canves").hide();
  $("#Game").hide();
  stopGame();
}
function clearFileds() {
  $("#checkUserName").val("");
  $("#checkUserPassword").val("");

}



/**what to show when the user click on register button */
function register() {
  $("#homePage").hide();
  $("#loginPage").hide();
  $("#registerPage").show();
  $("#startGame").hide();
  $("#canves").hide();
  stopGame();
}

/**what to show in the settings page */
function setting() {
  $("#homePage").hide();
  $("#loginPage").hide();
  $("#registerPage").hide();
  $("#startGame").show();
  $("#canves").hide();
}


/**what to show when the user click on login button */
function login() {
  $("#homePage").hide();
  $("#loginPage").show();
  $("#registerPage").hide();
  $("#startGame").hide();
 
  $("#Game").hide();
  stopGame();
}


$().ready(function () {
  $("#fromCommitted").validate();
  $("#signUpForm").validate({
    rules: {
      firstname: {
        required: true,
        checkName: true
      },
      lastname: {
        required: true,
        checkName: true
      },
      username: {
        required: true,
        minlength: 2
      },
      password: {
        required: true,
        minlength: 6,
        checkUserPassword: true
      },
      confirm_password: {
        required: true,
        minlength: 6,
        equalTo: "#password"
      },
      email: {
        required: true,
        email: true
      },
      birth: {
        required: true,
        checkDate: true
      }
    },
    messages: {
      firstname: {
        required: "Enter your First Name",
        checkName: "Your name should contain at least only letter"

      },
      lastname: {
        required: "Enter your Lirst Name",
        checkName: "Your name should contain at least only letter"
      },
      username: {
        required: "Enter your User Name",
        minlength: "Your username must contain of at least 2 characters"
      },
      password: {
        required: "Enter your password",
        minlength: "Your password must be at least 6 characters long",
        checkUserPassword: "For Security Reason password must contain at least one letter and one number"
      },
      confirm_password: {
        required: "Re-Enter your password",
        minlength: "Your password must be at least 6 characters long",
        equalTo: "the Please enter the same password as above"
      },
      birth: {
        required: "Enter your BirthDay",
        checkDate: "Enter a valid date"
      },
      email: "Enter a valid email address, must contain a @",
    },
    submitHandler: function (form, event) {
      var newUser = Object.create(player);
      newUser.firstName = $("#firstname").val();
      newUser.lastName = $("#lastname").val();
      newUser.username = $("#username").val();
      newUser.password = $("#password").val();
      newUser.email = $("#email").val();
      newUser.birth = $("#birth").val();
      players.push(newUser);
      alert(` User : ${newUser.username} created successfully`);
      document.getElementById("signUpForm").reset();
      login();
    }
  });
});


function loginButton() {
  var userCheck = document.getElementById("checkUserName").value;
  var passwordCheck = document.getElementById("checkUserPassword").value;
  for (var i = 0; i < players.length; i++) {
    if (players[i].username === userCheck) {
      if (players[i].password === passwordCheck) {
        player = players[i];
        clearFileds()
        setting();
        return;
      }
      else {
        alert("You Entered Wrong password. \n Please try again");
        clearFileds()
        return login();
      }
    }
  }
  alert("User does not exist, Please Register.");
  clearFileds()
}


jQuery.validator.addMethod("checkName", function (value, element) {
  return /^[^0-9]+$/.test(value);
}),
jQuery.validator.addMethod("checkUserPassword", function (value, element) {
  return /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(value) && /^[0-9a-zA-Z]+$/.test(value);
}),

  jQuery.validator.addMethod("checkDate", function (value, element) {
    return Date.now() - new Date(value).getTime() > 0;
  });

  $(document).keydown(function (e) {
    if (e.keyCode == 27) {
      $("#closeModel").click();
    }
  });
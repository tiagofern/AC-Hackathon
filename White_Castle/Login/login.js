
const emailInput = document.getElementById("typeEmailX");
const passwordInput = document.getElementById("typePasswordX");


const loginButton = document.querySelector("button");
loginButton.addEventListener("click", function() {

  const email = emailInput.value;
  const password = passwordInput.value;
  if (email === "whitecastle@wc.com" && password === "admin") {
    // redirect to the desired page
    window.location.href = "../HomePage/index.html";
  } else {
    // display an error message
    alert("Incorrect email or password");
  }
});
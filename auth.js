function signup(event) {
  event.preventDefault(); // stop page from refreshing

  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  // Save user data to localStorage
  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Signup successful! You can now login.");
  window.location.href = "login.html";
}

function login(event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    return;
  }

  if (username === storedUser.username && password === storedUser.password) {
    // Store logged-in status
    localStorage.setItem("loggedInUser", username);

    // Redirect to todo page
    window.location.href = "todo.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
}

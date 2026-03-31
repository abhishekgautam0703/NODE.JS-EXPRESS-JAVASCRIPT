async function signup() {
  const username = document.getElementById("username").value.trim();
  const role = document.getElementById("role").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const msg = document.getElementById("msg");

  if (!username || !role || !password || !confirmPassword) {
    msg.textContent = "All fields are required.";
    return;
  }

  if (password !== confirmPassword) {
    msg.textContent = "Passwords do not match.";
    return;
  }

  try {
    const token = sessionStorage.getItem("token"); // Admin token

    // ✅ Save fetch response in variable
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // <-- token is sent
      },
      body: JSON.stringify({ username, role, password })
    });

    const data = await response.json(); // now response exists

    if (response.ok) {
      msg.style.color = "lightgreen";
      msg.textContent = "Signup successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      msg.style.color = "red";
      msg.textContent = data.message || "Signup failed.";
    }
  } catch (err) {
    console.error(err);
    msg.style.color = "red";
    msg.textContent = "Error connecting to server.";
  }
}
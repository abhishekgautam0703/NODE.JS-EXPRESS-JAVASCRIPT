async function changepassword() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const msg = document.getElementById("msg");

    if (!username || !password || !confirmPassword) {
        msg.textContent = "All fields are required.";
        return;
    }

    if (password !== confirmPassword) {
        msg.textContent = "Passwords do not match.";
        return;
    }
    try {
        const response = await fetch("/api/forget/changepassword", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });


        const data = await response.json(); // now response exists

        if (response.ok) {
            msg.style.color = "lightgreen";
            msg.textContent = "Password update Redirecting...";
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        } else {
            msg.style.color = "red";
            msg.textContent = data.message || "Change password failed.";
        }
    }
           
    catch (err) {
        console.error(err);
        msg.style.color = "red";
        msg.textContent = "Error connecting to server.";
    }


}

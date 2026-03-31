async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
    console.log(data);
  if (res.ok) {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("role",data.role);
    

    window.location.href = "index.html";
  } else {
    document.getElementById("msg").innerText = data.message;
  }
}


const LoginBtn = document.getElementById("loginBtn");
LoginBtn.addEventListener("click", () => {
 login();
});

const Forpass=document.getElementById("forgetpasswdBtn");
Forpass.addEventListener("click",()=>{
  window.location.href = "/forgetpassword";

});


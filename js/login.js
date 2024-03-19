async function autenticar() {
    const login = document.getElementById("user").value;
    const senha = document.getElementById("password").value;
    fetch(`http://localhost:8080/login/autenticacao?login=${login}&senha=${senha}`)
        .then(
            (response) => {
                if (response.ok) {
                    window.location.replace("./pages/admin.html");
                }
                return Promise.reject(response)
            }
        ).catch((response) => {
            if (response.status == 401) {
                document.getElementById("login_error").style.visibility = "visible";
            } else {
                document.getElementById("login_error").style.visibility = "visible";
                document.getElementById("login_error").value = response;
            }

    });
}
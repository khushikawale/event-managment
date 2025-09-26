const facultyForm = document.getElementById('facultyLoginForm');
const facultyErrorMsg = document.getElementById('facultyErrorMessage');

facultyForm.addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('facultyUsername').value.trim();
    const password = document.getElementById('facultyPassword').value.trim();

    // Hardcoded credentials for demo
    if(username === "faculty" && password === "faculty123"){
        facultyErrorMsg.style.color = "green";
        facultyErrorMsg.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "faculty-dashboard.html"; // Redirect to Faculty Dashboard
        }, 1000);
    } else {
        facultyErrorMsg.style.color = "red";
        facultyErrorMsg.textContent = "Invalid username or password!";
    }
});

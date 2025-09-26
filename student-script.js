const studentForm = document.getElementById('studentLoginForm');
const studentErrorMsg = document.getElementById('studentErrorMessage');

studentForm.addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('studentUsername').value.trim();
    const password = document.getElementById('studentPassword').value.trim();

    // Hardcoded credentials for demo
    if(username === "student" && password === "student123"){
        studentErrorMsg.style.color = "green";
        studentErrorMsg.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "student-dashboard.html"; // Redirect to Student Dashboard
        }, 1000);
    } else {
        studentErrorMsg.style.color = "red";
        studentErrorMsg.textContent = "Invalid username or password!";
    }
});

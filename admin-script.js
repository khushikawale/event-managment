const adminForm = document.getElementById('adminLoginForm');
const errorMsg = document.getElementById('errorMessage');

adminForm.addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple hardcoded check (replace with database later)
    if(username === "admin" && password === "admin123"){
        errorMsg.style.color = "green";
        errorMsg.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "admin-dashboard.html"; // Redirect
        }, 1000);
    } else {
        errorMsg.style.color = "red";
        errorMsg.textContent = "Invalid username or password!";
    }
});

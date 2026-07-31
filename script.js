console.log("Portfolio loaded successfully!"); 

var button = document.getElementById("greetBtn");


button.addEventListener("click", () => {
    
    var userName = document.getElementById("name").value;
    
    if (userName === "") {
        alert("Please enter your name first!");
    } else {
        alert("Welcome to my page, " + userName + "!");
    }
});
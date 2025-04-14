window.onload = function() {
    console.log("Page loaded");
    var playerInfo = document.getElementById("playerInfo");
    var searchButton = document.getElementById("searchBtn");

searchButton.addEventListener("mouseover", function() {
    console.log("search button hovered"); 
    searchButton.style.cursor = "pointer";
});

searchButton.addEventListener("click", function() {
    event.preventDefault();
    console.log("search button clicked"); 
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", responseReceivedHandler);

    xhr.responseType = "";
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let age_val = document.getElementById("age_val").value;
    let war = document.getElementById("war").value;
    let war_val = document.getElementById("war_val").value;
    let hr = document.getElementById("hr").value;
    let hr_val = document.getElementById("hr_val").value;

    xhr.open("POST", "/search");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded" );
    xhr.send(`name=${name}&age=${age}&age_val=${age_val}&war=${war}&war_val=${war_val}&hr=${hr}&hr_val=${hr_val}`);
});

//OOOOO your code
function responseReceivedHandler() {
    //We received something that is healthy
    if (this.status === 200) {
        //Creating a new, empty div
        let newElement = document.createElement("div");
        //Adding the response to this new div
        newElement.innerHTML = this.response;
        //Appending the div to the subInfo tag
        playerInfo.prepend(newElement);
    } else {
        //Handling an unsuccessful database lookup
        playerInfo.innerHTML = "Query error";
    }
}
};
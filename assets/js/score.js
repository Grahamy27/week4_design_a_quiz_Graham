var scores=JSON.parse(localStorage.getItem("highScores")) || []
console.log(scores);
var ul= document.getElementById("score-list")

for (let i = 0; i < scores.length; i++) {
var li= document.createElement("li")
li.textContent='Initials:' + scores[i].initials + 'Score:' + scores[i].score
ul.append(li)
    
}

var initialsInput = document.querySelector("#initials");

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  
  // create user object from submission
  var user = {
    initials: initialsInput.value.trim(),
  };

  localStorage.setItem("user", JSON.stringify(user));
  });
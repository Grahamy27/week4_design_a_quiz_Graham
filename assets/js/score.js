var scores=JSON.parse(localStorage.getItem("highScores")) || []
console.log(scores);
var ul= document.getElementById("score-list")

for (let i = 0; i < scores.length; i++) {
var li= document.createElement("li")
li.textContent='Initials:' + scores[i].initials + 'Score:' + scores[i].score
ul.append(li)
    
}
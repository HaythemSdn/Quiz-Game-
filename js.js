let categoryBtn=document.querySelectorAll('.Categories span')
let categoryBtnArray=Array.from(categoryBtn)
let bollesDiv=document.querySelector('.bolles')
let Answers=document.querySelector('.Answers')
let SubmitBtn=document.querySelector('.Submit')
let Title=document.querySelector('.title')
let QuestionsContainer=document.querySelector('.Question-container')
let CorrectAnswers=0
let WrongAnswers=0
let DeletedDiv=document.querySelector('.deleted')
let result=document.querySelector('.result')
let categorySelected;

document.addEventListener('click',function(e){
    if (e.target.classList.contains('catName')){
      categoryBtnArray.forEach((btn)=>btn.classList.remove('selected'))
      e.target.classList.add('selected')
       categorySelected=e.target.textContent
       //start Game
       let start=document.querySelector('.Start')
       start.onclick=function(){
           let P1=document.querySelector('.categoryPage') 
           P1.remove()
       // fetch selected Category data
           fetch(`${categorySelected}.json`)
           .then((Response)=>Response.json())
           .then((questions)=>{
               let currentQuestion=0;
               let nmbrOfQuestions=questions.length
               document.querySelector('.count').innerHTML=nmbrOfQuestions 
               document.querySelector('.cat').innerHTML=categorySelected.toUpperCase()
                AddSpans() 
                addContent(currentQuestion)
                timer()
        // submit button processes
                    SubmitBtn.onclick=function(){
    
                    if (currentQuestion<nmbrOfQuestions){
                            let ArrayAnswers=Array.from(Answers.children)
                            let AnswerChecked
                            ArrayAnswers.forEach((answer)=>{
                                if (answer.children[0].checked){
                                    AnswerChecked= answer.children[1]
                                }
                            })
                            if (AnswerChecked.parentElement.classList.contains('RAnswer')){
                                CorrectAnswers+=1
                                AnswerChecked.parentElement.classList.add('correct')
                                AnswerChecked.style.color='white'
                                document.querySelector('.Succes').play()
                            }else{
                                WrongAnswers+=1
                                AnswerChecked.parentElement.classList.add('wrong')
                                AnswerChecked.style.color='white'
                                document.querySelector('.fail').play()
                
                            }
                    setTimeout(()=>{
                        // remove the last question
                        removeContent()
                        currentQuestion++
                        //move the bollets
                        let bollesDivArray=Array.from(bollesDiv.children)
                        bollesDivArray.forEach((bolle,index)=>{   
                            if (index==currentQuestion){
                                bolle.classList.add('clicked')
                            }else{
                            }
                              })
    
                        //move to the next question
                        if (currentQuestion<nmbrOfQuestions){
                        addContent(currentQuestion)}else{
                        // show the results 
                        setTimeout(()=>showResults(),500)
                        }  
                          
                        },1500)
                      }else{
                    
                        }}
    
                        
    
            // add bollets span as much as the number of questions
                    function AddSpans(){
                        for (var i=0; i < nmbrOfQuestions ;i++){
                            let span=document.createElement('span')
                          if (i==0){
                              span.classList.add('clicked')
                          }
                            bollesDiv.appendChild(span)
                        }
                    }
            // get random place for span of wrong answer
                    function addwrongAnswer(answer){
                        let random=Math.floor(Math.random()*2+1)
                        if (random==1){
                        Answers.insertAdjacentHTML('beforeend',answer)
                        }else{
                        Answers.insertAdjacentHTML('afterbegin',answer)
                        }
                      }
            //add content Function
                      function addContent(level){
                        Title.innerHTML=questions[level].title
                        let answer1=        `<div class="answer">
                        <input type="radio" id="RAnswer" name="qst" >
                        <label for="RAnswer">${questions[level].A1}</label><br>
                        </div>`
                        let answer2=        `<div class="answer">
                        <input type="radio" id="RAnswer" name="qst" >
                        <label for="RAnswer">${questions[level].A2}</label><br>
                        </div>`
                        let RAnswer=        `<div class="answer RAnswer">
                        <input type="radio" id="RAnswer" name="qst" >
                        <label for="RAnswer">${questions[level].RA}</label><br>
                        </div>`
                        //insert the right answer 
                        Answers.insertAdjacentHTML('beforeend',RAnswer)
                        //insert the wrong answers
                        addwrongAnswer(answer1);
                        addwrongAnswer(answer2);
                        }
            //remove Content function
                      function removeContent(){
                        let ArrayAnswers=Array.from(Answers.children)
                        ArrayAnswers.forEach((answer)=>answer.remove())
                      } 
            //timer Function
                      function timer(){
                        let timeSecond = 120;
                        const timeH = document.querySelector(".timer");
                        const countDown = setInterval(() => {
                          timeSecond--;
                          displayTime(timeSecond);
                          if (timeSecond == 0 ) {
                            clearInterval(countDown);
                            WrongAnswers=nmbrOfQuestions-CorrectAnswers
                            setTimeout(()=>showResults(),1000)
                            
                          }
                        }, 1000);
                        
                        function displayTime(second) {
                          const min = Math.floor(second / 60);
                          const sec = Math.floor(second % 60);
                          timeH.innerHTML = `
                          ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
                          `;
                        }
                        }
          // show results Function 
          function showResults(){
            //remove all the divs and let just the result's div
            QuestionsContainer.remove()
              SubmitBtn.remove()
              DeletedDiv.remove()
    
            // build the result's div
            
              google.charts.load('current', {'packages':['corechart']});
              google.charts.setOnLoadCallback(drawChart);
        
              function drawChart() {
        
                var data = google.visualization.arrayToDataTable([
                  ['answer', 'percent'],
                  ['Correct',CorrectAnswers],
                  ['Wrong',WrongAnswers],
                ]);
        
                var options = {
                  title: 'Your Result   '
                };
        
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        
                chart.draw(data, options);
              }
              let resultDiv1=`<div id="piechart" class="w-[700px] h-[700px] flex justify-center border-r-[1px] border-black"></div>`
              let  resultDiv2
              if (CorrectAnswers>WrongAnswers){
                resultDiv2=`<div  > <img src="images/youwin.jpg" alt="" class="pt-28"></div>`
              }else{
                resultDiv2=`<div > <img src="images/youlose.jpg" alt=""></div>` 
              }
              result.insertAdjacentHTML('beforeend',resultDiv1)
              result.insertAdjacentHTML('beforeend',resultDiv2)
    
    
          }
    })
}




    }
})













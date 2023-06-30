const questions = [
    {
        question:"Which of the viruses below is not transmitted  to healthcare workers through blood and bodily fluids from infected patient ",
        answer: [
            {text:"Hepatitis B Virus", correct: false},
            {text:"Influenza", correct: true},
            {text:"Crimean Congo hemorrhagic fever", correct: false},
            {text:"Hepatitis D virus", correct: false},
        ]
    },
    {
        question:"Which statement is not true for HIV RNA viral load detection ",
        answer: [
            {text:"Becomes positive> 10 days after infection", correct: false},
            {text:"is needed for the decision of antiretroviral therapy", correct: false},
            {text:"is crucial for antiretreoviral therapy follow-up", correct: false},
            {text:"must be confirmed with antibody test", correct: true},
        ]
    },
    {
        question:"What is the percentage of being infected with HIV when the heaolthcare worker had an injury with sharp object in the hospital ",
        answer: [
            {text:"10-30%", correct: false},
            {text:"35-45%", correct: false},
            {text:"0.24 -0.64%", correct: true},
            {text:"1.5-2.5%", correct: false},
        ]
    },
    {
        question:"Which of the viruses primarily not hepatrpic?",
        answer: [
            {text:"HIV", correct: true},
            {text:"HAV", correct: false},
            {text:"HEV", correct: false},
            {text:"HBV", correct: false},
        ]
    },

    {
        question:"which transmission below is not skin/mucosal transmission for a healthcare worker in a hospital? ",
        answer: [
            {text:"blood transfusion from infectious blood donor", correct: true},
            {text:"contact with infectious material contaminated surfaces", correct: false},
            {text:"infectious material splashed and transmitted to the nose", correct: false},
            {text:"contact lenses contaminated clinical infectious material", correct: false},
        ]
    },
    {
        question:"When HDV is acquired when there is already a chronic HBV infection(superinfection) what is the percentage of chronicity? ",
        answer: [
            {text:"46-65%", correct: false},
            {text:"3-15%", correct: false},
            {text:"70-95%", correct: true},
            {text:"20-45%", correct: false},
        ]
    },
    {
        question:"Which of the following below is a live(atenuated) vaccine: ",
        answer: [
            {text:"Hepatitis B vaccine", correct: false},
            {text:"Measles vaccines", correct: true},
            {text:"Tetanus vaccine", correct: false},
            {text:"Accelular pertusis vaccine", correct: false},
        ]
    },
    {
        question:"Whiich of the following actions below will not cause droplet particles that will be responsible for respiratory transmission? ",
        answer: [
            {text:"Normal respiration", correct: true},
            {text:"Sneezing", correct: false},
            {text:"spitting", correct: false},
            {text:"coughing", correct: false},
        ]
    },
    {
        question:"which of the following below is not a description of vaccine types according to their content?",
        answer: [
            {text:"sub-unit vaccing", correct: false},
            {text:"inactive vaccine", correct: false},
            {text:"complement vaccine", correct: true},
            {text:"atenuated vaccine", correct: false},
        ]
    },
    {
        question:"What is the name of the ingredient used in some dead/inactive vaccines that creates a stronger immune response and helps vaccine to work?",
        answer: [
            {text:"Adjuvant", correct: true},
            {text:"Sub-unit", correct: false},
            {text:"Toxoid", correct: false},
            {text:"Neomycin", correct: false},
        ]
    },
    {
        question:"Of which of the groups below do not have contradictions mfor atenuated vaccines?",
        answer: [
            {text:"stemcell transplant recipients", correct: false},
            {text:"HIV/AId positive patients", correct: false},
            {text:"pregnant woman", correct: false},
            {text:"diabetics", correct: true},
        ]
    },
    {
        question:"Which situation below describes a specific immune response for the protection fro infectious diseases without establishing the disease? ",
        answer: [
            {text:"Active immunization", correct: false},
            {text:"latent immunization", correct: false},
            {text:"paasive immunization", correct: true},
            {text:"Acute infection", correct: false},
        ]
    },
    {
        question:"Which type vaccine below is not available for COVID-19?",
        answer: [
            {text:"Atenuated vaccines", correct: true},
            {text:"viral vector vaccines", correct: false},
            {text:"mRNA vaccines", correct: false},
            {text:"Adenovirus vector vaccines", correct: false},
        ]
    },
]

const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer")
const nextButton = document.getElementById("next")
const result = document.getElementById("score")


let currentQuestionIndex = 0
let score = 0

//begin
function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next" 
    showQuestion()
}
function showQuestion(){
    resetState()
    //question setting
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + "." + currentQuestion.question


    //answer setting
   currentQuestion.answer.forEach((answer) =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("option");
    answerButton.append(button)

    if(answer.correct){
        button.dataset.correct = answer.correct
       }
       button.addEventListener("click", selectAnswer)
   })

   
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
function selectAnswer(e){
    // for selected answer
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
        result.innerHTML = score
    }
    else{
        selectedBtn.classList.add("incorrect")
    }

    //what happens to the rest of the unselected ones
    Array.from(answerButton.children).forEach((button) => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
    
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextQuestion()
    }
    else{
        startQuiz()
    }
})
function handleNextQuestion(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else{
        showScore()
    }
}
function showScore(){
    resetState()
    questionElement.innerHTML = `you scored ${Math.floor(score/questions.length * 100)} out of ${100}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block" 
    result.innerHTML ="0"
}
startQuiz();
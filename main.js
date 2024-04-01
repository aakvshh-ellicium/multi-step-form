const nextButton = document.querySelector('.nextBtn')
const previousButton = document.querySelector('.previousBtn')
const steps = document.querySelectorAll('.stp')
const formEl = document.querySelector('form')
const planCards = document.querySelectorAll('.plan-card')
const prices = document.querySelectorAll('.price')
const boxes = document.querySelectorAll('.box')


let currentPage = 1
let isMonthly = true;

const servicePrice = document.getElementById('servicePrice');
const storagePrice = document.getElementById('storagePrice');
const customPrice = document.getElementById('customPrice');

const userData = {
    name: '',
    email: '',
    phone: '',
    type: 'monthly',
    planSelected: 'Arcade',
    planSelectedPrice: '9',
    addOns: []

}



const nextPage = () => {
    if (currentPage < 4){
        stepOne = document.querySelector(`.step-${currentPage}`)
        // console.log(stepOne)
        stepTwo = document.querySelector(`.step-${currentPage + 1}`)

        stepOne.style.display = 'none'
        stepTwo.style.display = 'flex'
        
        prevCircle = document.querySelector(`#circle-${currentPage}`)
        nextCicle = document.querySelector(`#circle-${currentPage + 1}`)

        nextCicle.style.backgroundColor = 'hsl(206, 94%, 87%)'
        nextCicle.style.color = 'hsl(213, 96%, 18%)'
        
        currentPage++;
    }
    else if (currentPage >= 4){
        currentPage = 5
        stepOne = document.querySelector(`.step-${currentPage}`)
        stepTwo = document.querySelector(`.step-${currentPage - 1}`)

        stepOne.style.display = 'flex'
        stepTwo.style.display = 'none'
    

    }
    

    if (!isMonthly){
        servicePrice.innerHTML = '+$10/yr'
        storagePrice.innerHTML = '+$20/yr'
        customPrice.innerHTML = '+$20/yr'

    } else {
        servicePrice.innerHTML = '+$1/mo'
        storagePrice.innerHTML = '+$2/mo'
        customPrice.innerHTML = '+$2/mo'
    }



}

const prevPage = () => {
    if (currentPage <= 4){
        stepOne = document.querySelector(`.step-${currentPage - 1}`)
        stepTwo = document.querySelector(`.step-${currentPage}`)

        stepOne.style.display = 'flex'
        stepTwo.style.display = 'none'

        prevCircle = document.querySelector(`#circle-${currentPage - 1}`)
        nextCicle = document.querySelector(`#circle-${currentPage}`)

        nextCicle.style.backgroundColor = 'transparent'
        nextCicle.style.color = '#fff'
        currentPage--;
    }
    else if (currentPage > 4){
        currentPage--;
        stepOne = document.querySelector(`.step-${currentPage}`)
        stepTwo = document.querySelector(`.step-${currentPage + 1}`)

        stepOne.style.display = 'flex'
        stepTwo.style.display = 'none'
    }

    boxes.forEach(box => {
        boxInput = box.firstElementChild;
        boxInput.checked = false;
    });

    
}

planCards.forEach(e => {
    e.addEventListener('click', () => {
        document.querySelector('.selected').classList.remove('selected')
        e.classList.toggle('selected')
        const planName = e.lastElementChild.firstElementChild.innerHTML;
        let planPrice;
        
        (planName === 'Arcade' && isMonthly) && (planPrice = '9');
        (planName == 'Advanced' && isMonthly) && (planPrice = '12');
        (planName == 'Pro' && isMonthly) && (planPrice = '15');
        (planName == 'Arcade' && !isMonthly) && (planPrice = '90');
        (planName == 'Advanced' && !isMonthly) && (planPrice = '120');
        (planName == 'Pro' && !isMonthly) && (planPrice = '150');

        console.log(planName, planPrice)

        userData.planSelected = planName;
        userData.planSelectedPrice = planPrice
        console.log(userData)
       
    })
})

const toggle = document.querySelector('.slider')
toggle.addEventListener('click', () => {
    const cards = document.querySelector('#cards')
    const arcadePrice = document.getElementById('arcade')
    const advancedPrice = document.getElementById('advanced')
    const proPrice = document.getElementById('pro')

    if (isMonthly){
        isMonthly = false
        document.querySelector('.selected').classList.remove('selected')
        planCards[0].classList.add('selected')

        arcadePrice.textContent = '$90/yr'
        advancedPrice.textContent = '$120/yr'
        proPrice.textContent = '$150/yr'

        userData.type = 'yearly'
        userData.planSelectedPrice = '90'
    } else {
        isMonthly = true
        document.querySelector('.selected').classList.remove('selected')
        planCards[0].classList.add('selected')

        arcadePrice.textContent = '$9/mo'
        advancedPrice.textContent = '$12/mo'
        proPrice.textContent = '$15/mo'

        userData.type = 'monthly'
    }
    
});



boxes.forEach(box => {
    box.addEventListener('click', () => {
        boxInput = box.firstElementChild;
        let totalAddon = 0;
        let name = box.lastElementChild.previousElementSibling.firstElementChild.innerHTML
        console.log(name)
        let price = box.lastElementChild.innerHTML.replace('+$', '').replace('/mo', '').replace('/yr', '')
        console.log(price)
       if (boxInput.checked === true){
            userData.addOns.push({name, price})
       } else {
            userData.addOns.pop({name, price})
       }
       console.log(userData)
    })
})

formEl.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const formData = new FormData(formEl);

    for (let [key, value] of formData.entries()){
        userData[key] = value;
    }

    console.log(userData)

})




nextButton.addEventListener('click', nextPage)
previousButton.addEventListener('click', prevPage)


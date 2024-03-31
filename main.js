const nextButton = document.querySelector('.nextBtn')
const previousButton = document.querySelector('.previousBtn')
const steps = document.querySelectorAll('.stp')
const formEl = document.querySelector('form')
const planCards = document.querySelectorAll('.plan-card')
const prices = document.querySelectorAll('.price')
const boxes = document.querySelectorAll('.box')

console.log(boxes)
let currentPage = 1
let isMonthly = true;

const servicePrice = document.getElementById('servicePrice');
const storagePrice = document.getElementById('storagePrice');
const customPrice = document.getElementById('customPrice');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formEl);

    for (item of formData){
        console.log(item[0], item[1]);
    }
})

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
    

    console.log(currentPage)

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
        console.log(stepOne)
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
    console.log(currentPage)

    
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

        console.log(planPrice)

       
    })
})

const toggle = document.querySelector('.slider')
toggle.addEventListener('click', () => {
    const cards = document.querySelector('#cards')
    const arcadePrice = document.getElementById('arcade')
    const advancedPrice = document.getElementById('advanced')
    const proPrice = document.getElementById('pro')
    console.log(arcadePrice)
    if (isMonthly){
        isMonthly = false
        document.querySelector('.selected').classList.remove('selected')
        planCards[0].classList.add('selected')
        console.log('first')
        arcadePrice.textContent = '$90/yr'
        advancedPrice.textContent = '$120/yr'
        proPrice.textContent = '$150/yr'
    } else {
        isMonthly = true
        document.querySelector('.selected').classList.remove('selected')
        planCards[0].classList.add('selected')
        console.log('second')
        arcadePrice.textContent = '$9/mo'
        advancedPrice.textContent = '$12/mo'
        proPrice.textContent = '$15/mo'
    }
});





boxes.forEach(box => {
    box.addEventListener('click', () => {
       boxInput = box.firstElementChild
    //    let addonPrice = 0;
        let totalAddon = 0;
       if (boxInput.checked === true){
            let price = box.lastElementChild.innerHTML.replace('+$', '').replace('/mo', '').replace('/yr', '')
            console.log(price)
       }
        
    })
})













// if (isMonthly){
    
//     boxes.forEach(box => {
//         box.addEventListener('click', (e) => {
//             e.preventDefault();
//             let price = box.lastElementChild.textContent;
//             const checkbox = document.querySelector('.box input')
//             // console.log(checkbox)
//             // checkbox.click;
            
//             if (checkbox.checked == true){
//                 console.log(price)
//             }
//             // console.log(box)
//         })
//     })
    
// }



nextButton.addEventListener('click', nextPage)
previousButton.addEventListener('click', prevPage)


// console.log(formData)formEl.addEventListener('submit', storeFormData)

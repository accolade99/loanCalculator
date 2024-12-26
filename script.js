document.addEventListener("DOMContentLoaded", () => {
    
//select elements
const calculateBtn = document.getElementById("calculateBtn");
const amountInput = document.getElementById("amount");
const interestInput = document.getElementById("interest");
const yearsInput = document.getElementById("years");

//summary
const monthlyPayment = document.getElementById("monthly");
const totalPayment = document.getElementById("total");
const totalInterestPayment = document.getElementById("totalInterest");
//function to calculate loan
function calculateLoan(){
    const principal = parseFloat(amountInput.value);
    const interest = parseFloat(interestInput.value)/100/12;
    const payments = parseFloat(yearsInput.value) * 12;
    if(isNaN(principal) || isNaN(interest) || isNaN(payments)) {
        alert("Please enter valid numbers");
        return;
    }
    //calculate monthly payments
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);

    if(isFinite(monthly)){
        //calculate total payment and interest
        const total = monthly * payments;
        const totalInterest = total - principal;
        //display the results with 2 decimal places
        monthlyPayment.textContent = (Math.round(monthly * 100) / 100).toFixed(2);
        totalPayment.textContent = (Math.round(total * 100) / 100).toFixed(2);
        totalInterestPayment.textContent = (Math.round(totalInterest * 100) / 100).toFixed(2);
        animateValue(monthlyPayment, 0, monthly, 1000);
        animateValue(totalPayment, 0, total, 1000); // fixed typo from 'tptalPayment'
        animateValue(totalInterestPayment, 0, totalInterest, 1000);
    

    // if(isFinite(monthly)){
    //     //calculate total payment and interest
    //     const total = monthly * payments;
    //     const totalInterest = total - principal;
    //     //display the results
    //     monthlyPayment.textContent = monthly;
    //     totalPayment.textContent = total;
    //     totalInterestPayment.textContent = totalInterest;
    //     animateValue(monthlyPayment, 0, monthly, 1000);
    //     animateValue(totalPayment, 0, total, 1000);
    //     animateValue(totalInterestPayment, 0, totalInterest, 1000);
    }
}
//animate
function animateValue(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        
        // Format to 2 decimal places
        element.textContent = (Math.round(current * 100) / 100).toFixed(2);

        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    // Start the animation
    requestAnimationFrame(update);
}

// function animateValue (element, start, end, duration){
//     const startTime = performance.now();

//     function update(currentTime){
//         const elapsed = currentTime - startTime;
//         const progress = Math.min(elapsed/duration, 1);
//         const current = start + (end - start) * progress;
//         element.textContent = current.toFixed(2);

        
//     }
//     if(progress <1){
//         requestAnimationFrame(update);
//     }
//     requestAnimationFrame(update);
// }
//bind event to calculateBtn
calculateBtn.addEventListener("click", calculateLoan);

});

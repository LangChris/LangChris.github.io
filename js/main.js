function calculate() {
    let inputObject = getInputObject();
    let outputObject = getOutputObject(inputObject);
    console.log(outputObject);
    document.getElementById('sales-price-value').value = '$' + convertToCurrency(outputObject.salesPrice);
    document.getElementById('down-payment').value = '$' + convertToCurrency(outputObject.downPayment);
    document.getElementById('loan-amount').value = '$' + convertToCurrency(outputObject.loanAmount);
    document.getElementById('pi').value = '$' + convertToCurrency(outputObject.pi);
    document.getElementById('taxes-per-year').value = '$' + convertToCurrency(outputObject.taxesPerYear);
    document.getElementById('taxes-per-month').value = '$' + convertToCurrency(outputObject.taxesPerMonth);
    document.getElementById('insurance').value = '$' + convertToCurrency(outputObject.insurance);
    document.getElementById('mortgage-insurance').value = '$' + convertToCurrency(outputObject.mortgageInsurance);
    document.getElementById('hoa-fee-value').value = '$' + convertToCurrency(outputObject.hoaFee);
    document.getElementById('pi-ti').value = '$' + convertToCurrency(outputObject.piTi);
    document.getElementById('yearly-appreciation').value = +(outputObject.yearlyAppreciation * 100).toFixed(2) + '%';
    document.getElementById('appreciation').value = '$' + convertToCurrency(outputObject.appreciation);
    document.getElementById('total-years-value').value = outputObject.numOfYears;
    document.getElementById('estimated-value').value = '$' + convertToCurrency(outputObject.estimatedValue);
    document.getElementById('remaining-balance').value = '$' + convertToCurrency(outputObject.remainingBalance.toFixed(2));
    document.getElementById('equity').value = '$' + convertToCurrency(outputObject.equity);
    
    
    //Update Email Results
    updateEmailResults();
}    

function updateEmailResults() {
    let emailResults = document.getElementById('email-results');
    let emailResultsLink = document.getElementById('email-results-link');
    
    let emailSubject = "Home Purchase Scenario";
    let emailBody = "Home Purchase Scenario%0D%0A%0D%0A";
    
    let buyerName = document.getElementById('buyer-name').value;
    
    let subjectProperty = document.getElementById('subject-property').value;
    let subjectPropertyCity = document.getElementById('subject-property-city').value;
    let subjectPropertyState = document.getElementById('subject-property-state').value;
    let subjectPropertyZip = document.getElementById('subject-property-zip').value;
    
    let buyerEmail = document.getElementById('email-address').value;
    
    let term = document.getElementById('loan-term').value;
    
    if(buyerName.length > 0) {
        emailBody += "Name: " + buyerName + "%0D%0A";
    }
    
    if(buyerEmail.length > 0) {
        emailBody += "Email: " + buyerEmail + "%0D%0A";
    }
    
    if(subjectProperty.length > 0) {
        emailBody += "Subject Property: " + subjectProperty + " " + subjectPropertyCity + ", " + subjectPropertyState + " " + subjectPropertyZip + "%0D%0A";
    }
    
    emailBody += "Sales Price: " + "$" + convertToCurrency(outputObject.salesPrice) + "%0D%0A";
    emailBody += "Loan Term: " + outputObject.term + " Years" + "%0D%0A";
    emailBody += "Interest Rate: " + outputObject.interestRate + "%" + "%0D%0A";
    emailBody += "Down Payment: " + "$" + convertToCurrency(outputObject.downPayment) + "%0D%0A";
    emailBody += "Loan Amount: " + "$" + convertToCurrency(outputObject.loanAmount) + "%0D%0A";
    emailBody += "PI (Principal & Interest): " + "$" + convertToCurrency(outputObject.pi) + "%0D%0A";
    emailBody += "Taxes/Year: " + "$" + convertToCurrency(outputObject.taxesPerYear) + "%0D%0A";
    emailBody += "Taxes/Month: " + "$" + convertToCurrency(outputObject.taxesPerMonth) + "%0D%0A";
    emailBody += "Insurance/Month: " + "$" + convertToCurrency(outputObject.insurance) + "%0D%0A";
    emailBody += "Mortgage Insurance/Month: " + "$" + convertToCurrency(outputObject.mortgageInsurance) + "%0D%0A";
    emailBody += "HOA or Condo Fee: " + "$" + convertToCurrency(outputObject.hoaFee) + "%0D%0A";
    emailBody += "PITI Monthly: " + "$" + convertToCurrency(outputObject.piTi) + "%0D%0A";
    emailBody += "Yearly Appreciation: " + (outputObject.yearlyAppreciation * 100) + "%" + "%0D%0A";
    emailBody += "Appreciation: " + "$" + convertToCurrency(outputObject.appreciation) + "%0D%0A";
    emailBody += "Total Years: " + outputObject.numOfYears + " Years" + "%0D%0A";
    emailBody += "Estimated Value: " + "$" + convertToCurrency(outputObject.estimatedValue) + "%0D%0A";
    emailBody += "Remaining Balance: " + "$" + convertToCurrency(outputObject.remainingBalance) + "%0D%0A";
    emailBody += "Equity: " + "$" + convertToCurrency(outputObject.equity) + "%0D%0A";
    
    emailResultsLink.href = "mailto:edlang@edlang.com?subject=" + emailSubject + "&body=" + emailBody;
    emailResults.disabled = false;
}

function updateInterestRate(event) {
    let value = event.target.options[event.target.options.selectedIndex].value;
    let interestRate = document.getElementById('interest-rate');

    switch(value) {
        case '30': interestRate.value = '2.75%'; break;
        case '15': interestRate.value = '2.25%'; break;
    }
}

function updateTotalYearsLabel(event) {
    let value = event.target.value;
    let totalYearsLabel = document.getElementById('total-years-label');

    totalYearsLabel.innerHTML = value + ' Year' + (value > 1 ? 's' : '');
}

function updatePercentDownLabel(event) {
    let value = event.target.value;
    let percentDownLabel = document.getElementById('percent-down-label');

    percentDownLabel.innerHTML = value + '%';
}

function updateInterestRateLabel(event) {
    let value = event.target.value;
    let interestRateLabel = document.getElementById('interest-rate-label');

    interestRateLabel.innerHTML = (value.length == 4 ? (value + '0') : value.length == 3 ? (value + '00') : value.length == 1 ? (value + '.000') : value) + '%';
}

function toggleCalculateButton(event) {
    let salesPrice = event.target.value;
    let calculateButton = document.getElementById('calculate');
    
    if(salesPrice.length > 0) {
        calculateButton.disabled = false;
    } else {
        calculateButton.disabled = true;
    }
}
        
function getInputObject() {
    let salesPrice = document.getElementById('sales-price').value;
    let percentDown = document.getElementById('percent-down').value;
    let numOfYears = document.getElementById('total-years').value;
    let interestRate = document.getElementById('interest-rate').value;
    let term = document.getElementById('loan-term').value;
    let hoaFee = document.getElementById('hoa-fee').value;
    let numOfPayments = 12 * +term;
    salesPrice = salesPrice.replace('$', '');
    salesPrice = salesPrice.replace(',', '');
    hoaFee = hoaFee.replace('$', '');
    percentDown = percentDown.replace('%', '');
    interestRate = interestRate.replace('%', '');
    
    return {
        salesPrice: +salesPrice,
        hoaFee: +hoaFee,
        percentDown: +percentDown / 100,
        numOfYears: +numOfYears,
        interestRate: +interestRate / 100,
        term: +term,
        numOfPayments: +numOfPayments
    };
}

function getOutputObject(inputObject) {
    let constants = getConstantVariables();
    
    let downPayment = +(inputObject.salesPrice * inputObject.percentDown).toFixed(2);
    let loanAmount = +(inputObject.salesPrice - downPayment).toFixed(2);
    let pi = +PMT(inputObject.interestRate/12,inputObject.numOfPayments, loanAmount).toFixed(2);
    let taxesPerYear = +(inputObject.salesPrice * constants.yearlyTaxesRate).toFixed(2);
    let taxesPerMonth = +(taxesPerYear / 12).toFixed(2);
    let appreciation = +(inputObject.salesPrice * constants.yearlyAppreciation).toFixed(2);
    
    let estimatedValue = +(inputObject.salesPrice * Math.pow(1 + constants.yearlyAppreciation, inputObject.numOfYears)).toFixed(2);
    let remainingBalance = +REMBAL(pi, inputObject.interestRate/12, inputObject.numOfPayments - (inputObject.numOfYears * 12));
    let equity = +(estimatedValue - remainingBalance).toFixed(2);
    let insurance = +((inputObject.salesPrice * constants.insuranceRate) / 12).toFixed(2);
    let mortgageInsurance;
    if(inputObject.percentDown >= 0.2) {
       mortgageInsurance = 0;
    } else if(inputObject.percentDown < 0.1) {
       mortgageInsurance = +(.00075 * inputObject.salesPrice).toFixed(2);
    } else {
        mortgageInsurance = +(.00041 * inputObject.salesPrice).toFixed(2);
    }
    let piTi = +(pi + taxesPerMonth + insurance + mortgageInsurance + inputObject.hoaFee).toFixed(2);
    
    let outputObject = {
        downPayment: downPayment,
        loanAmount: loanAmount,
        pi: pi,
        taxesPerYear: taxesPerYear,
        taxesPerMonth: taxesPerMonth,
        piTi: piTi,
        appreciation: appreciation,
        estimatedValue: estimatedValue,
        remainingBalance: remainingBalance,
        equity: equity,
        insurance: insurance,
        mortgageInsurance: mortgageInsurance
    };
    
    Object.assign(outputObject, constants);
    Object.assign(outputObject, inputObject);
    
    return outputObject;
}

function PMT(ir,np, pv, fv = 0) { 
 // ir: interest rate
 // np: number of payment
 // pv: present value or loan amount
 // fv: future value. default is 0

 var presentValueInterstFector = Math.pow((1 + ir), np);
 var pmt = ir * pv  * (presentValueInterstFector + fv)/(presentValueInterstFector-1); 
 return pmt;
}

function REMBAL(pmt, i, n) {
    return pmt * ((1 - (1 / Math.pow(1 + i, n))) / i);
}

function getConstantVariables() {
    return {
        insuranceRate: 0.002,
        yearlyTaxesRate: 0.01,
        yearlyAppreciation: .02
    };
}

function convertToCurrency(number) {
    number = number.toString();
    if(number.includes('.')) {
        let post = number.substring(number.indexOf('.') + 1);
        if(post.length == 1) {
            number = number + '0';
        }
    } else {
        number = number + '.00';
    }
    
    let pre = number.substring(0, number.indexOf('.'));
    if(pre.length >= 4) {
        let numCommas = Math.floor(pre.length / 3);
        if(pre.length % 3 == 0) {
            numCommas--;
        }
        
        let index = pre.length - 1;
        while(numCommas > 0) {
            
            if(pre.includes(',')) {
                let startIndex = pre.indexOf(',') - 3;
                let endIndex = pre.indexOf(',');
                let before = pre.substring(0, startIndex);
                let after = pre.substring(startIndex);
                    
                pre = before + ',' + after;
            } else {
                let index = pre.length - 3;
                let before = pre.substring(0, index);
                let after = pre.substring(index);
                
                pre = before + ',' + after;
            }

            numCommas--;
        }
        
        number = pre + number.substring(number.indexOf('.'));
    }
    
    return number;
}
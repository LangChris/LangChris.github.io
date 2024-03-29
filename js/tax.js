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
    document.getElementById('total-years-value').value = outputObject.numOfYears;
    document.getElementById('estimated-value').value = '$' + convertToCurrency(outputObject.estimatedValue);
    document.getElementById('remaining-balance').value = '$' + convertToCurrency(outputObject.remainingBalance.toFixed(2));
    document.getElementById('equity').value = '$' + convertToCurrency(outputObject.equity);
    document.getElementById('monthly-tax-savings').value = '$' + convertToCurrency(outputObject.monthlyTaxSavings);
    
    //Update Scenario Results
    updateScenarioResults(outputObject);
    
    //Update Tax Results
    updateTaxResults(outputObject);
    
    //Update Email Results
    updateEmailResults(outputObject);
}    

function updateScenarioResults(outputObject) {
    document.getElementById('scenario-results').innerHTML = "In the above scenario, your initial investment of $" + convertToCurrency(outputObject.downPayment) + " over a period of " + outputObject.numOfYears + 
    " years will become $" + convertToCurrency(outputObject.equity) + " of Home Equity.";
}

function updateTaxResults(outputObject) {
    document.getElementById('tax-results').innerHTML = "In addition to Equity building, you most likely will receive an additional $" +
    convertToCurrency(outputObject.monthlyTaxSavings) +" monthly tax savings.";
}

function updateEmailResults(outputObject) {
    let emailResults = document.getElementById('email-results');
    let emailResultsLink = document.getElementById('email-results-link');
    
    let emailSubject = "Home Purchase Scenario";
    let emailBody = "Home Purchase Scenario%0D%0A %0D%0A";
    
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
        emailBody += "Address: " + subjectProperty + "%0D%0A";
    }
    
    if(subjectPropertyCity.length > 0) {
        emailBody += "City: " + subjectPropertyCity + "%0D%0A";
    }
    
    if(subjectPropertyState.length > 0) {
        emailBody += "State: " + subjectPropertyState + "%0D%0A";
    }
    
    if(subjectPropertyZip.length > 0) {
        emailBody += "Zip: " + subjectPropertyZip + "%0D%0A";
    }
    
        emailBody += "Sales Price: $" + convertToCurrency(outputObject.salesPrice) + "%0D%0A";
        emailBody += "Loan Term (Years): " + outputObject.term + "%0D%0A";
        emailBody += "Interest Rate (Percent): " + (outputObject.interestRate * 100) + "%0D%0A";
        emailBody += "Down Payment: $" + convertToCurrency(outputObject.downPayment) + "%0D%0A";
        emailBody += "Loan Amount: $" + convertToCurrency(outputObject.loanAmount) + "%0D%0A";
        emailBody += "PI (Principal + Interest): $" + convertToCurrency(outputObject.pi) + "%0D%0A";
        emailBody += "Taxes/Year: $" + convertToCurrency(outputObject.taxesPerYear) + "%0D%0A";
        emailBody += "Taxes/Month: $" + convertToCurrency(outputObject.taxesPerMonth) + "%0D%0A";
        emailBody += "Insurance/Month: $" + convertToCurrency(outputObject.insurance) + "%0D%0A";
        emailBody += "Mortgage Insurance/Month: $" + convertToCurrency(outputObject.mortgageInsurance) + "%0D%0A";
        emailBody += "HOA or Condo Fee: $" + convertToCurrency(outputObject.hoaFee) + "%0D%0A";
        emailBody += "PITI Monthly: $" + convertToCurrency(outputObject.piTi) + "%0D%0A";
        emailBody += "Yearly Appreciation (Percent): " + (outputObject.yearlyAppreciation * 100) + "%0D%0A";
        emailBody += "Total Years: " + outputObject.numOfYears + "%0D%0A";
        emailBody += "Estimated Value: $" + convertToCurrency(outputObject.estimatedValue) + "%0D%0A";
        emailBody += "Remaining Balance: $" + convertToCurrency(outputObject.remainingBalance.toFixed(2)) + "%0D%0A";
        emailBody += "Estimated Home Equity: $" + convertToCurrency(outputObject.equity) + "%0D%0A";
    
        emailBody += "%0D%0A" + document.getElementById('scenario-results').innerHTML + "%0D%0A %0D%0A";
        emailBody += document.getElementById('tax-results').innerHTML + "%0D%0A %0D%0A";
        //emailBody += "In addition, you most likely will be eligible for a Significant Tax Savings on the interest and tax portion of your monthly payment.%0D%0A %0D%0A";
    
        emailBody += "Consult your tax advisor for details.%0D%0A %0D%0A";
    
        emailBody += "THE INFORMATION PROVIDED ABOVE IS ONLY AN ESTIMATE FOR DISCUSSION PURPOSES ONLY FOR ADDITIONAL INFO PLEASE CONTACT:%0D%0A";
        emailBody += "Ed Lang - Real Estate Expert%0D%0A";
        emailBody += "Office: 703.932.5753%0D%0A";
        emailBody += "Email: edlang@edlang.com%0D%0A";
        emailBody += "Website: www.edlang.com%0D%0A";
    
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

function updateYearlyAppreciationLabel(event) {
    let value = event.target.value;
    let yearlyAppreciationLabel = document.getElementById('yearly-appreciation-label');

    yearlyAppreciationLabel.innerHTML = (value.length == 1 ? (value + '.0') : value) + '%';
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
    let yearlyAppreciation = document.getElementById('yearly-appreciation').value;
    let term = document.getElementById('loan-term').value;
    let hoaFee = document.getElementById('hoa-fee').value;
    let numOfPayments = 12 * +term;
    let taxBracket = document.getElementById('tax-bracket').value;
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
        numOfPayments: +numOfPayments,
        yearlyAppreciation: +yearlyAppreciation / 100,
        taxBracket: +taxBracket
    };
}

function getOutputObject(inputObject) {
    let constants = getConstantVariables();
    
    let downPayment = +(inputObject.salesPrice * inputObject.percentDown).toFixed(2);
    let loanAmount = +(inputObject.salesPrice - downPayment).toFixed(2);
    let pi = +PMT(inputObject.interestRate/12,inputObject.numOfPayments, loanAmount).toFixed(2);
    let taxesPerYear = +(inputObject.salesPrice * constants.yearlyTaxesRate).toFixed(2);
    let taxesPerMonth = +(taxesPerYear / 12).toFixed(2);
    
    let estimatedValue = +(inputObject.salesPrice * Math.pow(1 + inputObject.yearlyAppreciation, inputObject.numOfYears)).toFixed(2);
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
    
    let monthlyTaxSavings = +MTS(inputObject.interestRate, pi, loanAmount, inputObject.taxBracket, taxesPerYear).toFixed(2);
    
    let outputObject = {
        downPayment: downPayment,
        loanAmount: loanAmount,
        pi: pi,
        taxesPerYear: taxesPerYear,
        taxesPerMonth: taxesPerMonth,
        piTi: piTi,
        estimatedValue: estimatedValue,
        remainingBalance: remainingBalance,
        equity: equity,
        insurance: insurance,
        mortgageInsurance: mortgageInsurance,
        monthlyTaxSavings: monthlyTaxSavings
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

function MTS(interestRate, pi, loanAmount, taxBracket, taxesPerYear) {
    console.log('calculating monthlyTaxSavings...');
    //Int (t) = interest rate x Loan Balance
    var interest = interestRate * loanAmount;
    
    //Prinicipal (t) = monthly payment - int (t)
    var principal = loanAmount - interest;
    
    //B. Interest portion of the PI and take a percentage of that to give Interest amount per month, multiply that times tax bracket rate = monthly savings
    var monthlySavings = interest * taxBracket;
    
    //C. Taxes per year x your Tax Bracket to give tax paid savings per year
    var taxPaidSavingsPerYear = taxesPerYear * taxBracket;
    
    //B+C  divided by 12 = monthly tax savings
    var monthlyTaxSavings = (monthlySavings + taxPaidSavingsPerYear) / 12;
    
    console.log('Interest: ' + interest);
    console.log('Principal: ' + principal);
    console.log('Tax Bracket: ' + taxBracket);
    console.log('Taxes Per Year: ' + taxesPerYear);
    console.log('Monthly Savings: ' + monthlySavings);
    console.log('Tax Paid Savings/Yr: ' + taxPaidSavingsPerYear);
    console.log('Monthly Tax Savings: ' + monthlyTaxSavings);
    return monthlyTaxSavings;
}

function getConstantVariables() {
    return {
        insuranceRate: 0.002,
        yearlyTaxesRate: 0.01
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

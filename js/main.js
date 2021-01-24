function calculate() {
    console.log('calculating...');

    let inputObject = getInputObject();
    let outputObject = getOutputObject(inputObject);
    console.log(outputObject);

    document.getElementById('down-payment').value = '$' + convertToCurrency(outputObject.downPayment);
    document.getElementById('loan-amount').value = '$' + convertToCurrency(outputObject.loanAmount);
    document.getElementById('pi').value = '$' + convertToCurrency(outputObject.pi);
    document.getElementById('taxes-per-year').value = '$' + convertToCurrency(outputObject.taxesPerYear);
    document.getElementById('taxes-per-month').value = '$' + convertToCurrency(outputObject.taxesPerMonth);
    document.getElementById('insurance').value = '$' + convertToCurrency(outputObject.insurance);
    document.getElementById('mortgage-insurance').value = '$' + convertToCurrency(outputObject.mortgageInsurance);
    document.getElementById('hoa-fee').value = '$' + convertToCurrency(outputObject.hoaFee);
    document.getElementById('pi-ti').value = '$' + convertToCurrency(outputObject.piTi);
    document.getElementById('yearly-appreciation').value = +(outputObject.yearlyAppreciation * 100).toFixed(2) + '%';
    document.getElementById('appreciation').value = '$' + convertToCurrency(outputObject.appreciation);
    document.getElementById('total-years').value = outputObject.numOfYears;
    document.getElementById('estimated-value').value = '$' + convertToCurrency(outputObject.estimatedValue);
    document.getElementById('remaining-balance').value = '$' + convertToCurrency(outputObject.remainingBalance);
    document.getElementById('equity').value = '$' + convertToCurrency(outputObject.equity);
    
    document.getElementById('results').style.display = 'block';
}    
        
function getInputObject() {
    let salesPrice = document.getElementById('sales-price').value;
    let percentDown = document.getElementById('percent-down').value;
    let numOfYears = document.getElementById('number-of-years').value;
    let interestRate = document.getElementById('interest-rate').value;
    let term = document.getElementById('term').value;
    let numOfPayments = document.getElementById('number-of-payments').value;
    salesPrice = salesPrice.replace('$', '');
    salesPrice = salesPrice.replace(',', '');
    percentDown = percentDown.replace('%', '');
    interestRate = interestRate.replace('%', '');
    
    return {
        salesPrice: +salesPrice,
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
    let taxesPerYear = +(inputObject.salesPrice * 0.01).toFixed(2);
    let taxesPerMonth = +(taxesPerYear / 12).toFixed(2);
    let appreciation = +(inputObject.salesPrice * constants.yearlyAppreciation).toFixed(2);
    
    let piTi = +(pi + taxesPerMonth + constants.insurance + constants.mortgageInsurance + constants.hoaFee).toFixed(2);
    let estimatedValue = +(inputObject.salesPrice * Math.pow(1 + constants.yearlyAppreciation, inputObject.numOfYears)).toFixed(2);
    let remainingBalance = 416000;
    let equity = +(estimatedValue - remainingBalance).toFixed(2);
    
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
        equity: equity
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

function getConstantVariables() {
    return {
        insurance: 100.00,
        mortgageInsurance: 100.00,
        hoaFee: 75.00,
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
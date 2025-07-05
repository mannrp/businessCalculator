document.addEventListener('DOMContentLoaded', () => {
    const storeProfit = document.getElementById('storeProfit');
    const gasVolume = document.getElementById('gasVolume');
    const cplMargin = document.getElementById('cplMargin');
    const gasProfit = document.getElementById('gasProfit');
    const storeGasGrossProfit = document.getElementById('storeGasGrossProfit');
    const expensesList = document.getElementById('expenses-list');
    const addExpense = document.getElementById('add-expense');
    const purchasePrice = document.getElementById('purchasePrice');
    const loanPercent = document.getElementById('loanPercent');
    const loanAmount = document.getElementById('loanAmount');
    const interestRate = document.getElementById('interestRate');
    const loanTerm = document.getElementById('loanTerm');
    const mortgagePayment = document.getElementById('mortgagePayment');
    const inventoryAmount = document.getElementById('inventoryAmount');
    const termLoanPercent = document.getElementById('termLoanPercent');
    const termLoanPercentValue = document.getElementById('termLoanPercentValue');
    const termLoanAmount = document.getElementById('termLoanAmount');
    const termLoanTerm = document.getElementById('termLoanTerm');
    const termLoanRate = document.getElementById('termLoanRate');
    const termLoanPayment = document.getElementById('termLoanPayment');
    const revolvingCreditAmount = document.getElementById('revolvingCreditAmount');
    const grossProfit = document.getElementById('grossProfit');
    const grossProfitAfterTax = document.getElementById('grossProfitAfterTax');
    const cashInHand = document.getElementById('cashInHand');
    const numberOfPartners = document.getElementById('numberOfPartners');
    const corporateTax = document.getElementById('corporateTax');
    const dividendTax = document.getElementById('dividendTax');
    const netCashAfterTax = document.getElementById('netCashAfterTax');
    const salaryPerPartner = document.getElementById('salaryPerPartner');
    const partnerCount = document.getElementById('partnerCount');
    const partnerCount2 = document.getElementById('partnerCount2');
    const netCashPerPartner = document.getElementById('netCashPerPartner');

    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    function formatNumber(amount) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    function calculate() {
        // Store Profit - direct entry only
        const calculatedStoreProfit = parseFloat(storeProfit.value) || 0;

        // Gas Profit - only from volume and cents per liter
        const gasVolumeValue = parseFloat(gasVolume.value) || 0;
        const cplMarginValue = parseFloat(cplMargin.value) || 0;
        const calculatedGasProfit = gasVolumeValue * (cplMarginValue / 100);
        gasProfit.value = calculatedGasProfit.toFixed(2);

        // Store + Gas Gross Profit
        const storeGasTotal = calculatedStoreProfit + calculatedGasProfit;
        if (storeGasGrossProfit) storeGasGrossProfit.textContent = formatCurrency(storeGasTotal);

        // Expenses
        let totalExpenses = 0;
        document.querySelectorAll('.expense-amount').forEach(expense => {
            totalExpenses += parseFloat(expense.value) || 0;
        });

        // Pre-Tax Loan (Mortgage)
        const purchasePriceValue = parseFloat(purchasePrice.value) || 0;
        const loanPercentValue = parseFloat(loanPercent.value) || 0;
        // Always calculate loan amount from purchase price and percentage
        const calculatedLoanAmount = purchasePriceValue * (loanPercentValue / 100);
        loanAmount.value = calculatedLoanAmount.toFixed(2);
        
        const loanAmountValue = parseFloat(loanAmount.value) || 0;
        const interestRateValue = parseFloat(interestRate.value) / 100 / 12;
        const loanTermValue = parseFloat(loanTerm.value) * 12;
        let mortgagePaymentValue = 0;
        if (loanTermValue > 0 && interestRateValue > 0 && loanAmountValue > 0) {
            mortgagePaymentValue = loanAmountValue * interestRateValue * Math.pow(1 + interestRateValue, loanTermValue) / (Math.pow(1 + interestRateValue, loanTermValue) - 1);
        }
        mortgagePayment.value = mortgagePaymentValue.toFixed(2);

        // Post-Tax Loan (Inventory)
        const inventoryAmountValue = parseFloat(inventoryAmount.value) || 0;
        const termLoanPercentValueVal = parseFloat(termLoanPercent.value) || 0;
        termLoanPercentValue.textContent = `${termLoanPercentValueVal}%`;
        const calculatedTermLoanAmount = inventoryAmountValue * (termLoanPercentValueVal / 100);
        termLoanAmount.value = calculatedTermLoanAmount.toFixed(2);
        revolvingCreditAmount.value = (inventoryAmountValue - calculatedTermLoanAmount).toFixed(2);

        // Use term loan term and rate for calculation
        const termLoanTermValue = parseFloat(termLoanTerm.value) * 12;
        const termLoanRateValue = parseFloat(termLoanRate.value) / 100 / 12;
        let termLoanPaymentValue = 0;
        if (termLoanTermValue > 0 && termLoanRateValue > 0 && calculatedTermLoanAmount > 0) {
            termLoanPaymentValue = calculatedTermLoanAmount * termLoanRateValue * Math.pow(1 + termLoanRateValue, termLoanTermValue) / (Math.pow(1 + termLoanRateValue, termLoanTermValue) - 1);
        }
        termLoanPayment.value = termLoanPaymentValue.toFixed(2);

        // Summary
        const totalGrossProfit = calculatedStoreProfit + calculatedGasProfit;
        grossProfit.textContent = formatCurrency(totalGrossProfit);

        const annualMortgagePayment = mortgagePaymentValue * 12;
        const grossProfitAfterMortgage = totalGrossProfit - annualMortgagePayment;
        grossProfitAfterTax.textContent = formatCurrency(grossProfitAfterMortgage);

        const annualTermLoanPayment = termLoanPaymentValue * 12;
        const finalCashInHand = grossProfitAfterMortgage - totalExpenses - annualTermLoanPayment;
        cashInHand.textContent = formatCurrency(finalCashInHand);

        // Tax Planning
        const numberOfPartnersValue = parseFloat(numberOfPartners.value) || 1;
        const corporateTaxAmount = finalCashInHand * 0.11;
        const afterCorporateTax = finalCashInHand - corporateTaxAmount;
        const dividendTaxAmount = afterCorporateTax * 0.11;
        const netCashAfterTaxAmount = afterCorporateTax - dividendTaxAmount;
        const salaryPerPartnerAmount = finalCashInHand / numberOfPartnersValue;
        const netCashPerPartnerAmount = netCashAfterTaxAmount / numberOfPartnersValue;

        corporateTax.textContent = formatCurrency(corporateTaxAmount);
        dividendTax.textContent = formatCurrency(dividendTaxAmount);
        netCashAfterTax.textContent = formatCurrency(netCashAfterTaxAmount);
        salaryPerPartner.textContent = formatCurrency(salaryPerPartnerAmount);
        if (partnerCount) partnerCount.textContent = numberOfPartnersValue;
        if (partnerCount2) partnerCount2.textContent = numberOfPartnersValue;
        if (netCashPerPartner) netCashPerPartner.textContent = formatCurrency(netCashPerPartnerAmount);
    }

    function addExpenseField() {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <input type="text" placeholder="Expense Name" class="expense-name">
            <input type="number" placeholder="Amount" class="expense-amount">
            <button class="remove-expense">Remove</button>
        `;
        expensesList.appendChild(expenseItem);
        expenseItem.querySelector('.remove-expense').addEventListener('click', () => {
            expenseItem.remove();
            calculate();
        });
        expenseItem.querySelectorAll('input').forEach(input => input.addEventListener('input', calculate));
    }

    addExpense.addEventListener('click', addExpenseField);

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', calculate);
    });

    document.querySelectorAll('.remove-expense').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            calculate();
        });
    });

    calculate(); // Initial calculation
});

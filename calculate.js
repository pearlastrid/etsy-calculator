function calculateFees() {
    //Add hard values from the HTML form together
    let totalSale = parseFloat(document.getElementById('listingPrice').value) * parseFloat(document.getElementById('numItems').value) + 
                    parseFloat(document.getElementById('shippingCharge').value) + 
                    parseFloat(document.getElementById('giftWrapping').value);
    let expenses = parseFloat(document.getElementById('numItems').value) * 0.20 + 
                    parseFloat(document.getElementById('etsyAds').value) + 
                    parseFloat(document.getElementById('itemCost').value) + 
                    parseFloat(document.getElementById('shippingCost').value);
    //extract values from <select> elements
    const offsiteAds = document.getElementById('offsiteAds');
    //if else blocks to determine the calculations for each <select> option
    if (offsiteAds.options[offsiteAds.selectedIndex].value === 'None') {
        expenses += 0.05 * totalSale;
    }
    else if (offsiteAds.options[offsiteAds.selectedIndex].value === '12%') {
        expenses += (0.05 + 0.12) * totalSale;
    }
    else {
        expenses += (0.05 + 0.15) * totalSale
    }
    //extract values from <select> elements
    const paymentMethod = document.getElementById('paymentMethod');
    const state = document.getElementById('buyerState');
    //determine the average combined sales tax for the state selected
    let stateSalesTax = (parseFloat(state.options[state.selectedIndex].value)) / 100 + 1;
    //if else to determine the calculations for each <select> option
    if (paymentMethod.options[paymentMethod.selectedIndex].value === 'Etsy Payments') {
        expenses += (totalSale * stateSalesTax) * 0.03 + 0.25;
    }
    else {
        expenses += (totalSale * stateSalesTax) * 0.029 + 0.30;
    }
    //calculate profit
    let profit = totalSale - expenses;
    //profit margin = gross profit / revenue * 100
    //what is counted as revenue is the listing price, according to Etsy
    /* listing price on Etsy must be between [0.20, 50,000], so no divide by
    zero error will occur. (assuming that the user entered the listing price correctly) */
    let profitMargin = profit / (parseFloat(document.getElementById('listingPrice').value) * parseFloat(document.getElementById('numItems').value)) * 100;
    //round all final results to 2 decimal places
    profit = profit.toFixed(2);
    expenses = expenses.toFixed(2);
    profitMargin = profitMargin.toFixed(2);
    //change inner HTML of result elements
    document.getElementById('grossProfit').innerHTML = `Gross Profit: ${profit}`;
    document.getElementById('totalFees').innerHTML = `Total Expenses: ${expenses}`;
    /* very good profit margin for Etsy: greater than 45%
    good profit margin for Etsy: (30%, 45%]
    fair profit margin for Etsy: (15%, 30%]
    poor profit margin for Etsy: 15% or less
    color code accordingly*/
    document.getElementById('profitMargin').innerHTML = `Profit Margin: ${profitMargin}%`;
    if (profitMargin > 45) {
        document.getElementById('profitMargin').style.color = '#00802b';
    }
    else if (profitMargin > 30) {
        document.getElementById('profitMargin').style.color = '#00cc00';
    }
    else if (profitMargin > 15) {
        document.getElementById('profitMargin').style.color = '#d5ff80';
    }
    else {
        document.getElementById('profitMargin').style.color = '#ffff00';
    }              
}

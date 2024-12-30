function getCFdetails(codstatus, isOnlyCurrency) {
    var type = '';
    var searchString = '';
    
    // Get the value of the select element for SGR code
    var selectSgrCode = document.getElementById("selectsgr_code");
    if (selectSgrCode && selectSgrCode.value !== '') {
        searchString = selectSgrCode.value;
    } else {
        // Get the value of the select element for LE code
        var selectLeCode = document.getElementById("selectle_code");
        if (selectLeCode && selectLeCode.value !== '') {
            searchString = selectLeCode.value;
        }
    }

    if (searchString !== '') {
        // Create hidden input in the DOM if currencyForm doesn't exist
        var onlyCurrencyFlag = document.getElementById('only_currency_flag');
        if (!onlyCurrencyFlag) {
            onlyCurrencyFlag = document.createElement('input');
            onlyCurrencyFlag.type = 'hidden';
            onlyCurrencyFlag.id = 'only_currency_flag';
            // Add directly to document body if form doesn't exist
            document.body.appendChild(onlyCurrencyFlag);
        }
        onlyCurrencyFlag.value = isOnlyCurrency ? 'true' : 'false';

        // Update radio selection
        var radioButtons = document.getElementsByName('codtype_cdt');
        radioButtons.forEach(function(radio) {
            if (isOnlyCurrency) {
                // Select 'only currency' radio button
                radio.checked = (radio.id === 'only_currency');
            } else if (radio.value === codstatus.toString()) {
                // Select the radio button matching the codstatus value
                radio.checked = true;
            } else {
                // Ensure other radio buttons remain unchecked
                radio.checked = false;
            }
        });

        // Ensure correct currency is selected for the second radio button
        if (codstatus === 2) {
            var currencyInput = document.getElementById('currency_input');
            if (currencyInput) {
                currencyInput.value = searchString; // Set the currency based on the search string
            }
        }

        getBasicDetails('', searchString, codstatus);
    }
}
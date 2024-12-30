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
        // Store the isOnlyCurrency flag in a hidden input
        var onlyCurrencyFlag = document.getElementById('only_currency_flag');
        if (!onlyCurrencyFlag) {
            onlyCurrencyFlag = document.createElement('input');
            onlyCurrencyFlag.type = 'hidden';
            onlyCurrencyFlag.id = 'only_currency_flag';
            document.getElementById('currencyForm').appendChild(onlyCurrencyFlag);
        }
        onlyCurrencyFlag.value = isOnlyCurrency ? 'true' : 'false';

        // Pull currency details if a search string exists
        getBasicDetails(type, searchString, codstatus);
    }
}

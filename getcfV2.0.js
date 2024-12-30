function getCFdetails(codstatus, isOnlyCurrency) {
    var searchString = '';
    var selectSgrCode = document.getElementById("selectsgr_code");
    var selectLeCode = document.getElementById("selectle_code");
    
    if (selectSgrCode && selectSgrCode.value !== '') {
        searchString = selectSgrCode.value;
    } else if (selectLeCode && selectLeCode.value !== '') {
        searchString = selectLeCode.value;
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
        getBasicDetails('', searchString, codstatus);
    }
}

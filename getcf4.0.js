function getCFdetails(codstatus, isOnlyCurrency) {
    var type = '';
    var searchString = '';

    // Get the value of the select element for SGR code
    var selectSgrCode = document.getElementById("selectsgr_code");
    if (selectSgrCode && selectSgrCode.value!== '') {
        searchString = selectSgrCode.value;
    } else {
        // Get the value of the select element for LE code
        var selectLeCode = document.getElementById("selectle_code");
        if (selectLeCode && selectLeCode.value!== '') {
            searchString = selectLeCode.value;
        }
    }

    if (searchString!== '') {
        // Create hidden input in the DOM if currencyForm doesn't exist
        var onlyCurrencyFlag = document.getElementById('only_currency_flag');
        if (!onlyCurrencyFlag) {
            onlyCurrencyFlag = document.createElement('input');
            onlyCurrencyFlag.type = 'hidden';
            onlyCurrencyFlag.id = 'only_currency_flag';
            // Add directly to document body if form doesn't exist
            document.body.appendChild(onlyCurrencyFlag);
        }
        onlyCurrencyFlag.value = isOnlyCurrency? 'true' : 'false';

        // var radioButtons = document.getElementsByName('codtype_cdt');
        // for (var i = 0; i < radioButtons.length; i++) {
        //     radioButtons[i].checked = false;
        // }

        if (isOnlyCurrency) {
            document.getElementById('only_currency').checked = true;
        } else {
            for (var i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].value === codstatus.toString() && radioButtons[i].id!== 'only_currency') {
                    radioButtons[i].checked = true;
                    break;
                }
            }
        }

        getBasicDetails('', searchString, codstatus);
    }
}

function getBasicDetails(type, codspm, codstatus) {
    // Set codstatus to an empty string if it's not provided
    codstatus = codstatus || '';

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xmlhttp = new XMLHttpRequest();
    } else {
        alert("Your browser does not support AJAX.");
        return;
    }

    // Set up the callback function
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response;
            try {
                response = JSON.parse(xmlhttp.responseText);
            } catch (e) {
                alert("Error parsing JSON response: " + e.message);
                return;
            }

            if (response.id === 'None') {
                // Disable radio buttons and clear old currency
                var codtypeInputs = document.getElementsByName('codtype_cdt');
                for (var i = 0; i < codtypeInputs.length; i++) {
                    codtypeInputs[i].disabled = true;
                    codtypeInputs[i].checked = false;
                }
                document.getElementById('oldcurrency').innerHTML = "";
                alert("No credit files available!");
            } else {
                var first = 0;
                var newarr = [25, 26];  // Status codes remain the same

                for (var i = 0; i < response.length; i++) {
                    var item = response[i];

                    // Filter out existing status codes
                    for (var j = 0; j < newarr.length; j++) {
                        if (newarr[j] == item.CODSTATUS) {
                            newarr.splice(j, 1);
                        }
                    }

                    // Update the first credit file
                    if (first == 0) {
                        document.getElementById('oldcurrency').innerHTML = item.CODCUR;
                        var codtypeInputs = document.getElementsByName('codtype_cdt');
                        for (var k = 0; k < codtypeInputs.length; k++) {
                            if (codtypeInputs[k].value == item.CODSTATUS) {
                                // Enable all radio buttons with matching status code
                                codtypeInputs[k].disabled = false;

                                // Only check the first matching radio button
                                if (k === 0) {
                                    codtypeInputs[k].checked = true;
                                }
                            }
                        }
                        first++;
                    }

                    // Enable all radio buttons with matching status
                    var codtypeInputsAll = document.getElementsByName('codtype_cdt');
                    for (var l = 0; l < codtypeInputsAll.length; l++) {
                        if (codtypeInputsAll[l].value == item.CODSTATUS) {
                            codtypeInputsAll[l].disabled = false;
                        }
                    }
                }

                // Handle remaining status codes
                if (newarr.length > 0 && codstatus === '') {
                    var codtypeInputsAgain = document.getElementsByName('codtype_cdt');
                    for (var m = 0; m < codtypeInputsAgain.length; m++) {
                        if (codtypeInputsAgain[m].value == newarr[0]) {
                            codtypeInputsAgain[m].disabled = true;
                        }
                    }
                }

                // Always enable "Only Currency without limits" radio if status 26 is available
                if (response.some(item => item.CODSTATUS == '26')) {
                    document.getElementById('only_currency').disabled = false;
                }
            }
        }
    };

    var params = "searchType=FetchCFdetails&searchString=" + encodeURIComponent(codspm);
    if (codstatus!== '') {
        params += "&codstatus=" + encodeURIComponent(codstatus);
    }

    xmlhttp.open("POST", "dbe_cfl_ModifyCurrency_Save.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
}

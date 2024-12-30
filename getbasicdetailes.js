// Function to handle credit file details retrieval

function getBasicDetails(type, codspm, codstatus, updateType) {
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
                var codtypeInputs = document.getElementsByName('codtype_cdt');
                for (var i = 0; i < codtypeInputs.length; i++) {
                    codtypeInputs[i].disabled = true;
                    codtypeInputs[i].checked = false;
                }
                document.getElementById('oldcurrency').innerHTML = "";
                alert("No credit files available!");
            } else {
                var first = 0;
                var newarr = [25, 26];

                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    
                    for (var j = 0; j < newarr.length; j++) {
                        if (newarr[j] == item.CODSTATUS) {
                            newarr.splice(j, 1);
                        }
                    }

                    if (first == 0) {
                        document.getElementById('oldcurrency').innerHTML = item.CODCUR;
                        var codtypeInputs = document.getElementsByName('codtype_cdt');
                        for (var k = 0; k < codtypeInputs.length; k++) {
                            if (codtypeInputs[k].value == item.CODSTATUS) {
                                codtypeInputs[k].checked = true;
                                codtypeInputs[k].disabled = false;
                            }
                        }
                        first++;
                    }

                    var codtypeInputsAll = document.getElementsByName('codtype_cdt');
                    for (var l = 0; l < codtypeInputsAll.length; l++) {
                        if (codtypeInputsAll[l].value == item.CODSTATUS) {
                            codtypeInputsAll[l].disabled = false;
                        }
                    }
                }

                if (newarr.length > 0 && codstatus === '') {
                    var codtypeInputsAgain = document.getElementsByName('codtype_cdt');
                    for (var m = 0; m < codtypeInputsAgain.length; m++) {
                        if (codtypeInputsAgain[m].value == newarr[0]) {
                            codtypeInputsAgain[m].disabled = true;
                        }
                    }
                }
            }
        }
    };

    var url = "fetchCFdetails.php?searchString=" + codspm;
    if (codstatus !== '') {
        url += "&codstatus=" + codstatus;
    }
    url += "&updateType=" + updateType;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

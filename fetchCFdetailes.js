<?php
function fetchCFdetails() {
    if (!isset($_POST['searchString'])) {
        echo '{"id": "None"}';
        return;
    }

    $searchString = $_POST['searchString'];
    $codstatus = isset($_POST['codstatus']) && $_POST['codstatus'] !== '' ? $_POST['codstatus'] : '25,26';
    
    if ($searchString != '') {
        $OcQuery = "SELECT \"CODSPM\", \"CODFILE\", \"CODCUR\", \"CODSTATUS\" 
                    FROM \"TCDTFILEDBE\" 
                    WHERE \"CODSPM\" = '" . $searchString . "' 
                    AND \"FLAG\" = 'Y' 
                    AND \"CODSTATUS\" IN($codstatus) 
                    ORDER BY \"CODSTATUS\" DESC";
        
        $OcResult = pg_query($OcQuery);
        $OcResultRow = pg_fetch_all($OcResult);
        
        echo $OcResultRow ? json_encode($OcResultRow) : '{"id": "None"}';
    } else {
        echo '{"id": "None"}';
    }
}
?>

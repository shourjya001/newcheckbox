function saveCurrency() {
    $lastComment = base64_encode($_POST['closeComment']);
    $CF_Level = $_POST['CF_Level'];
    $codUsr = $_POST['codUsr'];
    $sub_group_code = isset($_POST['sub_group_code']) ? trim($_POST['sub_group_code']) : trim($_POST['le_code']);
    $curr = $_POST['newcurrency'];
    $txtrate = isset($_POST['txtrate']) ? $_POST['txtrate'] : 0;
    $creditfile_type = $_POST['codtype_cdt'];
    $isOnlyCurrency = isset($_POST['only_currency_flag']) && $_POST['only_currency_flag'] === 'true';
    
    if ($sub_group_code != '') {
        $result_Line = false;
        $result_Line2 = true; // Set to true by default for only currency case
        
        // Update TSPMDBE through SPU_TSPMCURDBE (always runs)
        $query_Line = "SELECT FROM dbo.\"SPU_TSPMCURDBE\"('" . 
            $sub_group_code . "','" . 
            $curr . "','" . 
            $txtrate . "'," . 
            $codUsr . ",'" . 
            $lastComment . "','" . 
            $CF_Level . "', " . 
            $creditfile_type . ")";
            
        $result_Line = pg_query($query_Line);
        
        // Update TLINERIADBE only if not Only Currency case
        if (!$isOnlyCurrency) {
            $query_Line2 = "SELECT FROM dbo.\"SPU_LIMITS_TLINERIADBE\"('" . 
                $sub_group_code . "', " . 
                $creditfile_type . ", " . 
                $codUsr . ")";
                
            $result_Line2 = pg_query($query_Line2);
        }
        
        if ($result_Line && $result_Line2) {
            echo '{"id":"success"}';
        } else {
            echo '{"id":"fail"}';
        }
    } else {
        echo '{"id":"fail"}';
    }
}

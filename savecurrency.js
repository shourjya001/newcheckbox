function saveCurrency() {
    $lastComment = base64_encode($_POST['closeComment']);
    $CF_Level = $_POST['CF_Level'];
    $codusr = $_POST['codUsr'];
    $sub_group_code = isset($_POST['sub_group_code']) ? trim($_POST['sub_group_code']) : trim($_POST['le_code']);
    $txtrate = isset($_POST['txtrate']) ? $_POST['txtrate'] : 0;
    $curr = $_POST['newcurrency'];
    $creditfile_type = $_POST['codtype_cdt'];
    $update_type = $_POST['update_type'] ?? 'full'; // New parameter
    
    if ($sub_group_code != '') {
        // Always update currency in TSPMDBE and TCDTFILEDBE
        $query_Line = "select from dbo.\"SPU_TSPMCURDBE\"('" . 
            $sub_group_code . "','" . 
            $curr . "','" . 
            $txtrate . "'," . 
            $codusr . ",'" . 
            $lastComment . "','" . 
            $CF_Level . "', " . 
            $creditfile_type . ")";
        
        $result_Line = pg_query($query_Line);
        
        // Only update TLINERIADBE for full updates
        if ($update_type === 'full') {
            $query_Line2 = "select from dbo.\"SPU_LIMITS_TLINERIADBE\"('" . 
                $sub_group_code . "', " . 
                $creditfile_type . ", " . 
                $codusr . ")";
            $result_Line2 = pg_query($query_Line2);
            
            if ($result_Line && $result_Line2) {
                echo '{"id":"success"}';
            } else {
                echo '{"id":"fail"}';
            }
        } else {
            // Only check currency update result
            if ($result_Line) {
                echo '{"id":"success"}';
            } else {
                echo '{"id":"fail"}';
            }
        }
    } else {
        echo '{"id":"fail"}';
    }
}

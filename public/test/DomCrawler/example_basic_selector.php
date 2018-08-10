<!--
    <tr role="row" class="odd">
        <td tabindex="0" class="">
            <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat"
                                                                                 name="events[]" value="13594"
                                                                                 style="position: absolute; opacity: 0;">
                <ins class="iCheck-helper"
                     style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
            </div>
        </td>
        <td class="">Welcome to the Trashformers Show!</td>
        <td>Kookoo Live Music Bar</td>
        <td>Πάρτι</td>
        <td class="">2016-12-31</td>
        <td>2016-12-31</td>
        <td class="sorting_1">2016-11-22</td>
        <td>23:30</td>
        <td>06:30</td>
        <td style="display: none;">https://www.facebook.com/events/107690316373822/</td>
        <td style="display: none;">


            <p>Το 2004 η μουσική πέθανε και από τις στάχτες της γεννήθηκαν οι Trashformers! <br>(ώπα ρε rise of the
                phoenix...)</p>
            <p>Τι είναι οι Trashformers?<br>Για κάποιον μπορεί να είναι τα παιδικά του χρόνια.<br>Για κάποιον το mixtape που
                είχε φτιάξει στην κοπέλα που ήταν ερωτευμένος.<br>Για κάποια οι αφίσες από το σούπερ Κατερίνα από Backstreet
                Boys μέχρι και Ρουβά.<br>Για κάποιους δυόμιση δεκαετίες πανέμορφης μουσικής που ποτέ δεν γνώρισαν.<br>Για
                όλους τα δάκρυα στα μάτια μας όταν είχε πεθάνει ο Mufasa στο Lion King.</p>
            <p>Τί κάνουν τα 80ς τα 90ς και τα early 00ς τόσο σημαντικά στη διασκέδαση μας?<br>Είναι νοσταλγία? <br>Είναι
                τρόπος ζωής?<br>Ένας εναλλακτικός τρόπος διασκέδασης? <br>Μία ακόμη μόδα? (Δε νομίζω Τάκη!)</p>
            <p>Ας το ανακαλύψουμε σε μια βραδιά που όπως λένε οι φήμες…<br>1) Νοσταλγούμε<br>2) Διασκεδάζουμε<br>3)
                Χορεύουμε<br>3) Ιδρώνουμε<br>2) Ερωτευόμαστε<br>1) Ένα...</p>
            <p>...Ένα μοναδικό Show-Party που συνδυάζει μουσική, προβολές, τραγούδι, χορό, γέλιο, τρέλα και δημιουργεί τις
                μελλοντικές μας αναμνήσεις!<br>Είστε έτοιμοι να ζήσετε την πιο αξέχαστη βραδιά της ζωής σας?</p>
            <p>Το event ξεκινάει στις 23:37 που παίζουν οι πιο όμορφες μουσικές από τα παλιά.<br>Το event τελειώνει στις...
                αργάμιση που δεν θέλουμε αυτή η νύχτα να τελειώσει ποτέ!</p>
            <p>Σάββατo 5, 19 Νοεμβρίου / 3, 17, 31 Δεκεμβρίου<br>είσοδος με κρασί/μπίρα: 8€ / κρατήσεις στο 2103450930</p>

        </td>
    </tr>
-->
<?php
use Night\Database\DB;

require('simple_html_dom.php');

$html = new simple_html_dom();
$html->load_file(__DIR__.'/backup.html');

$db = new DB();


$data = [];
foreach ($html->find('tr') as $row)
{

    /**
     * 1 => title
     * 2 => venue_name
     * 3 => type
     * 4 => start_date
     * 5 => end_date
     * 6 => date_created
     * 7 => start_time
     * 8 => end_time
     * 9 => source_url
     * 10=> description
    */
    $data[] = $row->children(1)->plaintext;
    $data[] = $row->children(2)->plaintext;
    $data[] = $row->children(3)->plaintext;
    $data[] = $row->children(4)->plaintext;
    $data[] = $row->children(5)->plaintext;
    $data[] = $row->children(6)->plaintext;
    $data[] = $row->children(7)->plaintext;
    $data[] = $row->children(8)->plaintext;
    $data[] = $row->children(9)->plaintext;
    $data[] = $row->children(10)->plaintext . " ";
//    d($data);

    $result = $db->addBackupEvent($data);
    if ($result['success'] == true)
    {
        echo "<div style='color: green'>" . $result['message'] . "<div>";
    }
    else
    {
        echo "<div style='color: red'>" . $result['message'] . "<div>";
    }

    $data = [];
}



//$db->addEvent($data);

?>
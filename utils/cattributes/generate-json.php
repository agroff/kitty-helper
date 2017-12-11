<?php
// Assuming you installed from Composer:
require "vendor/autoload.php";
use PHPHtmlParser\Dom;

date_default_timezone_set( 'America/Los_Angeles' );


/**********************************************************
 * Quick and dirty php script to generate cattribute API
 **********************************************************/

echo date( 'Y-m-d h:ia' ) . " Fetching Kitties...";

function downloadFile(){
    $url = 'http://www.kittyexplorer.com/';
    $url = 'http://www.kittyexplorer.com/?src=kitty-helper-cron&contact=andrew.p.groff@gmail.com&url=http://bit.ly/2nTh68b';

    $html = file_get_contents( $url );

    file_put_contents( 'index.html', $html );
}

function regexExtractFirst($regex, $string, $default = false){
    preg_match( $regex, $string, $matches );

    if( !empty($matches[1])){
        return $matches[1];
    }

    return $default;
}

function dbg($thing){
    print_r($thing);
}

downloadFile();


$dom = new Dom;
$dom->loadFromFile( 'index.html' );
$firstH3 = $dom->find( 'h3' )[0];

$totalKitties = regexExtractFirst('/(\d+)/', $firstH3->innerHTML);

$allLinks = $dom->find("a");

$cattributes = array();
$fancyTypes = array();

foreach ($allLinks as $link) {
    $href = trim($link->getAttribute( 'href' ));

    $cattribute = regexExtractFirst('/\\/kitties\\/\\?cattributes=(.+)$/', $href);
    if($cattribute !== false){
        $count = $link->find("span")->innerHTML;

        $cattributes[$cattribute] = array(
            "name" => $cattribute,
            "count" => $count * 1,
            //this was getting some floating point errors as a number when json encoded
            "percent" => "". round (($count / $totalKitties) * 100, 3)
        );
    }

    $fancyType = regexExtractFirst( '/\\/kitties\\/\\?fancy=(.+)$/', $href );
    if ($fancyType !== false) {

        $count = $link->find( "span" )->innerHTML;


        $fancy = array(
            "name"    => $fancyType,
            "count"   => $count * 1,
            //this was getting some floating point errors as a number when json encoded
            "percent" => "" . round( ( $count / $totalKitties ) * 100, 3 )
        );


        $fancyTypes[$fancyType] = $fancy;
    }

}



$allData = array(
    "kittyexplorer" => array(
        "total" => $totalKitties,
        "fancy_types" => $fancyTypes,
        "cattributes" => $cattributes
    )
);

if($totalKitties > 100000){
    $json = json_encode( $allData, JSON_PRETTY_PRINT );

    file_put_contents( 'kittyexplorer.json', $json );
}
else {
    echo " ERROR! ";
}


echo " Done: " . $totalKitties . " kitties \n";


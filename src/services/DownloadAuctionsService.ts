import { Singleton, AutoWired } from 'typescript-ioc';
import Auction from '../models/Auction';
import * as $ from "jquery";

@Singleton 
@AutoWired 
class DownloadAuctionsService {

    process(link: URL, onProcess: (resut: Auction[]) => void): void {
        
        this.downloadXML(link, (dat) => {
            onProcess(this.extractData(dat));
        });
    }

    downloadXML(link: URL, onDownload: (data: JQuery.Node[] | null) => void): void {
        if (link == null) {
            throw "Link is null";
        }
        
        $.ajax({
            url: link.href,
            method: "GET",
            contentType: "text/html; charset=iso-8859-2",
            crossDomain: true,
            error: () => console.log("HTML file has been incorrectly downloaded!"),
            success: (result) => {
                onDownload($.parseHTML(result, null, false))
            }
        });
    }

    extractData(data: JQuery.Node[] | null): Auction[] {
        if (data == null || data.length == 0) throw "XMLDocument is null";

        let items: Auction[] = [];

        $(data).find("div.promobox,div.normalbox").each(function() {
            let title = $(this).find("div.promobox-title-left,div.normalbox-title-left a");
            let date = $(this).find("p.promobox-more,p.normalbox-more span b").text();
            let prize = $(this).find("div.promobox-title-left2,div.normalbox-title-left2 b").text();
            let image = $(this).find("div.promobox-body-left,div.normalbox-body-left a img");
            let desc = $(this).find("div.promobox-body-right,div.normalbox-body-right").text();

            console.log(image? "http://rzeszowiak.pl" + image.attr("src") : "");

            items.push({
                title: title.text().substr(3),
                link: title? new URL("http://rzeszowiak.pl" + title.attr("href")) : null,
                image_src: image? "http://rzeszowiak.pl" + image.attr("src") : "",
                date : date,
                prize : prize? Number(prize.split(' ')[1]) : 0,
                description : desc
            });
        });
       
        return items;
    }
}

export default DownloadAuctionsService;
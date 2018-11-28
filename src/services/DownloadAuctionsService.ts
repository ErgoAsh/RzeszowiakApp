import Auction, { AuctionType } from '../models/Auction';
import * as $ from "jquery";

class DownloadAuctionsService {

    process(link: URL, onProcess: (result: Auction[], hasNextPage: boolean) => void): void {
        
        this.downloadXML(link, (data) => {
            if (data == null || data.length == 0) throw "XMLDocument is null";

            onProcess(this.extractData(data), this.hasNextPage(data));
        });
    }

    downloadXML(link: URL, onDownload: (data: JQuery.Node[] | null) => void): void {
        if (link == null) {
            throw "Link is null";
        }
        
        $.ajax({
            url: link.href,
            method: "GET",
            crossDomain: true,
            contentType: 'Content-type: text/plain; charset=iso-8859-2',
            error: () => console.log("HTML file has been incorrectly downloaded!"),
            beforeSend: (request) =>
                request.overrideMimeType('text/html;charset=iso-8859-2'),
            success: (result) => {
                onDownload($.parseHTML(result, null, false))
            }
        });
    }

    extractData(data: JQuery.Node[]): Auction[] {
        let items: Auction[] = [];

        $(data).find("div.promobox,div.normalbox").each(function() {
            let type: AuctionType;

            if ($(this).find("div.promobox-top").length != 0) type = AuctionType.Promo;
            else if ($(this).find("div.specjalnebox-top").length != 0) type = AuctionType.Special;
            else if ($(this).find("div.normalbox-top").length != 0) type = AuctionType.Normal;
            else throw "Not found a type";

            let title = $(this).find("div.promobox-title-left a,div.normalbox-title-left a");
            let date = $(this).find("p.promobox-more span b,p.normalbox-more span b").text();
            let prize = $(this).find("div.promobox-title-left2,div.normalbox-title-left2").text();
            let image = $(this).find("div.promobox-body-left a img,div.normalbox-body-left a img");
            let desc = $(this).find("div.promobox-body-right,div.normalbox-body-right").text();

            items.push({
                title: title.text(),
                link: title? new URL("http://rzeszowiak.pl" + title.attr("href")) : null,
                image_src: image? "http://rzeszowiak.pl" + image.attr("src") : "",
                date : date,
                prize : prize? Number(prize.split(' ')[1]) : 0,
                description : desc,
                type: type
            });
        });
       
        return items;
    }

    hasNextPage(data: JQuery.Node[]): boolean {
        let index = $(data).find("div#oDnno").find("span.oDna").index();
        console.log(index);
        let item = $(data).children().eq(index + 1);
        console.log(item);
        if (item != null && item.hasClass("oDnn")) 
            return true;
        
        return false;
    }
}

/* function() {
            if (!found) {
                console.log($(this));
                if ($(this).hasClass("oDna"))
                    found = true;
            } else {
                console.log("found");
                if ($(this).hasClass("oDnn")) 
                    result = true;
            }
        } */

export default DownloadAuctionsService;
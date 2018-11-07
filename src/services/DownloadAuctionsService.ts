import { Singleton, AutoWired } from 'typescript-ioc';
import Auction from "../models/Auction";

@Singleton 
@AutoWired 
class DownloadAuctionsService {

    process(link: URL, onProcess: (resut: Auction[]) => void): void {
        
        this.downloadXML(link, (dat) => {
            onProcess(this.extractData(dat));
        });
    }

    downloadXML(link: URL, onDownload: (data: XMLDocument | null) => void): void {
        if (link == null) {
            throw "Link is null";
        }

        let xhttp: XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(xhttp.responseText, "application/xml");
                onDownload(xmlDoc);
            }
        }
        xhttp.open("GET", link.href, true);
        xhttp.overrideMimeType('text/xml; charset=iso-8859-2');
        xhttp.setRequestHeader('Access-Control-Allow-Origin','http://www.rzeszowiak.pl/');
        xhttp.send();
    }

    extractData(data: XMLDocument | null): Auction[] {
        if (data == null) throw "XMLDocument is null";

        let items: Auction[] = [];

        //TODO find in normalbox
        //TODO find in promobox

        let auctions = data.evaluate("//div[contains(@class, 'prmobox')] | //div[contains(@class, 'normalbox')]", data, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        try {        
            let item = auctions.iterateNext();
            while (item) {
                console.log("OK");
                let title = data.evaluate("./promobox-title-left/a/@href | ./normalbox-title-left/a/@href", item, null, XPathResult.STRING_TYPE, null);
                let link = data.evaluate("./promobox-title-left/a::text() | ./normalbox-title-left/a::text()", item, null, XPathResult.STRING_TYPE, null);

                items.push({
                    title : title.stringValue,
                    link: new URL(link.stringValue),
                    image: null, //TODO?
                    date : new Date(),
                    prize : 1,
                    description : "Desc"
                });
            }
        } catch (e) {
            console.log(e);
        }
        
        console.log(items.length);
       
        return items;
    }
}

export default DownloadAuctionsService;
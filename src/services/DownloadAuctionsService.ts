import Auction from "../models/Auction";
import { Singleton, AutoWired } from 'typescript-ioc';

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
                //console.warn(xhttp.respon);
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
        let auction: HTMLCollectionOf<Element> = data.getElementsByClassName("promobox");

        //TODO find in normalbox
        //TODO find in promobox

        for (let i: number = 0; i < auction.length; i++) {

            let titleNode: Element | null = auction[i].getElementsByClassName("promobox-title-left")[0].firstElementChild;
            let link: string | null = titleNode? "http://rzeszowiak.pl" + titleNode.getAttribute("href") : null;

            console.log(link);

            items.push({
                title : titleNode? titleNode.textContent : null,
                link: link? new URL(link) : null,
                image: null, //TODO?
                date : new Date(),
                category : "Cate",
                prize : 1,
                description : "Desc"
            });
        }
        console.warn(items.length);
        return items;
    }
}

export default DownloadAuctionsService;
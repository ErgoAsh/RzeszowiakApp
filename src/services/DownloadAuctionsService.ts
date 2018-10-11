import "../models/Auction";

class DownloadAuctionsService {

    process(link: URL): Array<Auction> {
        let array: Array<Auction> = new Array<Auction>();
        this.downloadXML(link, (dat) => array = this.extractData(dat));
        return array;
    }

    downloadXML(link: URL, onDownload: (data: XMLDocument | null) => void): void {
        let data: XMLDocument | null = null;

        if (link == null) {
            throw "Link is null";
        }

        let xhttp: XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
               data = xhttp.responseXML;
               onDownload(data);
            }
        }
        xhttp.open("GET", link.toString(), true);
        xhttp.send();
    }

    extractData(data: XMLDocument | null): Array<Auction> {
        if (data == null) throw "XMLDocument is null";

        let items: Array<Auction> = new Array<Auction>();
        let auction: HTMLCollectionOf<Element> = data.getElementsByClassName("promobox");

        for (let i: number = 0; i < auction.length; i++) {

            let titleNode: Node | null = auction[i].getElementsByClassName("promobox-title-left")[0].firstChild;

            items.push({
                title : titleNode? titleNode.textContent : null,
                link: new URL(""),
                image: new ImageBitmap(),
                date : new Date(),
                category : "Cate",
                prize : 1,
                description : "Desc"
            });
        }

        return items;
    }
}

export default DownloadAuctionsService;
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-shop-cards-container',
  templateUrl: './home-shop-cards-container.component.html',
  styleUrls: ['./home-shop-cards-container.component.scss'],
})
export class HomeShopCardsContainerComponent implements OnInit {

  cards = [];
  private _status: DataStatus = "loading";
  isLoading = true;
  hasData = false;

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.getCategories();
  }
  
  ionViewWillEnter() {
  }

  getCategories(params?: any) {
    this.http.get("https://allin1shopapi.com.ng/mainapi/sitelogic/viewapi/homepage.ashx", {
      params: params ?? {
        updatetype: 1,
        userid: 0,
        postid: 1,
        qstring: "",
        price: 0,
        priceb: 0,
        lat: "",
        long: "",
        location: "",
        goodsstatus: "",
        shopid: "0",
        pagenum: "1",
        pagesize: "50"
      }
    }).toPromise()
    .then((res: any) => {
      if(res?.post != null && res.post.length > 1) {
        this.status = "loaded";
        this.cards = res?.postc ?? [];
      }

    }, (err) => {
      this.status = "error";
    })
    .finally(() => {
      this.isLoading = false;
    })
  }

  refresh() {
    this.isLoading = true;
    this.getCategories();
  }

  async showErrorMessage(message?: string) {
    const alert = await this.alertCtrl.create({
      buttons: [
        { text: "Dismiss", role: "cancel" },
      ],
      message: message ?? "Something went wrong"
    });

    await alert.present();
  }

  changeStatus(e) {
    this.status = e.detail?.value;
  }
}

type DataStatus = "none" | "loading" | "loaded" | "no-data" | "error";

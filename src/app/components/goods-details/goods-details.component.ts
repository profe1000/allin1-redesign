import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.scss'],
})
export class GoodsDetailsComponent implements OnInit {

  details: any = {};
  cards = [];
  goodsImages: { id: number, image: string, active?: boolean }[] = [];
  goodsId;
  private _status: DataStatus = "loading";
  isLoading = true;
  hasData = false;

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get activeImage() {
    return this.goodsImages.find(img => img.active == true)?.image ?? this.details.featuredimage;
  }

  get profileDetails(): IDetails[] {
    return [
      { key: "Vendor name", value: this.details?.fullname },
      { key: "Shop name", value: this.details?.shopname },
      { icon: "location-sharp", value: this.details?.shoplocation, hasIcon: true },
    ];
  }

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getGoods();
    this.getExtraGoods();
  }

  async getGoodsId() {
    let id: any;
    this.activatedRoute.params
    .subscribe((value) => {
      id = value["id"];
    }, (err) => {

    });

    return id;
  }
  
  ionViewWillEnter() {
  }

  async getGoods(params?: any) {
    const postid = (await this.getGoodsId());

    this.http.get("https://allin1shopapi.com.ng/mainapi/sitelogic/viewapi/viewgoods.ashx", {
      params: params ?? {
        updatetype: 9,
        userid: 0,
        postid,
        qstring: "",
        price: 0,
        priceb: 0,
        lat: "",
        long: "",
        location: "",
        goodsstatus: "",
        shopid: "",
        pagenum: 1,
        pagesize: 10
      }
    }).toPromise()
    .then((res: any) => {
      if(res?.statuscode == 100) {
        this.status = "loaded";

        this.details = res.post[0];
        this.getImages(this.details);
      }
      else if(res.statuscode == 99){
        this.status = "no-data";
      }
      else {
        this.showErrorMessage(res.status);
      }

    }, (err) => {
      this.status = "error";
    })
    .finally(() => {
      this.status = "loaded";

      this.isLoading = false;
    });
  }

  async getExtraGoods(params?: any) {
    const postid = (await this.getGoodsId());

    this.http.get("https://allin1shopapi.com.ng/mainapi/sitelogic/viewapi/viewgoods.ashx", {
      params: params ?? {
        updatetype: 11,
        userid: 0,
        postid,
        qstring: 18,
        price: 0,
        priceb: 0,
        lat: "",
        long: "",
        location: "",
        goodsstatus: "1",
        shopid: "0",
        pagenum: "1",
        pagesize: "6"
      }
    }).toPromise()
    .then((res: any) => {
      if(res?.statuscode == 100) {
        this.cards = res?.post ?? [];
      }

    }, (err) => {
    })
    .finally(() => {
    })
  }

  viewProfile() {
    console.log('view profile');
  }

  call() {
    console.log('call');
  }

  chat() {
    console.log('chat');
  }

  getImages(data: any) {
    this.goodsImages.push({ id: 1, image: data.featuredimage, active: true});

    for (let i = 0; i < 7; i++) {
      const image = data[`subimage${ i }`];
      if(image && image != "noimage") {
        this.goodsImages.push({ id: i + 2, image });
      }
    }
  }

  refresh() {
    this.isLoading = true;
    this.getGoods();
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

interface IDetails{
  value: string,
  key?: string,
  icon?: string,
  hasIcon?: boolean,
}
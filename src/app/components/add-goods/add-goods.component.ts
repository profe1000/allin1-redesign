import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

const requiredField = (c: AbstractControl): { required: boolean } => {
  const value = c.value as string;
  if(value == null) return;

  return value.trim() == '' ? { required: true } : null;
}

export const negativeValidator = (c: AbstractControl): { negative: boolean } => {
  const value = c.value;
  if(value == '') return;
  let valueNo = parseFloat(value);
  if(valueNo < 0) {
    return { negative: true };
  }
}

@Component({
  selector: 'app-add-goods',
  templateUrl: './add-goods.component.html',
  styleUrls: ['./add-goods.component.scss'],
})
export class AddGoodsComponent implements OnInit {

  formGroup = new FormGroup({
    title: new FormControl('', [Validators.required, requiredField]),
    description: new FormControl(''),
    price: new FormControl('',  [ negativeValidator ]),
    negotiable: new FormControl(false),
    goodslocation: new FormControl(''),
    goodsaddress1: new FormControl(''),
  });

  isAdding = false;
  categories = [];
  states = [];
  cities = [];

  get selectedState() {
    return this.states.find(s => this.formGroup.get('shoplocation').value == s.name);
  }

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.getCategories();

    this.getStates();
  }

  addShop() {
    if(this.formGroup.invalid) return;

    const userid = "6453619";

    this.isAdding = true;

    this.http.post("https://allin1shopapi.com.ng/mainapi/sitelogic/addapi/picuploadshopvb.ashx", this.formData).toPromise()
    .then((res: any) => {
      const shopimage = res.imagelocation;

      this.http.get("https://allin1shopapi.com.ng/mainapi/sitelogic/addapi/addshop.ashx", {
        params: {
          ...this.formGroup.value,
          shopimage,
          userid,
          shopcat2: 0,
          shopcat3: 0,
          addressadj: 0,
          lat: this.selectedState?.lat,
          long: this.selectedState?.log,
          email: "",
        }
      }).toPromise()
      .then((res: any) => {
        this.showErrorMessage(res.status);
        this.reset();
      }, (err) => {
        this.showErrorMessage(err.statusText);
      })
      .finally(() => {
        this.isAdding = false;
      })
    }, (err) => {
      this.showErrorMessage(err.statusText);
      this.isAdding = false;
    })
    .finally(() => {
      
    })
  }

  reset() {
    this.isAdding = false;
    this.formGroup.reset();
  }

  getCategories() {
    this.http.get('https://allin1shopapi.com.ng/mainapi/sitelogic/viewapi/viewshopcategory.ashx?', {
      params: {
        updatetype: 1,
        userid: "",
        postid: 1,
        qstring: "",
        pagenum: 1,
        pagesize: 50
      }
    })
    .subscribe((res: any) => {
      if(res?.statuscode == 100) {
        this.categories = res.post ?? [];
      }
    })
  }

  getStates() {
    this.http.get("https://allin1shopapi.com.ng/mainapi/sitelogic/viewapi/nigeriastate2.json")
    .subscribe((res: any) => {
      this.states = res.state;
    })
  }

  
  getCities() {
    this.http.get("https://allin1shopapi.com.ng/mainapi/sitelogic/viewapi/nigeriastate.json")
    .subscribe((res: any) => {
      this.cities = res[0][this.formGroup.get('shoplocation').value];
    });
  }

  formData: FormData;

  onMainChange(event: any) {
    console.log(event);
  }
  
  onOtherChange(event: any) {
    console.log(event);
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
  
}

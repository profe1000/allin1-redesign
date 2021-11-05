import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

const requiredField = (c: AbstractControl): { required: boolean } => {
  const value = c.value as string;
  if(value == null) return;

  return value.trim() == '' ? { required: true } : null;
}

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.scss'],
})
export class EditShopComponent implements OnInit {
  formGroup = new FormGroup({
    shopname: new FormControl('', [Validators.required, requiredField]),
    shopdesc: new FormControl(''),
    shopcat1: new FormControl(''),
    shoplocation: new FormControl(''),
    shopaddress1: new FormControl(''),
    shopaddress2: new FormControl(''),

  });

  initialValue = {
    shopname: "Shop name",
    shopdesc: "Shop description",
    shopcat1: 8,
    shoplocation: "Lagos",
    shopaddress1: "Ikeja",
    shopaddress2: "Okoja Street",
  };

  isAdding = false;
  categories = [];
  states = [];
  cities = [];

  get selectedState() {
    return this.states.find(s => this.formGroup.get('shoplocation').value == s.name);
  }

  stringify(value: any) {
    return JSON.stringify(value, undefined, 4);
  }

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.getCategories();

    this.getStates();
    this.getCities();

    this.populateForm();
  }

  populateForm() {
    this.formGroup.setValue(this.initialValue);
  }

  async getLoginDetails() {
  }

  editShop() {
    if(this.formGroup.invalid || !this.hasUploadedImage) return;

    const userid = "6453619";

    this.isAdding = true;
    
    this.http.post("https://allin1shopapi.com.ng/mainapi/sitelogic/addapi/picuploadshopvb.ashx", this.formData).toPromise()
    .then((res: any) => {
      const shopimage = res.imagelocation;

      const params = {
        ...this.formGroup.value,
        shopid: "192981",
        shopimage,
        userid,
        shopcat2: 0,
        shopcat3: 0,
        addressadj: 0,
        lat: this.selectedState?.lat,
        long: this.selectedState?.log,
        email: "",
      }
  
      
      this.http.get("https://allin1shopapi.com.ng/mainapi/sitelogic/updateapi/editshop.ashx?", { params }).toPromise()
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
    this.imgSrc = null;
    this.isAdding = false;
    this.formGroup.reset();
    this.hasUploadedImage = false;
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
  imgSrc: string;
  hasUploadedImage = false;

  onPictureChange(event: any) {
    var fileList = event.target.files;
    var selectedFile = fileList[0];

    if(!selectedFile) return;
    
    var fileSize = selectedFile.size;

    if (fileSize > (1024 * 5000)){
      this.showErrorMessage("Choose an image below 5MB");
      return;
    }

    this.formData = new FormData();
    Array.from(event.target.files).forEach((file: File) => {
      this.formData.append('photos', file, file.name);
    });


    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
  
      reader.onload = (loadevent:any) => {
        this.imgSrc = loadevent.target.result;
        this.hasUploadedImage = true;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
   
  }

  selectImage() {
    const fileOpener = document.getElementById('pick-picture-epm');
    fileOpener.click();
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

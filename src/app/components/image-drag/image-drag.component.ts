import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, ActionSheetController, isPlatform, ActionSheetOptions } from '@ionic/angular';

@Component({
  selector: 'app-image-drag',
  templateUrl: './image-drag.component.html',
  styleUrls: ['./image-drag.component.scss'],
})
export class ImageDragComponent implements OnInit {

  @Input() header = "Photos";
  @Input() mainImageHeader = "Main Photo";
  @Input() otherImageHeader = "Other Photos";
  @Input() maxImages = 7;

  @Input() mainImgSrc: string;
  mainImgFile: any;
  mainImgFileName: any;
  @Input() hasUploadedMainImage = false;

  @Input() otherImages: IGoodsImages[] = [];

  @Output() mainImageChange = new EventEmitter<any>();
  @Output() otherImageChange = new EventEmitter<any>();

  constructor(
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() {
    this.addImage();
  }

  
  onMainImageChange(event: any) {
    var fileList = event.target.files;
    var selectedFile = fileList[0];

    if(!selectedFile) return;
    
    var fileSize = selectedFile.size;

    if (fileSize > (1024 * 5000)){
      this.showErrorMessage("Choose an image below 5MB");
      return;
    }

    Array.from(event.target.files).forEach((file: File) => {
      this.mainImgFile = file;
      this.mainImgFileName = file.name;
    });


    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
  
      reader.onload = (loadevent:any) => {
        this.mainImgSrc = loadevent.target.result;
        this.hasUploadedMainImage = true;

        this.mainImageChange.emit({
          event,
          data: {
            imageSrc: this.mainImgSrc,
            fileName: this.mainImgFileName,
            file: this.mainImgFile,
            hasImage: this.hasUploadedMainImage,
          }
        });
      }
      reader.readAsDataURL(event.target.files[0]);

      
    }
  }
  
  onOtherImageChange(event: any, imageId: number) {
    
    const image = this.otherImages.find(img => img.id == imageId);
    var fileList = event.target.files;
    var selectedFile = fileList[0];

    if(!selectedFile) return;
    
    var fileSize = selectedFile.size;

    if (fileSize > (1024 * 5000)){
      this.showErrorMessage("Choose an image below 5MB");
      return;
    }

    Array.from(event.target.files).forEach((file: File) => {
      image.file = file;
      image.fileName = file.name;
    });

    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
  
      reader.onload = (loadevent:any) => {
        image.imageSrc = loadevent.target.result;
        image.hasImage = true;

        this.otherImageChange.emit({
          event,
          data: {
            images: this.otherImages
          }
        });
      }
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  addImage() {
    this.otherImages.push({
      id: (this.otherImages[this.otherImages.length - 1]?.id ?? 0) + 1,
    })
  }

  addImageClick() {
    if(this.otherImages.length > (this.maxImages - 1)) {
      this.showErrorMessage(`Maximum of ${ this.maxImages } images can be selected`);
      return;
    }

    if(this.otherImages.some(img => !img.hasImage)) {
      this.showErrorMessage("Fill in previous images");
      return;
    }

    if(!this.hasUploadedMainImage) {
      this.showErrorMessage("Please, choose main image first");
      return;
    }

    this.addImage();
  }

  async selectImage(option: ImageType, id?: any) {
    
    if(!id) id = "";

    if(option == "other" && !this.hasUploadedMainImage) {
      this.showErrorMessage("Please, choose main image first");
      return;
    }

    const options: ActionSheetOptions = {
      buttons: [
        {
          text: "Via file system",
          handler: () => {
            const fileOpener = document.getElementById(`${ option }-image-file${ id }`);
            fileOpener.click();
          },
          icon: "images",
        },
        {
          text: "Via camera",
          handler: () => {
            const fileOpener = document.getElementById(`${ option }-image-camera${ id }`);
            fileOpener.click();
          },
          icon: "camera",
        },
        {
          text: "Remove Photo",
          handler: () => {
             if(option == "main") {
                this.mainImgFile = null;
                this.mainImgFileName = "";
                this.mainImgSrc = null;
                this.hasUploadedMainImage = false;

                const firstOtherImage = this.otherImages[0];
                this.otherImages = [...this.otherImages.filter(img => img.id == firstOtherImage.id)];
                firstOtherImage.file = null; 
                firstOtherImage.fileName = ""; 
                firstOtherImage.hasImage = false; 
                firstOtherImage.imageSrc = null; 
              }
              else if(option == "other") {
                if(this.otherImages.length < 2) return;

                this.otherImages = [...this.otherImages.filter(img => img.id != id)];
              }
            },
          icon: "close",
        },
      ],
      header: "Select",
    };

    if(isPlatform("desktop")) {
      options.buttons = [...options.buttons.filter((opt: any) => opt.icon != "camera")];
    }

    const actionSheet = await this.actionSheetCtrl.create(options);

    await actionSheet.present();
    
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

interface IGoodsImages{
  id?: number,
  hasImage?: boolean,
  file?: File,
  fileName?: string,
  imageSrc?: string,
}

type ImageType = "main" | "other";
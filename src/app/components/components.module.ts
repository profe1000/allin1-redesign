import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileSelectComponent } from './helpers/file-select/file-select.component';
import { StatusViewerComponent } from './helpers/status-viewer/status-viewer.component';

import { ErrorViewerComponent } from './error-viewer/error-viewer.component';
import { NoContentViewerComponent } from './no-content-viewer/no-content-viewer.component';
import { HomeCategoryCardComponent } from './home-category-card/home-category-card.component';
import { HomeCategoryCardContainerComponent } from './home-category-card-container/home-category-card-container.component';
import { HomeItemCardComponent } from './home-item-card/home-item-card.component';
import { HomeItemCardContainerComponent } from './home-item-card-container/home-item-card-container.component';
import { HomeShopCardsContainerComponent } from './home-shop-cards-container/home-shop-cards-container.component';
import { GoodsDetailsComponent } from './goods-details/goods-details.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { ProfileViewerComponent } from './profile-viewer/profile-viewer.component';
import { AddShopComponent } from './add-shop/add-shop.component';
import { MaterialModule } from '../helpers/material.module';
import { EditShopComponent } from './edit-shop/edit-shop.component';
import { AddGoodsComponent } from './add-goods/add-goods.component';
import { ImageDragComponent } from './image-drag/image-drag.component';
import { EditGoodsComponent } from './edit-goods/edit-goods.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    FileSelectComponent,
    StatusViewerComponent,
    
    NoContentViewerComponent,
    ErrorViewerComponent,

    HomeCategoryCardComponent,
    HomeCategoryCardContainerComponent,

    HomeItemCardComponent,
    HomeItemCardContainerComponent,
    HomeShopCardsContainerComponent,
    
    GoodsDetailsComponent,
    ImagePickerComponent,
    ProfileViewerComponent,

    
    ImageDragComponent,
    AddShopComponent,
    EditShopComponent,
    AddGoodsComponent,
    EditGoodsComponent,

  ],
  exports: [
    FileSelectComponent,
    StatusViewerComponent,

    ErrorViewerComponent,
    NoContentViewerComponent,
    
    HomeCategoryCardComponent,
    HomeCategoryCardContainerComponent,

    HomeItemCardComponent,
    HomeItemCardContainerComponent,
    HomeShopCardsContainerComponent,

    GoodsDetailsComponent,
    ImagePickerComponent,
    ProfileViewerComponent,

    ImageDragComponent,
    AddShopComponent,
    EditShopComponent,
    AddGoodsComponent,
    EditGoodsComponent,
  ]
})
export class ComponentsModule { }

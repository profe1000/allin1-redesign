import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HomeCategoryCardContainerComponent } from '../components/home-category-card-container/home-category-card-container.component';
import { HomeItemCardContainerComponent } from '../components/home-item-card-container/home-item-card-container.component';
import { HomeShopCardsContainerComponent } from '../components/home-shop-cards-container/home-shop-cards-container.component';
import { GoodsDetailsComponent } from '../components/goods-details/goods-details.component';
import { AddShopComponent } from '../components/add-shop/add-shop.component';
import { EditShopComponent } from '../components/edit-shop/edit-shop.component';
import { AddGoodsComponent } from '../components/add-goods/add-goods.component';
import { EditGoodsComponent } from '../components/edit-goods/edit-goods.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'category-container',
    component: HomeCategoryCardContainerComponent,
  },
  {
    path: 'shop-items-container',
    component: HomeItemCardContainerComponent,
  },
  {
    path: 'shops-container',
    component: HomeShopCardsContainerComponent,
  },
  {
    path: 'items/:id',
    component: GoodsDetailsComponent,
  },
  {
    path: 'add-shop',
    component: AddShopComponent,
  },
  {
    path: 'edit-shop',
    component: EditShopComponent,
  },
  {
    path: 'add-goods',
    component: AddGoodsComponent,
  },
  {
    path: 'edit-goods',
    component: EditGoodsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class ProductsService extends BaseHttpRequest {
  public getProducts() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_LIST_PRODUCTS}`);
  }

  public getDetailProduct(id: string) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.DETAIL_PRODUCT}/${id}`);
  }

  public getProductPrices() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_PRODUCT_PRICES}`);
  }

  public getDetailProductPrice(id: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.GET_DETAIL_PRODUCT_PRICE}/${id}`
    );
  }

  public getProductSizes() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_PRODUCT_SIZES}`);
  }

  public getDetailProductSize(id: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.GET_DETAIL_PRODUCT_SIZE}/${id}`
    );
  }

  public addToCart(payload: any) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.ADD_TO_CART}`,
      payload
    );
  }

  public getCart() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_CART}`);
  }
}

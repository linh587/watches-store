import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
// import { NotifyService } from "src/app/services/common/notify.service";
// import { TokenStorageService } from "src/app/services/storage/token-storage.service";

export interface OptionsRequest {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: "body";
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  responseType?: "json";
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export const IS_CALL_API = new HttpContextToken<boolean>(() => false);

@Injectable({
  providedIn: "root",
})
export class BaseHttpRequest {
  public context: HttpContext;

  constructor(
    public http: HttpClient // public storageService: TokenStorageService, // private notify: NotifyService
  ) {
    this.context = new HttpContext();
    this.context.set(IS_CALL_API, true);
  }

  get<T>(url: string, options?: OptionsRequest): Observable<T> {
    return this.http.get<T>(url, { ...options, context: this.context }).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        this.handleError(err);
        return throwError(err);
      })
    );
  }

  patch<T>(
    url: string,
    req: any,
    options?: OptionsRequest
  ): Observable<HttpResponse<T>> {
    const payload = JSON.stringify(req);
    return this.http
      .patch<HttpResponse<T>>(url, payload, {
        ...options,
        context: this.context,
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          this.handleError(err);
          return throwError(err);
        })
      );
  }

  delete<T>(
    url: string,
    options?: OptionsRequest
  ): Observable<HttpResponse<T>> {
    return this.http
      .delete<HttpResponse<T>>(url, { ...options, context: this.context })
      .pipe(
        tap((res) => {
          return res;
        }),
        catchError((err) => {
          this.handleError(err);
          return throwError(err);
        })
      );
  }

  post<T>(url: string, payload: any, options?: OptionsRequest): Observable<T> {
    return this.http
      .post<T>(url, payload, { ...options, context: this.context })
      .pipe(
        switchMap((res) => {
          return of(res);
        }),
        catchError((err) => {
          this.handleError(err);
          return throwError(err);
        })
      );
  }

  put<T>(
    url: string,
    param: any,
    options?: OptionsRequest | null
  ): Observable<HttpResponse<T>> {
    return this.http
      .put<HttpResponse<T>>(url, param, { ...options, context: this.context })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          this.handleError(err);
          return throwError(err);
        })
      );
  }

  upload<T>(
    url: string,
    param: any,
    options?: OptionsRequest | null
  ): Observable<HttpResponse<T>> {
    return this.http
      .post<HttpResponse<T>>(url, param, { ...options, context: this.context })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          this.handleError(err);
          return throwError(err);
        })
      );
  }

  putFile<T>(
    url: string,
    param: any,
    options?: OptionsRequest | null
  ): Observable<HttpResponse<T>> {
    return this.http
      .put<HttpResponse<T>>(url, param, { ...options, context: this.context })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          this.handleError(err);
          return throwError(err);
        })
      );
  }

  private handleError(err: any) {
    const { message } = err;
    // this.notify.error(message, 'Xảy ra lỗi');
  }
}

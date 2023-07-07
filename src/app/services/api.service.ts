import {Inject, Injectable} from '@angular/core';
import axios from "axios";
import {User} from "../models/user.model";
import {NOTYF} from "../app.module";
import {Notyf} from "notyf";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static apiUrl: string = 'https://maitha.api.uaibits.com.br/api/';
  @Inject(NOTYF) private static notyf: Notyf = new Notyf();

  public static setToken(token: string, expire_at: Date): void {
    document.cookie = `token=${token}; expires=${expire_at.toUTCString()}; path=/`;
  }

  public static getToken(): string | null {
    const tokenRegex = /token=([^;]+)/;
    const match = document.cookie.match(tokenRegex);
    return match ? match[1] : null;
  }

  public static checkToken(): boolean {
    return !!this.getToken();
  }

  public static deleteToken(): void {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }

  public static catch(reason: any): void {
    if (reason.response.status === 401) {
      ApiService.deleteToken();
    }
    let data: any = reason.response.data.data;
    if (data !== undefined) {
      Array.from(Object.keys(data)).forEach((key: string) => {
        ApiService.notyf.error(data[key][0]);
      });
    } else {
      ApiService.notyf.error(reason.response.data.message);
    }
  }

  public static get(route: string, params: any = {}): Promise<any> {
    return axios.get(ApiService.apiUrl + route, {
      headers: {
        Authorization: `Bearer ${ApiService.getToken()}`
      },
      params: params
    });
  }

  public static post(route: string, data: any = {}): Promise<any> {
    return axios.post(ApiService.apiUrl + route, data, {
      headers: {
        Authorization: `Bearer ${ApiService.getToken()}`
      }
    });
  }

  public static put(route: string, data: any = {}): Promise<any> {
    return axios.put(ApiService.apiUrl + route, data, {
      headers: {
        Authorization: `Bearer ${ApiService.getToken()}`
      }
    });
  }

  public static delete(route: string, id: any): Promise<any> {
    return axios.delete(ApiService.apiUrl + route + '/' + id, {
      headers: {
        Authorization: `Bearer ${ApiService.getToken()}`
      },
    });
  }

  static login(user: User): Promise<any> {
    return ApiService.post('auth/login', {email: user.email, password: user.password})
      .then(response => {
        if (response.data.success) {
          ApiService.setToken(response.data.data.token, new Date(response.data.data.token_expire_at.date));
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response;
      });
  }

  static logout() {
    return ApiService.post('auth/logout', {})
      .then(response => {
        ApiService.deleteToken();
        localStorage.removeItem('user');
        return response;
      });
  }

  static register(value: User): Promise<any> {
    return ApiService.post('auth/register', value)
  }

  static editUser(user: any) {
    let id = user.id;
    delete user.id;
    return ApiService.put('users/' + id, user)
    //   .then(response => {
    //   if (response.data.success) {
    //     let user = response.data.data;
    //     let localUser = JSON.parse(localStorage.getItem('user') || '{}');
    //     if (user.id === localUser.id) {
    //       localStorage.setItem('user', JSON.stringify(user));
    //     }
    //   }
    // })
  }
}

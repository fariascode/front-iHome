import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/v1/auth'; // Ajusta la URL de tu API

    constructor(private http: HttpClient, private router: Router) {}

    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    // login(email: string, password: string): Observable<any> {//DULCE
    //     return this.http.post<any>(this.apiUrl, { email, password });//DULCE
    // }

    // login(email: string, password: string): Observable<any> {
    //     return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
    // }
    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
          tap((response) => {
            this.saveToken(response.token);  // Guardar el token
            this.router.navigate(['/dashboard']); // Redirigir a dashboard
          })
        );
    }

    getSensores(): Observable<any> {
        return this.http.get(`${this.apiUrl}/sensores`);
    }
    
    getActuadores(): Observable<any> {
        return this.http.get(`${this.apiUrl}/actuadores`);
    }
      
    
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

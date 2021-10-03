import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient ,HttpHeaders ,HttpParams}   from '@angular/common/http'
import {Employee} from '../models/employee'
const BASE_URL ='http://localhost:5000/api'


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  registerEmployee(body:Employee):Observable<Employee[]>{
     
    return this.http.post<Employee[]>(`${BASE_URL}/employee`, body ,{
      observe:'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });

  }

  getByEmployeeId(id:string):Observable<Employee[]>{
    
    return this.http.get<Employee[]>(`${BASE_URL}/employee/${id}`);

  }

  getEmployeeList():Observable<Employee[]>{
    
    return this.http.get<Employee[]>(`${BASE_URL}/employee`);

  }

  deleteEmployee(id:string):Observable<Employee[]>{
    
    return this.http.delete<Employee[]>(`${BASE_URL}/employee/${id}`);

  }



}

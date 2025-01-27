import { Injectable } from '@angular/core';
import { Blogs } from '../model/blogs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient:HttpClient) { }
  getAllUser():Observable<Blogs[]>
  {debugger
    return this.httpClient.get<Blogs[]>("https://localhost:7009/api/Blogs")
  }
  saveblog(newblog:Blogs):Observable<Blogs>
  {debugger
    return this.httpClient.post<Blogs>("https://localhost:7009/api/blogs",newblog);
  }
  
  updateBlog(updateBlog:Blogs): Observable<Blogs> {
    return this.httpClient.put<Blogs>(`${'https://localhost:7009/api/blogs'}/${updateBlog.id}`,updateBlog);
  }
  
  deleteBlog(blogId: number): Observable<void> {
    return this.httpClient.delete<void>(`${'https://localhost:7009/api/blogs'}/${blogId}`);;
  }
}

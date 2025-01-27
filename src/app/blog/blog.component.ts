import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,EventEmitter,Output, OnDestroy} from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Blogs } from '../model/blogs';
import { BlogService } from '../service/blog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{
  blogs:Blogs[]=[];
  get f() { return this.createBlogForm.controls; }
  constructor(private blogService:BlogService) { }
  createBlogForm=new FormGroup({
    "blogTitle":new FormControl(""),
    "content":new FormControl(""),
    "images":new FormControl("")
  });
  ngOnInit() {
    
  }
  onFileChange(e:any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
       // this.image=reader.result as string;
        this.createBlogForm.patchValue({
          images:reader.result
      });
  }
}
  
     submit(){
       debugger;
       console.warn(this.createBlogForm.value);
       this.blogService.saveblog(this.createBlogForm.value).subscribe(
        (response)=>{
          this.Clear_All();
          console.log(this.blogs);
        },
        (error)=>{
          console.log(error);
        }
      );
      }

    Clear_All()
    {
    this.createBlogForm.reset();
    }
 }



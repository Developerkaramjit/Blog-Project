import { Component,OnInit } from '@angular/core';
import { Blogs } from '../model/blogs';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  blogs:Blogs[]=[];
  last_index=100;
  counter=100;
  firstCount=100;
  showTxt='Show More';
  selectedBlog: Blogs | null = null;
  isEditing: boolean = false;
  imagePreview: string | null = null;
  constructor(private blogService:BlogService){}
  ngOnInit(): void {
    this.getAll();
    this.last_index=(this.blogs.map(c=>c.content)as unknown as string).substring(0,100).lastIndexOf(' ');
    if(this.last_index>100)this.last_index=100;
    this.counter=this.last_index;
  }
  getAll()
   {
     this.blogService.getAllUser().subscribe(
       (response)=>{
         this.blogs=response;
         console.log(this.blogs);
       },
       (error)=>{
         console.log(error);
       }
     );
    }
    toggleSkill(){
      if(this.counter<101){
        this.counter=this.blogs.map(c=>c.content).length;
        this.showTxt='Show less'
      }
      else{
        this.counter=this.last_index;
        this.showTxt='Show More';
      }
    }
    deleteBlog(blogId: number) {
      if (confirm("Are you sure you want to delete this blog?")) {
        this.blogService.deleteBlog(blogId).subscribe(
          () => {
            // Remove the deleted blog from the blogs array
            this.blogs = this.blogs.filter(blog => blog.id !== blogId);
          },
          (error) => {
            console.log("Error deleting blog", error);
          }
        );
      }
    }

    editBlog(blog: Blogs) {
      this.selectedBlog = { ...blog }; 
      this.isEditing = true;
      this.imagePreview = blog.images || null;
    }
    
    updateBlog() {
      if (this.selectedBlog) {
        this.blogService.updateBlog(this.selectedBlog).subscribe(
          (response) => {
           
            const index = this.blogs.findIndex(blog => blog.id === this.selectedBlog!.id);
            if (index !== -1) {
              this.blogs[index] = this.selectedBlog!;
            }
            this.selectedBlog = null;  
            this.isEditing = false;
          },
          (error) => {
            console.log("Error updating blog", error);
          }
        );
      }
     }
    
  cancelEdit() {
  this.selectedBlog = null; 
  this.isEditing = false;  
   }
   
   onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; 
      };
      reader.readAsDataURL(file);
      if (this.selectedBlog) {
        this.selectedBlog.images = file; 
      }
    }
  }
}

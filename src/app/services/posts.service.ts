import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map } from 'rxjs';
import { Post } from '../core/models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = environment.apiUrl + '/posts';
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    // this.http
    //   .get<{ message: string; posts: any; maxPosts: number }>(
    //     BACKEND_URL + queryParams
    //   )
    //   .pipe(
    //     map((postData) => {
    //       return {
    //         posts: postData.posts.map((post) => {
    //           return {
    //             title: post.title,
    //             content: post.content,
    //             id: post._id,
    //             imagePath: post.imagePath,
    //             creator: post.creator,
    //           };
    //         }),
    //         maxPosts: postData.maxPosts,
    //       };
    //     })
    //   )
    //   .subscribe((transformedPostData) => {
    //     this.posts = transformedPostData.posts;
    //     this.postsUpdated.next({
    //       posts: [...this.posts],
    //       postCount: transformedPostData.maxPosts,
    //     });
    //   });
    return this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        this.apiUrl + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post: any) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts,
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(`${this.apiUrl}/${id}`);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(`${this.apiUrl}`, postData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: '',
      };
    }
    this.http.put(`${this.apiUrl}/${id}`, postData).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    return this.http.delete(`${this.apiUrl}/${postId}`);
  }
}

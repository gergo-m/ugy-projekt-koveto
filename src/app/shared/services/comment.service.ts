// src/app/shared/services/comment.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../models/Comment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private comments: Comment[] = [];
  private commentsSubject = new BehaviorSubject<Comment[]>(this.comments);

  getComments(): Observable<Comment[]> {
    return this.commentsSubject.asObservable();
  }

  getCommentsPromise(): Promise<Comment[]> {
    return Promise.resolve(this.comments);
  }

  getCommentById(id: number): Observable<Comment | undefined> {
    return new BehaviorSubject(this.comments.find(c => c.id === id)).asObservable();
  }

  addComment(comment: Comment): Promise<Comment> {
    comment.id = Date.now();
    this.comments.push(comment);
    this.commentsSubject.next(this.comments);
    return Promise.resolve(comment);
  }

  updateComment(updatedComment: Comment): Observable<Comment> {
    const idx = this.comments.findIndex(c => c.id === updatedComment.id);
    if (idx !== -1) {
      this.comments[idx] = updatedComment;
      this.commentsSubject.next(this.comments);
    }
    return new BehaviorSubject(updatedComment).asObservable();
  }

  deleteComment(id: number): Promise<void> {
    this.comments = this.comments.filter(c => c.id !== id);
    this.commentsSubject.next(this.comments);
    return Promise.resolve();
  }
}

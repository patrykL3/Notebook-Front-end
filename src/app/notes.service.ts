import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from './notes/note';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}


  public getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiServerUrl}/notes`);
  }

  public addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.apiServerUrl}/notes`, note);
  }

  public updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiServerUrl}/notes/${note.id}`, note);
  }

  public deleteNote(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notes/${noteId}`);
  }


}

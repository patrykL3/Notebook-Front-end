import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import * as $ from "jquery";
import * as bootstrap from 'bootstrap';
import { CheckboxControlValueAccessor, NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Note } from './note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {

  public notes: Note[] = [];
  public deleteNote: any;
  public editNote: any;

  constructor(private notesService: NotesService){}

  ngOnInit() {
    this.getNotes();
  }

  public getNotes(): void {
    this.notesService.getNotes().subscribe(
      (response: Note[]) => {
        this.notes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(note: Note, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addNoteModal');
    }
    if (mode === 'edit') {
      this.editNote = note;
      button.setAttribute('data-target', '#updateNoteModal');
    }
    if (mode === 'delete') {
      this.deleteNote = note;
      button.setAttribute('data-target', '#deleteNoteModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddNote(addForm: NgForm): void {

    this.closeModal();
    // document.getElementById('cancel-button')?.click();

    this.notesService.addNote(addForm.value).subscribe(
      (response: Note) => {
        console.log(response);
        this.getNotes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateNote(editNote: Note): void {

    this.closeModal();

    this.notesService.updateNote(editNote).subscribe(
      (response: Note) => {
        console.log(response);
        this.getNotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteNote(noteId: number): void {
    this.notesService.deleteNote(noteId).subscribe(
      (response: void) => {
        this.getNotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private closeModal(): void {
    $(".modal").modal('hide');
  }


}

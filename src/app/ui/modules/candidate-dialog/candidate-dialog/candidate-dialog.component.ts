import {Component, Inject, OnInit} from '@angular/core';
import {MatConfirmService} from '../../reusable-mat-confirm/mat-confirm-service';
import {Candidate, CONTACT_TYPES} from '../../../../core/models/candidate.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'hr-candidate-dialog',
  templateUrl: './candidate-dialog.component.html',
  styleUrls: ['./candidate-dialog.component.scss']
})
export class CandidateDialogComponent implements OnInit {
  candidate: Candidate;
  contactTypes: string[];
  form: FormGroup;

  get   contacts(): FormArray {
    return <FormArray>this.form.get('contacts');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {candidate: Candidate},
    private fb: FormBuilder,
    private matConfirm: MatConfirmService
  ) {}

  ngOnInit() {
    this.contactTypes = Object.values(CONTACT_TYPES);
    this.form = this.fb.group({
      contacts: this.fb.array([])
    });
  }

  createContactGroup(
    type: string = '',
    value: string = '',
    preferred: boolean = false
  ): FormGroup {
    return this.fb.group({
      type,
      value,
      preferred
    });
  }

  addContact(
    type: string = '',
    value: string = '',
    preferred: boolean = false
  ): void {
    this.contacts.push(this.createContactGroup(type, value, preferred));
  }

  deleteContact(i: number): void {
    this.matConfirm
      .open('Are you sure wanna delete this contact?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.contacts.removeAt(i);
        }
      });
  }

  onFileUpload(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    const file = inputElement.files[0];
    this.handleFileUpload(file);
  }

  private handleFileUpload(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.data.candidate.photo = reader.result as string;
    };
  }
}
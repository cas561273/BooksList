import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  bookForm: FormGroup;
  id: String = '';
  isbn: String = '';
  title: String = '';
  description: String = '';
  author: String = '';
  publisher: String = '';
  published_year: String = '';

  identity: String = '';


  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
    this.bookForm = this.formBuilder.group({
      'isbn' : [null, Validators.required],
      'title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'author' : [null, Validators.required],
      'publisher' : [null, Validators.required],
      'published_year' : [null, Validators.required]
    });
  }

  getBook(id) {
    this.api.getBook(id).subscribe(data => {
      this.id = data._id;
      this.bookForm.setValue({
        isbn: data.isbn,
        title: data.title,
        description: data.description,
        author: data.author,
        publisher: data.publisher,
        published_year: data.published_year
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateBook(this.id, form)
      .subscribe(res => {
          this.identity = res['_id'];
          this.router.navigate(['/book-details', this.identity]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  bookDetails() {
    this.router.navigate(['/book-details', this.id]);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Firestore, collectionData, collection, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ResultsComponent } from '../results/results.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UsersService } from '../users.service';
import { MainComponent } from '../main/main.component';
import { SaveService } from '../save.service';
import { GoalService } from '../goal.service';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: BookService | undefined;
  private usersCollection: AngularFirestoreCollection | undefined;
  constructor(private route: ActivatedRoute, private firestore: Firestore, private results: ResultsComponent, private afs: AngularFirestore) { }
  ngOnInit(): void {
    ResultsComponent.books = ResultsComponent.books;
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = String(routeParams.get('bookId'));
    this.book = ResultsComponent.books.find((book) => book.id === bookIdFromRoute);
  }
  addToLibrary(message: String): void{
    this.usersCollection = this.afs.collection<UsersService>('Users');
    SaveService.libs.push(new LibraryService(this.book!, message));
    this.usersCollection.doc(MainComponent.user.email).update({save: JSON.stringify(new SaveCombined(SaveService.goals, SaveService.libs))});
  }
}

class SaveCombined{
  public goals: GoalService[] = [];
  public libs: LibraryService[] = [];
  constructor(goals: GoalService[], libs: LibraryService[]){
    this.goals = goals;
    this.libs = libs;
  }
}
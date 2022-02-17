import { Injectable } from '@angular/core';
import { GoalService } from './goal.service';
import { LibraryService } from './library.service';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  public static goals: GoalService[] = [];
  public static libs: LibraryService[] = [];
  constructor() { }
}

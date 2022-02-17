import { BookService } from "./book.service";

export class GoalService {
  constructor(public goalBooks: number, public goalDuration: number, public goalDurationType: string, public books: BookService[], public dateStart: Date, public dateEnd: Date) { }
}

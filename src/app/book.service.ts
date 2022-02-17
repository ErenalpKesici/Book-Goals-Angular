export class BookService {
  constructor(public id: String, public title: String, public categories: String[], public authors: String[], public datePublished: Date, public  nOfPages: number, public  imgUrl: String) {}
  public toString(): String{
    return this.id+" " + this.title+" "+this.nOfPages;
  }
}

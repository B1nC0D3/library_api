
interface IBookService<D, T extends IBook> {
    db: D
    getAllBooks(): T[]
    createBook(name: string, author: string, user: IUser): T
    updateBook(id: number, updated_data: object, user: IUser): T
    deleteBook(id: number, user: IUser): void
    getBooksWithFilters(filter_word: string): T[]
}
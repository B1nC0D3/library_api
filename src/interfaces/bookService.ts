import {User, Item} from "@prisma/client";

export interface IBookService<D, T extends Item, U extends User> {
    db: D

    getAllBooks(): Promise<T[]>

    createBook(name: string, author: string, user: U): Promise<T>

    updateBook(id: number, updated_data: object, user: U): Promise<T>

    deleteBook(id: number, user: U): void

    getBooksWithFilters(filter_word: string): Promise<T[]>
}
import {PrismaClient, User, Item, Role} from '@prisma/client';
import {IBookService} from "../interfaces/bookService";

export class BookService implements IBookService<PrismaClient, Item, User> {
    db: PrismaClient

    constructor(db_instance: PrismaClient) {
        this.db = db_instance
    }

    private isLibrarian(user: User) {
        if (user.role !== Role.LIBRARIAN) {
            throw new Error('You are not librarian')
        }
    }

    async getAllBooks(): Promise<Item[]> {
        return this.db.item.findMany()
    }

    async createBook(name: string, author: string, user: User): Promise<Item> {
        this.isLibrarian(user)
        return this.db.item.create({
                data: {
                    name: name,
                    author: author
                },
            }
        )
    }

    async updateBook(book_id: number, updated_data: object, user: User): Promise<Item> {
        this.isLibrarian(user)
        return this.db.item.update({
            where: {
                id: book_id
            },
            data: updated_data
        })
    }

    async deleteBook(book_id: number, user: User) {
        this.isLibrarian(user)
        this.db.item.delete({
            where: {
                id: book_id
            }
        })
    }

    async getBooksWithFilters(filter_word: string): Promise<Item[]> {
        return this.db.item.findMany({
            where: {
                OR: [{
                    name: {contains: filter_word},
                },
                    {
                        author: {contains: filter_word},
                    },
                ],
            }
        })
    }
}
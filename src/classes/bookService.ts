import {PrismaClient} from "prisma/prisma-client/scripts/default-index";


class BookService implements IBookService<PrismaClient, Book> {
    db: PrismaClient

    private isLibrarian(user: User) {
        if (user.role !== Roles.LIBRARIAN) {
            throw new Error('You are not librarian')
        }
    }

    getAllBooks(): Book[] {
        return this.db.book.findMany()
    }

    createBook(name: string, author: string, user: User): Book {
        this.isLibrarian(user)
        return this.db.book.create({
                data: {
                    name: name,
                    author: author
                },
            }
        )
    }

    updateBook(book_id: number, updated_data: object, user: User): Book {
        this.isLibrarian(user)
        return this.db.book.update({
            where: {
                id: book_id
            },
            data: updated_data
        })
    }

    deleteBook(book_id: number, user: User) {
        this.isLibrarian(user)
        this.db.book.delete({
            where: {
                id: book_id
            }
        })
    }

    getBooksWithFilters(filter_word: string): Book[] {
        return this.db.book.findMany({
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
class Book implements IBook {
    id?: number
    name: string
    author: string

    constructor(name: string, author: string, id?: number) {
        this.id = id
        this.name = name
        this.author = author
    }
}
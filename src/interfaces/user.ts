enum Roles {
    USER = "USER",
    LIBRARIAN = "LIBRARIAN",
    ADMIN = "ADMIN"
}

interface IUser {
    username: string
    email: string
    role: Roles
}
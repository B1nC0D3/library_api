class User implements IUser {
    id?: number
    username: string
    email: string
    role: Roles

    constructor(username: string, email: string, id?: number, role?: Roles) {
        this.id = id
        this.username = username
        this.email = email
        if (!role) {
            this.role = Roles.USER
        } else {
            this.role = role
        }
    }
    
}
interface IUserService<D, T extends IUser> {
    db: D
    getAllUsers(): T[]
    createUser(username: string, email: string, user: T, role?: Roles): T
    updateUser(user_id: number, updated_data: object, user: T): T
    deleteUser(user_id: number, user: T): void
    addToFavorite(user: T, item: IBook): void
}
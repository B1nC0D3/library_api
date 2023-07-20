import {User, Item, Role} from "@prisma/client";

export interface IUserService<D, T extends User, I extends Item> {
    db: D

    getAllUsers(): Promise<T[]>

    createUser(username: string, email: string, user: T, role?: Role): Promise<T>

    updateUser(user_id: number, updated_data: object, user: T): Promise<T>

    deleteUser(user_id: number, user: T): Promise<T>

    addToFavorite(user: T, item: I): void
}
import {PrismaClient, User, Item, Role} from '@prisma/client';
import {IUserService} from "../interfaces/userService";

export class UserService implements IUserService<PrismaClient, User, Item> {
    db: PrismaClient

    constructor(db_instance: PrismaClient) {
        this.db = db_instance
    }

    isAdmin(user: User) {
        if (user.role !== Role.ADMIN) {
            throw new Error('You are not a admin')
        }
    }

    createUser(username: string, email: string, user: User, role?: Role): Promise<User> {
        this.isAdmin(user)
        return this.db.user.create({
            data: {
                username: username,
                email: email,
                role: role
            }
        })
    }

    async deleteUser(user_id: number, user: User): Promise<User> {
        this.isAdmin(user)
        return this.db.user.delete({where: {id: user_id}});
    }

    async getAllUsers(): Promise<User[]> {
        return this.db.user.findMany()
    }

    updateUser(user_id: number, updated_data: object, user: User): Promise<User> {
        this.isAdmin(user)
        return this.db.user.update({
            where: {
                id: user_id
            },
            data: updated_data
        })
    }

    addToFavorite(user: User, item: Item): void {
        this.db.userFavorite.create({
            data: {
                userId: user.id,
                itemId: item.id
            }
        })
    }
}
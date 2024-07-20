import db from "../../models";

class BookServices {
    static async index() {
        try {
            return await db.Book.findAll()
        } catch (e) {
            throw e;
        }
    }
    static async show(id) {
        try {
            return await db.Book.findOne({where: {id}})
        } catch (e) {
            throw e;
        }
    }

    static async store(book) {
        try {
            return await db.Book.create(book)
        } catch (e) {
            throw e;
        }
    }

    static async update(id, book) {
        try {

            const updateBook = await db.Book.findOne({where: {id: Number(id)}})
            if (updateBook) {
                await db.Book.update(book, {where: {id: Number(id)}})
                return updateBook;
            }
            return null
        } catch (e) {
            throw e;
        }
    }
    static async destroy(id) {
        try {
            const book = await db.Book.findOne({where: {id: Number(id)}})
            if (book) {
                return await book.destroy()
            }
        } catch (e) {
            throw e;
        }
    }
}

export default BookServices;

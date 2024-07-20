import BookServices from "../services/book.services";
import HelperUtils from "../utils/helper.utils";

const helperUtils = new HelperUtils()

class BookController {
    static async index(req, res) {
        try {
            helperUtils.setSuccess(await BookServices.index(), 'Successfully retrieved.');
            return helperUtils.send(res)
        } catch (e) {
            helperUtils.setError(e.message)
            return helperUtils.send(res)
        }
    }

    static async show(req, res) {
        const {id} = req.params;
        if (!Number(id)) {
            helperUtils.setError('Please input a valid numeric value.')
            return helperUtils.send(res)
        }

        try {
            const book = await BookServices.show(id);
            if (!book) {
                helperUtils.setError(`Book not found.`, 404)
            } else {
                helperUtils.setSuccess(book , `Successfully retrieved.`)
            }
            return helperUtils.send(res);
        } catch (e) {
            helperUtils.setError(e, 404)
            return helperUtils.send(res);
        }
    }

    static async store(req, res) {
        if (!req.body.title || !req.body.price || !req.body.description ) {
            helperUtils.setError( "Please provide complete details.");
            return helperUtils.send(res);
        }

        const book = req.body;
        try {
            const createBook = await BookServices.store(book)
            helperUtils.setSuccess(createBook, 'Successfully created.', 201);
            return helperUtils.send(res);
        } catch (e) {
            helperUtils.setError(e.message)
            return helperUtils.send(res)
        }
    }

    static async update(req, res) {
        const alterBook = req.body;
        const {id} = req.params;

        if (!Number(id)) {
            helperUtils.setError("Please input a valid numeric value");
            return helperUtils.send(res);
        }

        try {
            const updateBook = await BookServices.update(id, alterBook);
            helperUtils.setSuccess(updateBook, `Book updated`)

            if (!updateBook) {
                helperUtils.setError(`Cannot find the book with the id: ${id}`)
            }

            return helperUtils.send(res);
        } catch (e) {
            helperUtils.setError(e, 404)
            return helperUtils.send(res)
        }
    }

    static async destroy(req, res) {
        const {id} = req.params;
        if (!Number(id)) {
            helperUtils.setError('Please provide a numeric value.');
            return helperUtils.send(res);
        }

        try {
            const book = await BookServices.destroy(id);
            helperUtils.setSuccess(null, 'Successfully deleted.', 204)
            if (!book) {
                helperUtils.setError('Book not found.', 404)
            }
            return helperUtils.send(res);
        }catch (e) {
            helperUtils.setError(e, 404)
            return helperUtils.send(res)
        }
    }
}


export default BookController;

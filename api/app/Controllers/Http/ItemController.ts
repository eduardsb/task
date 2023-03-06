import Database from '@ioc:Adonis/Lucid/Database'
import Item from 'App/Models/Item'

class ItemController {
  async list() {
    const items = await Database.from('items').select('*')
    return items
  }

  async create({ request }) {
    const { name } = request.only(['name'])
    const item = await Item.create({
      name: name,
      batch: 1,
    })
    return item
  }

  async delete({ params }) {
    const { id } = params
    const item = await Item.find(id)
    if (item) {
      const result = await item.delete()
      return result
    }
  }

  async search({ request }) {
    const { term } = request.only(['term'])
    const items = await Item.query().where('name', 'LIKE', '%' + term + '%')
    return items
  }
}

module.exports = ItemController

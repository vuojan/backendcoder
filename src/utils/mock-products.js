import {fakerES as faker} from "@faker-js/faker"

const categories = ['books', 'music', 'games', 'sports', 'other'];

export const mockProducts = () => {

    return{
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.database.mongodbObjectId(),
        price:faker.commerce.price(),
        status:faker.datatype.boolean(),
        stock:faker.number.int(),
        category:faker.helpers.arrayElement(categories),
        thumbnail: faker.image.urlPicsumPhotos(),
    }

}
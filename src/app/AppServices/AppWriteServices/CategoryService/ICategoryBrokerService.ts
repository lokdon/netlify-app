import { CategoryModel } from "src/app/Models/CategoryModel";

export abstract class ICategoryBrokerService
{
    abstract createCategoryDocuments():Promise<void>;
    abstract getAllCategoriesAsync():Promise<CategoryModel[]>

}
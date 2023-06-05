import { ContactsModel } from "src/app/Models/ContactsModel";
import { PaginationSpecificationModel } from "src/app/Models/QuerySpecificationModel";
import { ApiResponseModel } from "src/app/Models/ResultModel";

export abstract class IContactService
{
    abstract createContactWithAddress(contactModel:ContactsModel):Promise<ApiResponseModel<ContactsModel>>;

    abstract getContactByRecordIdAsync(recordId:string):Promise<ApiResponseModel<ContactsModel>>;

    abstract getContactListByOwnerIdAsync(ownerId:string):Promise<ApiResponseModel<ContactsModel[]>>;

    abstract getPaginatedContactListByUserIdAsync(userId:string,paginatedModel:PaginationSpecificationModel):Promise<ApiResponseModel<ContactsModel[]>>;

    abstract deleteContactByRecordIdAsync(recordId:string):Promise<ApiResponseModel<boolean>>;
}
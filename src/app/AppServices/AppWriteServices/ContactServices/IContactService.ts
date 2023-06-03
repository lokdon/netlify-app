import { ContactsModel } from "src/app/Models/ContactsModel";
import { PaginationSpecificationModel } from "src/app/Models/QuerySpecificationModel";
import { ApiResponseModel } from "src/app/Models/ResultModel";

export abstract class IContactService
{
    abstract createContactWithAddress(contactModel:ContactsModel):Promise<boolean>;

    abstract getContactByRecordIdAsync(recordId:string):Promise<ContactsModel>;

    abstract getContactListByOwnerIdAsync(ownerId:string):Promise<ContactsModel[]>;

    abstract getPaginatedContactListByUserIdAsync(userId:string,paginatedModel:PaginationSpecificationModel):Promise<ApiResponseModel<ContactsModel[]>>;

    abstract deleteContactByRecordIdAsync(recordId:string):Promise<boolean>;
}
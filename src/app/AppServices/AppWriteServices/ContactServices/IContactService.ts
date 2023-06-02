import { ContactsModel } from "src/app/Models/ContactsModel";

export abstract class IContactService
{
    abstract createContactWithAddress(contactModel:ContactsModel):Promise<boolean>;

    abstract getContactByRecordIdAsync(recordId:string):Promise<ContactsModel>;

    abstract getContactListByOwnerIdAsync(ownerId:string):Promise<ContactsModel[]>;

    abstract deleteContactByRecordIdAsync(recordId:string):Promise<boolean>;
}
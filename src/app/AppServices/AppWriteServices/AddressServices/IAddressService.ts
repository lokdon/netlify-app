import { AddressModel } from "src/app/Models/AddressModel";

export abstract class IAddressService
{
    abstract createAddressAsync(addressModel:AddressModel):Promise<boolean>;

    abstract getAddressByRecordIdAsync(recordId:string):Promise<AddressModel>;

    abstract getAddressByOwnerIdAsync(ownerId:string):Promise<AddressModel>;
    
}
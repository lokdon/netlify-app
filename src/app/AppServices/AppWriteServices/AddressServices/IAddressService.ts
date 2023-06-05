import { AddressModel } from "src/app/Models/AddressModel";
import { ApiResponseModel } from "src/app/Models/ResultModel";

export abstract class IAddressService
{
    abstract createAddressAsync(addressModel:AddressModel,ownerId:string):Promise<ApiResponseModel<AddressModel>>;

    abstract getAddressByRecordIdAsync(recordId:string):Promise<ApiResponseModel<AddressModel>>;

    abstract getAddressByOwnerIdAsync(ownerId:string):Promise<ApiResponseModel<AddressModel>>;
    
}
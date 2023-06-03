export type ApiResponseModel<T>={
    IsValid:boolean,
    Errors:ErroMessages[],
    Success:T
    TotalRecordCount:number
}

type ErroMessages={
    Key:string,
    Value:string
}





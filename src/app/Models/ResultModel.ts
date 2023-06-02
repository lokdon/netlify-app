export type ApiResponseModel<T>={
    IsValid:boolean,
    Errors:ErroMessages[],
    Success:T[]
}

type ErroMessages={
    Key:string,
    Value:string
}





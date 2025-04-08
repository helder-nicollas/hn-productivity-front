export interface IActionResponse<Errors = undefined> {
    type?: 'success' | 'serverError' | 'validationError';
    message?: string;
    errors?: Errors;
}

export interface IActionResponseWithData<Data, Errors = undefined>
    extends IActionResponse<Errors> {
    data: Data;
}

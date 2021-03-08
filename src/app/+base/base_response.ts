export interface IResponseAPI<T> {
    is_success: boolean
    message: string;
    code: string;
    result: T
}
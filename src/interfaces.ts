
export interface TestUserService{
    connect(): Promise<any>;
    disconnect(): Promise<any>;
}
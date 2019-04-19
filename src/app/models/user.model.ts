export class User{
    public uName: string
    public avatar
    private email: string
    private password: string
    public totalDownloads: number
    public totalUpvotes: number
    public totalDownvotes: number

    constructor(uName: string, password?: string, email?:string, avatar?, totalDownloads?: number, totalUpvotes?: number, totalDownvotes?: number){
        this.uName = uName
        this.email = email ? email : null
        this.password = password ? password : null
        this.avatar = avatar ? avatar : null
        this.totalDownloads = totalDownloads ? totalDownloads : 0
        this.totalUpvotes = totalUpvotes ? totalUpvotes : 0
        this.totalDownvotes = totalDownvotes ? totalDownvotes : 0
    }
}
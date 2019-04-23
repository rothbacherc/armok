export class User{
    public uName: string
    public totalDownloads: number
    public totalUpvotes: number
    public totalDownvotes: number
    public avatar
    public email: string
    public password: string

    constructor(uName: string, totalDownloads?: number, totalUpvotes?: number, totalDownvotes?: number, avatar?, password?: string, email?:string){
        this.uName = uName
        this.totalDownloads = totalDownloads ? totalDownloads : 0
        this.totalUpvotes = totalUpvotes ? totalUpvotes : 0
        this.totalDownvotes = totalDownvotes ? totalDownvotes : 0
        this.avatar = avatar ? avatar : null
        this.email = email ? email : null
        this.password = password ? password : null
    }
}
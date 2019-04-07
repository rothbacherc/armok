export class User{
    public uName: string
    public avatar
    public totalDownloads: number
    public totalUpvotes: number
    public totalDownvotes: number

    constructor(uName: string, avatar, totalDownloads?: number, totalUpvotes?: number, totalDownvotes?: number){
        this.uName = uName
        this.avatar = avatar
        this.totalDownloads = totalDownloads ? totalDownloads : 0
        this.totalUpvotes = totalUpvotes ? totalUpvotes : 0
        this.totalDownvotes = totalDownvotes ? totalDownvotes : 0
    }
}
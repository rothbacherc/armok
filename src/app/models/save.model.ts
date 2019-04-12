export class Save{
    public sName: string
    public type: saveTypes
    public description: string
    public isPrivate: boolean
    public isBlood: boolean
    public downloads: number
    public upVotes: number
    public dnVotes: number
    public uName: string

    constructor(sName: string, type: saveTypes, description: string, isPrivate: boolean, isBlood: boolean, uName: string, 
        downloads?: number, upVotes?: number, dnVotes?: number){
        this.sName = sName
        this.type = type
        this.description = description
        this.isPrivate = isPrivate
        this.isBlood = isBlood
        this.uName = uName
        this.downloads = downloads ? downloads : 0
        this.upVotes = upVotes ? upVotes : 0
        this.dnVotes =  dnVotes ? dnVotes : 0
    }
}
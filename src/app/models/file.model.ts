export class File{
    public sName: string
    public sFile: File

    constructor(sName: string, sFile: File){
        this.sName = sName
        this.sFile = sFile
    }
}
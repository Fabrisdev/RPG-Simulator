export async function sleep(ms: number){
    await new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export class StringBuilder{
    private content = ''

    addLine(lineContent: string){
        this.content += '\n' + lineContent
        return this
    }

    toString(){
        return this.content
    }
}
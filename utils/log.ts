import colors from 'colors'

export function log_error(error_message: string){
    console.log(colors.bold(colors.gray('--------------------------------------------------------------------------------------')))
    console.log(colors.bold(colors.red('                              ❌ HA OCURRIDO UN ERROR ❌')))
    console.log('')
    console.log(colors.red(error_message))
    console.log('')
    console.log(colors.bold(colors.red('                              ❌ HA OCURRIDO UN ERROR ❌')))
    console.log(colors.bold(colors.gray('--------------------------------------------------------------------------------------')))
}
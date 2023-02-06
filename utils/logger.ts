import colors from 'colors'

export function log_error(error_message: string){
    console.error(colors.bold(colors.gray('--------------------------------------------------------------------------------------')))
    console.error(colors.bold(colors.red('                              ❌ HA OCURRIDO UN ERROR ❌')))
    console.error('')
    console.error(colors.red(error_message))
    console.error('')
    console.error(colors.bold(colors.red('                              ❌ HA OCURRIDO UN ERROR ❌')))
    console.error(colors.bold(colors.gray('--------------------------------------------------------------------------------------')))
}
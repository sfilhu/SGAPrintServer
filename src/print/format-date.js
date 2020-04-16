const stringDate = (date_custom) => {
    // Month
    // const months =  {
    //     0: 'janeiro',
    //     1: 'fevereio',
    //     2: 'marco',
    //     3: 'abril',
    //     4: 'maio',
    //     5: 'junho',
    //     6: 'julho',
    //     7: 'agosto',
    //     8: 'setembro',
    //     9: 'outubro',
    //     10: 'novembro',
    //     11: 'dezembro',
    // }

    // Day of week
    // const daysOfWeek = {
    //     0: 'Domingo',
    //     1: 'Segunda',
    //     2: 'Terca',
    //     3: 'Quarta',
    //     4: 'Quinta',
    //     5: 'Sexta',
    //     6: 'Sabado',
    // }

    const date    = date_custom ? new Date(date_custom) : new Date()
    const day     = date.getDate()
    const yaer    = date.getFullYear()
    const hour    = date.getHours()
    const minutes = date.getMinutes()
    // const dayWeek = daysOfWeek[date.getDay()]
    // const month   = months[date.getMonth()]
    const stg = `${day}/${date.getMonth() + 1}/${yaer} ${hour}:${minutes}`

    return stg
}

module.exports = stringDate;
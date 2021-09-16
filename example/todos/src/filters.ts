import moment from 'moment'

export const formatDate = (value: moment.MomentInput, format: string) => {
    return moment(value).format(format)
}

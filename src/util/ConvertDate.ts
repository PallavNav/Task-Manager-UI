import moment from "moment";

export const ConvertDate = (date:any) => {
    return moment(date).format('YYYY-MM-DD');
}
export function dataPagination(data, pageNumber, pageSize){
    var dataPg = [];
    const index = (pageNumber - 1) * pageSize;
    
    for(var i = index; i <= index + pageSize; i++){
        if(i + 1 > data.length){
            break;
        }
        dataPg.push(data[i]);
    }
    return dataPg;

}
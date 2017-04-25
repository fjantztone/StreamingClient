import moment from 'moment';

function toLineData(lineData, data){
    if(!lineData.columns.length){
      const dates = data.map(obj => moment().year(obj.date.year).month(obj.date.month).date(obj.date.day).format("YYYY-MM-DD"));
      lineData = {
        x: 'x',
        columns : [
          ['x'].concat(dates)
        ]
      }
    }

    return appendToLineData(lineData, data);
}
function appendToLineData(lineData, data){
  const key = JSON.stringify(data[0].key);
  const values = data.map(obj => obj.value);
  lineData.columns.push([key].concat(values));
  return lineData;
}

function toRangeData(rangeData, data){
  return appendToRangeData(rangeData, data);
}
function appendToRangeData(rangeData, data){
  const key = JSON.stringify(data.key);
  const value = data.value;
  rangeData.columns.push([key].concat(value));
  return rangeData;
}
function toTopData(data){
  if(Object.keys(data).length){
    let topItems = data.map(topItem => {
      const key = JSON.stringify(topItem.key);
      const value = topItem.value;
      return [key].concat(value);
    });
    return {
      columns : topItems,
      type: 'donut'
    };
  }
  return data;

}

export { toLineData, appendToLineData, toRangeData, toTopData };

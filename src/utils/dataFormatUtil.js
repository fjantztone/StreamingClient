const dataFormatUtil = {
  toKey : (dataset) => { //unchecked
    return JSON.stringify(dataset[0].key);
  },
  toLineData : (datasets) => {

    datasets = dataFormatUtil.flatten(datasets);
    datasets = datasets.map(obj => ({key : JSON.stringify(obj.key), [JSON.stringify(obj.key)] : obj.value, date : obj.date }));
    const keys = datasets.reduce((acc, value) => acc.concat(acc.indexOf(value.key) === -1 ? value.key : []), []);

     return {
      x : 'date',
      json : datasets,
      keys : {
        x : 'date',
        value : keys
      }
    }

  },
  toRangeData : (datasets, type) => {
    if(type !== 'pie' && type !== 'donut') throw new Error("Invalid type");
    let obj = {};

    if(Array.isArray(datasets) && datasets.length){
      datasets = dataFormatUtil.flatten(datasets);
      obj = datasets.reduce((acc, item) => {
        acc[JSON.stringify(item.key)] = item.value;
        return acc;
      }, {});
    }

    const keys = Object.keys(obj);
    return {
        json: [obj],
        keys: {
            value: keys
        },
        type: type
    }
  },
  toCategoryData : (datasets) => {
    datasets = dataFormatUtil.flatten(datasets);
    const json = datasets.map(obj => ({key : JSON.stringify(obj.key), value : obj.value}));

    return {
     x : 'x',
     labels : true,
     json : json,
     keys : {
       x : 'key',
       value : ['value']
     },
     type : 'bar'
   }

  },
  flatten : (datasets) =>{
    const flatten = datasets.reduce((acc, value) => acc.concat(Array.isArray(value) ? value : [value]), []);
    return flatten;
  }
}
module.exports = dataFormatUtil;

const baseUrl = "http://localhost:8081/api/cache";
function removeProps(obj, props){
  props.forEach(prop => {
    delete obj[prop];
  });
  return obj;
}
function generateReq(cacheName, filter, formData){
  let url = baseUrl + '/' + cacheName + '/filter/' + filter;

  if(filter === 'points' || filter === 'range'){
    const startDate = formData['startDate'];
    const endDate = formData['endDate'];
    formData = removeProps(formData, ['startDate', 'endDate', 'filter']);
    url += '/startdate/' + startDate + '/enddate/' + endDate + '/key/' + JSON.stringify(formData);/*encodeURIComponent(formData);*/
  }
  if(filter === 'top'){
    const days = formData['days'];
    url += '/days/' + days;
  }

  let options = {
    method : 'GET'
  }
  return {
    url : url,
    options : options
  }
}
function handleReq(url, options, cb){
  fetch(url, {
    method : options.method,
    body : options.data
  })
  .then(res => res.json().then(json => ({
    status : res.status,
    json : json
  })))
  .then(({status, json}) => {
    if(status !== 200)
      throw new Error(json.message);
    cb(json, null);
  })
  .catch(err => {
    console.log(err);
    cb(null, err);
  });
}
function toQueryString(key){
  let queryParams = [];
  for(let field of Object.keys(key)){
    if(field.length && key[field].toString().length){
      const queryParam = field + "=" + key[field];
      queryParams.push(queryParam);
    }
  }
  return queryParams.join("&");
}

export { handleReq, generateReq, toQueryString, removeProps };

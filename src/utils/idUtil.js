let id = 0;
function nextId(){
  ++id;
  return `id-${id}`;
}
export {nextId};

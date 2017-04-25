import React, {Component} from 'react';
import dataFormatUtil from '../../utils/dataFormatUtil';
import {nextId} from '../../utils/idUtil';

class DataList extends Component{

  handleRemove(index, filter){
    this.props.removeData(index, filter);
  }
  render(){
    const data = this.props.data;
    const pointsData = data.points;
    const rangeData = data.range;
    const subscribeData = data.subscribe;

    let pointsDataItems = pointsData.map((dataset, index) => {
      return <li className="collection-item" key={nextId()}><div>{dataFormatUtil.toKey(dataset)}<a href="#delete" className="secondary-content" onClick={() => this.handleRemove(index, 'points')}><i className="material-icons">delete</i></a></div></li>;
    });
    let rangeDataItems = rangeData.map((dataset, index) => {
      return <li className="collection-item" key={nextId()}><div>{dataFormatUtil.toKey(dataset)}<a href="#delete" className="secondary-content" onClick={() => this.handleRemove(index, 'range')}><i className="material-icons">delete</i></a></div></li>;
    });
    let subscribeDataItems = subscribeData.map((dataset, index) => {
      return <li className="collection-item" key={nextId()}><div>{dataFormatUtil.toKey(dataset)}<a href="#delete" className="secondary-content" onClick={() => this.handleRemove(index, 'subscribe')}><i className="material-icons">delete</i></a></div></li>;
    });

    return (
      <div>
        {pointsDataItems.length > 0 &&<ul className="collection with-header">
          <li className="collection-header"><h4>Point datasets</h4></li>
          {pointsDataItems}
        </ul>}
        {rangeDataItems.length > 0 &&<ul className="collection with-header">
          <li className="collection-header"><h4>Range datasets</h4></li>
          {rangeDataItems}
        </ul>}
        {subscribeDataItems.length > 0 &&<ul className="collection with-header">
          <li className="collection-header"><h4>Subscribe datasets</h4></li>
          {subscribeDataItems}
        </ul>}
      </div>
    );
  }
}
export default DataList;

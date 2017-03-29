import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { picturesFetch } from '../actions';
import PictureItem from './PictureItem';

class InstagramList extends Component {
  componentWillMount() {
    this.props.picturesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ pictures }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(pictures);
  }

  renderRow(picture) {
    return <PictureItem picture={picture} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const pictures = _.map(state.pictures, (val, uid) => {
    console.log(val, uid);
    return { ...val, uid };
  });

  return { pictures };
};

export default connect(mapStateToProps, { picturesFetch })(InstagramList);

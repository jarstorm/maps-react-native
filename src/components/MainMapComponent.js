import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ListView, View } from 'react-native';
import { mapFetch } from '../actions';
import ListItem from './ListItem';
import MapView from 'react-native-maps';

class MainMapComponent extends Component {

  renderPoints() {
    console.log("puntos", this.props.marks);
    return this.props.marks.map((point) => {
      const coordinate = {
        latitude: point.geo[0],
        longitude: point.geo[1]
      };
      return (
        <MapView.Marker.Animated coordinate={coordinate} />
      );
    });

  }

onRegionChangeComplete(region) {
  console.log(region);
 this.props.mapFetch(region.latitude, region.longitude);
}

  render() {
        let {container, map} = styles;        
    return (
      <View style={container}>
         <MapView style={map}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)} >
    {this.renderPoints()}
  </MapView>
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
}

const mapStateToProps = state => {
  console.log("map state to prope", state);
  const marks = _.map(state.map.marks, (val, uid) => {
    console.log(val, uid);
    return { ...val, uid };
  });

  return { marks };
};

export default connect(mapStateToProps, { mapFetch })(MainMapComponent);

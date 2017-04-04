import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ListView, View } from 'react-native';
import { mapFetch } from '../actions';
import ListItem from './ListItem';
import MapView from 'react-native-maps';

class MainMapComponent extends Component {

  componentWillMount() {
    
  }

  renderPoints() {
    console.log("puntos", this.props.marks);
    return this.props.marks.map((point) => {
      const coordinate = {
        latitude: point.latitude,
        longitude: point.longitude
      };
      return (
        <MapView.Marker.Animated coordinate={coordinate} />
      );
    });

  }

onRegionChange(region) {
  this.setState({region});
}

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
        let {container, map} = styles;
        this.props.mapFetch(this.state.region.latitude, this.state.region.longitude);

    return (
      <View style={container}>
         <MapView style={map}
          onRegionChange={this.onRegionChange}

    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
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

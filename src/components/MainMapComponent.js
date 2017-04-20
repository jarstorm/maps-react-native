import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ListView, View, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { mapFetch, createMark, regionChanged, addButtonPress } from '../actions';

class MainMapComponent extends Component {

  renderPoints() {
    console.log("puntos", this.props.marks);
    return this.props.marks.map((point) => {
      const coordinate = {
        latitude: point.geo[0],
        longitude: point.geo[1]
      };
      return (
        <MapView.Marker.Animated 
          key={point._id}
          coordinate={coordinate} 
          title={point.name}
          description={point.descrption}
        />
      );
    });

  }

componentDidMount() {
  console.log(this.map);
    navigator.geolocation.getCurrentPosition(
    (position) => {
      this.map.animateToRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0025, longitudeDelta: 0.0025
      });
      //this.map.animateToRegion({latitude: -33.852896, longitude: 151.210291, latitudeDelta: 0.0025, longitudeDelta: 0.0025}, 15000)
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
  }


onRegionChangeComplete(region) {
  this.props.regionChanged(region);
  //this.onRegisterButtonPress.bind(this);
 this.props.mapFetch(region.latitude, region.longitude);
}

onPressAddButton(event) {
  this.props.addButtonPress();
}

showAddMessage() {
  console.log("show");
  if (this.props.addButtonPressed) {
    console.log("show dentro");
    return (
    <Text style={[styles.bubble]}>
      Tap on screen to add
    </Text>
    
    );
  }
}

mapPress(event) {
  const coordinate = event.nativeEvent.coordinate;
  if (this.props.addButtonPressed) {    
    const data = {
      name: "nuevo",
      description: "Este es uno nuevo",
      geo: [ coordinate.latitude, coordinate.longitude]
    };
    this.props.createMark(data);    
    setTimeout(() => {this.props.mapFetch(coordinate.latitude, coordinate.longitude);console.log("llamando")}, 1000)
  } 
}

  render() {
        let {container, map} = styles;        
        console.log("Props", this.props);
    return (
      <View style={container}>
         <MapView
          ref={component => this.map = component} 
          style={map}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          showsUserLocation={true}
          followsUserLocation={true}
          onPress={this.mapPress.bind(this)} >
    {this.renderPoints()}
  </MapView>

  <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.bubble, styles.button]}
            onPress={this.onPressAddButton.bind(this)}>
            <Text>+</Text>
          </TouchableOpacity>
          {this.showAddMessage()}
        </View>

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
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
};


const mapStateToProps = state => {  
  const { addButtonPressed } = state.map;

  const marks = _.map(state.map.marks, (val, uid) => {
    console.log(val, uid);
    return { ...val, uid };
  });

console.log({ marks, addButtonPressed });
  return { marks, addButtonPressed };
};

export default connect(mapStateToProps, { mapFetch, createMark, regionChanged, addButtonPress })(MainMapComponent);

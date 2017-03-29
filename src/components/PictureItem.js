import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection } from './common';

class PictureItem extends Component {

  render() {
    const { source } = this.props.picture;

    return (
        <View>
          <CardSection>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: source}}
          />
          </CardSection>
        </View>
    );
  }
}

export default PictureItem;

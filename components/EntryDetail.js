import React from 'react';
import { View, Text } from 'react-native';

class EntryDetail extends React.Component {
  render() {
    return (
      <View>
        <Text>Entry Detail</Text>
        <Text>{JSON.stringify(this.props.route.params.entryId)}</Text>
      </View>
    );
  }
}

export default EntryDetail;

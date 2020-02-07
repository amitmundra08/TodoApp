import React from 'react';
import {VisibilityFilters} from '../actions'; //getting all the filter types
import {View, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {setVisibilityFilter} from '../actions';

const Footer = ({onClick}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
        marginRight: 16,
      }}>
      <View style={styles.container}>
        <Button
          title="SHOW ALL"
          onPress={() => onClick(VisibilityFilters.SHOW_ALL)}
        />
      </View>
      <View style={styles.container}>
        <Button
          title="ACTIVE"
          onPress={() => onClick(VisibilityFilters.SHOW_ACTIVE)}
        />
      </View>
      <View style={styles.container}>
        <Button
          title="COMPLETED"
          onPress={() => onClick(VisibilityFilters.SHOW_COMPLETED)}
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  onClick: filter => dispatch(setVisibilityFilter(filter)),
});

export default connect(null, mapDispatchToProps)(Footer);

const styles = StyleSheet.create({
  container: {
    marginLeft: 17,
  },
});

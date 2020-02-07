import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { setVisibilityFilter } from "../actions";

const Link = ({ children, onClick, filter }) => (
    <View style={styles.container}>
        <Button title={children} onPress={() => onClick(filter)} />
    </View>
);

const mapDispatchToProps = dispatch => ({
    onClick: filter => dispatch(setVisibilityFilter(filter))
});

export default connect(
    null,
    mapDispatchToProps
)(Link);

const styles = StyleSheet.create({
    container: {
        marginLeft: 17
    }
});

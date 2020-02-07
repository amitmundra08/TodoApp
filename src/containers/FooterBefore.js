import React from "react";
import Link from "../components/Link";
import { View } from "react-native";
import { VisibilityFilters } from "../actions"; //getting all the filter types

const Footer = () => {
    return (
        <View style={{ flexDirection: "row", padding: 2 }}>
            <Link filter={VisibilityFilters.SHOW_ALL}>All</Link>
            <Link filter={VisibilityFilters.SHOW_ACTIVE}>Active</Link>
            <Link filter={VisibilityFilters.SHOW_COMPLETED}>Completed</Link>
        </View>
    );
};

export default Footer;

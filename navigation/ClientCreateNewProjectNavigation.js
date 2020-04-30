import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NewProjectScreen from "../screens/client/NewProjectScreen";
import NewProjectScreenTwo from "../screens/client/NewProjectScreenTwo";
import NewProjectScreenThree from "../screens/client/NewProjectScreenThree";


const ClientCreateNewProjectNavigation = createStackNavigator();

function ClientCreateNewProjectNavigation() {
    return (
        <ClientCreateNewProjectNavigation.Navigator headerMode="none">
            <ClientCreateNewProjectNavigation.Screen
                name="NewProjectScreen"
                component={NewProjectScreen}
            />
            <ClientCreateNewProjectNavigation.Screen
                name="NewProjectScreenTwo"
                component={NewProjectScreenTwo}
            />
            <ClientCreateNewProjectNavigation.Screen
                name="NewProjectScreenThree"
                component={NewProjectScreenThree}
            />
        </ClientCreateNewProjectNavigation.Navigator>
    );
}

export default ClientCreateNewProjectNavigation;

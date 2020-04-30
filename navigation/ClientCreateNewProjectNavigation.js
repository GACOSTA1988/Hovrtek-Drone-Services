import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NewProjectScreen from "../screens/client/NewProjectScreen";
import NewProjectScreenTwo from "../screens/client/NewProjectScreenTwo";
import NewProjectScreenThree from "../screens/client/NewProjectScreenThree";


const CreateNewProjectStack = createStackNavigator();

function ClientCreateNewProjectNavigation() {
    return (
        <CreateNewProjectStack.Navigator headerMode="none">
            <CreateNewProjectStack.Screen
                name="NewProjectScreen"
                component={NewProjectScreen}
            />
            <CreateNewProjectStack.Screen
                name="NewProjectScreenTwo"
                component={NewProjectScreenTwo}
            />

            <CreateNewProjectStack.Screen
                name="NewProjectScreenThree"
                component={NewProjectScreenThree}
            />
        </CreateNewProjectStack.Navigator>
    );
}

export default ClientCreateNewProjectNavigation;

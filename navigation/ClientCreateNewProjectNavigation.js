import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NewProjectScreenOne from "../screens/client/NewProjectScreenOne";
import NewProjectScreenTwo from "../screens/client/NewProjectScreenTwo";
import NewProjectScreenThree from "../screens/client/NewProjectScreenThree";
import NewProjectScreenWelcome from "../screens/client/NewProjectScreenWelcome";


const CreateNewProjectStack = createStackNavigator();

function ClientCreateNewProjectNavigation() {
    return (
        <CreateNewProjectStack.Navigator headerMode="none">
            <CreateNewProjectStack.Screen
                name="NewProjectScreenWelcome"
                component={NewProjectScreenWelcome}
            />
            <CreateNewProjectStack.Screen
                name="NewProjectScreenOne"
                component={NewProjectScreenOne}
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

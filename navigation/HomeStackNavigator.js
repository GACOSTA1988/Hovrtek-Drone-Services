import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import NewProjectScreenOne from "../screens/client/NewProjectScreenOne";
import NewProjectScreenTwo from "../screens/client/NewProjectScreenTwo";
import NewProjectScreenThree from "../screens/client/NewProjectScreenThree";
import NewProjectScreenWelcome from "../screens/client/NewProjectScreenWelcome";
import ProjectListScreen from "../screens/client/ProjectListScreen";
import ProjectDetailsScreen from "../screens/client/ProjectDetailsScreen";
import EditProjectScreen from "../screens/client/EditProjectScreen";
import PilotProfileWelcomeScreen from '../screens/pilot/PilotProfileWelcomeScreen';
import ChatScreen from '../screens/messaging/ChatScreen';


const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator headerMode="none" initialRouteName="NewProjectScreenWelcome" >
            <HomeStack.Screen
                name="NewProjectScreenWelcome"
                component={NewProjectScreenWelcome}
            />
            <HomeStack.Screen
                name="NewProjectScreenOne"
                component={NewProjectScreenOne}
            />
            <HomeStack.Screen
                name="NewProjectScreenTwo"
                component={NewProjectScreenTwo}
            />
            <HomeStack.Screen
                name="NewProjectScreenThree"
                component={NewProjectScreenThree}
            />
            <HomeStack.Screen
                name="ProjectListScreen"
                component={ProjectListScreen}
            />
            <HomeStack.Screen
                name="ProjectDetailsScreen"
                component={ProjectDetailsScreen}
            />
            <HomeStack.Screen
                name="EditProjectScreen"
                component={EditProjectScreen}
            />
            <HomeStack.Screen
                name="PilotProfileWelcomeScreen"
                component={PilotProfileWelcomeScreen}
            />
            <HomeStack.Screen
                name="ChatScreen"
                component={ChatScreen}
            />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;

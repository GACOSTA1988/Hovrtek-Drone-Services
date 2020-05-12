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
import MainHeader from '../components/MainHeader';
import NestedHeader from '../components/NestedHeader';
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createStackNavigator();

const mainHeaderStyle = {
  backgroundColor: "#092455",
  height: 100
}

const ClientHomeStackNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="NewProjectScreenWelcome" >
            <HomeStack.Screen
                name="NewProjectScreenWelcome"
                component={NewProjectScreenWelcome}
                options={{
                  title: "Welcome",
                  headerTitle: () => <MainHeader />,
                  headerStyle: mainHeaderStyle
                }}
            />
            <HomeStack.Screen
                name="NewProjectScreenOne"
                component={NewProjectScreenOne}
                options={{
                  headerTitle: () => <NestedHeader />,
                  headerStyle: mainHeaderStyle
                }}
            />
            <HomeStack.Screen
                name="NewProjectScreenTwo"
                component={NewProjectScreenTwo}
                options={{
                  headerTitle: () => <NestedHeader />,
                  headerStyle: mainHeaderStyle
                }}
            />
            <HomeStack.Screen
                name="NewProjectScreenThree"
                component={NewProjectScreenThree}
                options={{
                  headerTitle: () => <NestedHeader />,
                  headerStyle: mainHeaderStyle
                }}
            />
            <HomeStack.Screen
                name="ProjectListScreen"
                component={ProjectListScreen}
                options={{
                  headerTitle: () => <NestedHeader />,
                  headerStyle: mainHeaderStyle
                }}
            />
            <HomeStack.Screen
                name="ProjectDetailsScreen"
                component={ProjectDetailsScreen}
                options={{
                  headerTitle: () => <NestedHeader />,
                  headerStyle: mainHeaderStyle
                }}
            />
            <HomeStack.Screen
                name="EditProjectScreen"
                component={EditProjectScreen}
                options={{
                  headerTitle: () => <NestedHeader />,
                  headerStyle: mainHeaderStyle
                }}
            />
            <HomeStack.Screen
                name="PilotProfileWelcomeScreen"
                component={PilotProfileWelcomeScreen}
                options={{
                  headerTitle: () => <NestedHeader />,
                  headerStyle: mainHeaderStyle
                }}
            />
            <HomeStack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                  headerTitle: () => <NestedHeader />,
                  headerStyle: mainHeaderStyle
                }}
            />
        </HomeStack.Navigator>
    );
};

export default ClientHomeStackNavigator;

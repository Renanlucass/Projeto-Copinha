import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChampionshipDetailScreen from '../screens/ChampionshipDetailsScreen';
import LineUpScreen from '../screens/LineupScreen';
import StatsScreen from '../screens/StatsScreen';
import TableScreen from '../screens/TablesScreen';

const Tab = createBottomTabNavigator();

export default function ChampionshipDetailTabs({ route }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: '#041F21', 
          height: 60, 
          paddingBottom: 10, 
          borderRadius: 50,
          top: '-0.5%',
          width: '95%',
          marginLeft: '2%',
        },
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: {
          fontSize: 12, 
        },

      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={ChampionshipDetailScreen} 
        initialParams={route.params}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Partidas"
        component={LineUpScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Tabela" 
        component={TableScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="podium-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Estatisticas" 
        component={StatsScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
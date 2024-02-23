'use client'
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { Tab, Tabs} from "@nextui-org/react";

const GoldChart = ({onSelectionChange , selectedTab , tab}: any) => {
    return (
        <>
            <Tabs onSelectionChange={onSelectionChange}>
                {tab.map((item: any) => <Tab key={item.key} title={item.tabName}/>)}
            </Tabs>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    className={"w-full xl:h-full pr-12"}
                    data={selectedTab}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default GoldChart;
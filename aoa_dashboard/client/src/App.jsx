import React, {useState} from 'react';
import {gql, useSubscription} from "@apollo/client"

import GaugeComponent from 'react-gauge-component'

const originalLayout = getFromLS("layouts") || {}

//Component with default values

const GET_LATEST_MESSAGE = gql`
  subscription USRP {
    usrp {
      serial_num
      aoa
      ss
    }
  }`


import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
const AddRemoveLayout = ({ className = "layout", cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }, rowHeight = 100 }) => {

  const [usrpData, setUSRPData] = useState({USRP_Values: {"Distance to Drone": {aoa: 0}, "316405C": { serial_num: "316405C", aoa: 42.47937668825662, ss: 0.012884138141430412, __typename: "USRP_message" }, "3164076": { serial_num: "3164076", aoa: -12.908682329955864, ss: 0.006417021444505622, __typename: "USRP_message" }}})

  const [items, setItems] = useState(

      [{
        name: "3164076",
        x: (0 * 2) %12,
        y: (0/6) * 0,
        w: 2,
        h: 2
      },{
        name: "316405C",
        x: (1 * 2) %12,
        y: (1/6) * 1,
        w: 2,
        h: 2
      },{
        name: "Distance to Drone",
        x: (2 * 2) %12,
        y: (2/6) * 2,
        w: 2,
        h: 2
      }]
  );

  const [layouts, setLayouts] = useState(JSON.parse(JSON.stringify(originalLayout)))

  const [newCounter, setNewCounter] = useState(0);
  const [breakpoint, setBreakpoint] = useState(null);

  const createElement = (el) => {
    const signalConfig = {
      "label": "°",
      "start": -90,
      "end": 90,
      "major_divisions": 25,
      "minor_divisions": 10,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  };
    return (
      <div key={el.name} data-grid={el}>
        <GaugeComponent 
        value={usrpData.USRP_Values[el.name].aoa}
        arc={{subArcs:[{limit:signalConfig.start, color: "#FFFFFF"}]}}
        minValue={signalConfig.start}
        maxValue={signalConfig.end}
        marginInPercent={{top: 0.12, bottom: -0.03, left: 0.07, right: 0.07}}
        labels={{
          "formatTextValue": "test",
          "matchColorWithArc": false,
          "maxDecimalDigits": 2,
          "hide": false,
          valueLabel: {
            formatTextValue: (value) => {return `${value}${signalConfig.label}`}
          },
          tickLabels: {
            ticks: Array.from({ length: (signalConfig.end - signalConfig.start)/signalConfig.major_divisions }, (_, index) => index * signalConfig.major_divisions + signalConfig.start).map(value => ({ value}))
        }
        }} />
        <h5 className="mb-1" align="center">{el.name}</h5>
      </div>
    );
  }

  const onBreakpointChange = (newBreakpoint, newCols) => {
    setBreakpoint(newBreakpoint);
  }

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts)
  }

  useSubscription(GET_LATEST_MESSAGE, {
    onSubscriptionData: (subscriptionData) =>{
        if (subscriptionData?.subscriptionData?.data?.usrp) {
          const usrpData = subscriptionData?.subscriptionData?.data?.usrp
          setUSRPData(prevState => {
            const newCANState = {...prevState.USRP_Values}
            if (usrpData.ss > 0.1) {
              newCANState[usrpData.serial_num] = usrpData
            }

            return {USRP_Values: newCANState}
          })
        }
    }
  })

  return (
    <div>
      <ResponsiveReactGridLayout
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        onBreakpointChange={onBreakpointChange}
        className={className}
        cols={cols}
        rowHeight={rowHeight}
        layouts={originalLayout}
      >
        {items.map(el => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

function getFromLS(key) {
  let ls = {};
  if (localStorage) {
    try {
      ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      console.log(e)
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (localStorage) {
    localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default AddRemoveLayout;
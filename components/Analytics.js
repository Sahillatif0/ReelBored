import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { PieChart, LineChart, BarChart} from "react-native-gifted-charts";
import React, {useState} from 'react'

const Analytics = () => {
    const [pieData, setPieData] = useState([
        {value: 35, color: '#ED6665', text: 'Youtube: 35%'},
        {value: 15, color: '#d930b1', text: 'Instagram: 15%'},
        {value: 20, color: '#177AD5', text: 'Facebook: 20%'},
        {value: 30, color: '#f2f540', text: 'Snapchat: 30%', focused: true}
    ])
    const data = [{value: 5}, {value: 10}, {value: 20},{value: 15}, {value: 7}, {value: 22},{value: 25}];
    const renderDot = color => {
        return (
          <View
            style={{
              height: 7,
              width: 7,
              borderRadius: 4,
              backgroundColor: color,
              marginRight: 5,
            }}
          />
        );
      };
  return (
    <View style={styles.analyticsBox}>
      <TouchableOpacity style={[styles.box, styles.box1]}>
        <Text style={styles.countHeading}>Open Tries</Text>
        <PieChart
          data={pieData}
          donut
          sectionAutoFocus
          radius={65}
          innerRadius={30}
          innerCircleColor={'#191919'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 12, color: 'white', fontWeight: 'bold'}}>
                  47%
                </Text>
                <Text style={{fontSize: 10, color: 'white'}}>Excellent</Text>
              </View>
            );
          }}
        />
        <View
        style={styles.dataDotView}>
            {pieData.map((item, index) => (<View key={index} style={styles.dotView}>{renderDot(item.color)}<Text style={styles.dotText}>{item.text}</Text></View>))}
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.box, styles.box2]}>
        <Text style={styles.countHeading}>Weekly</Text>
        <View style={styles.linechart}>
        {/* <LineChart
        areaChart
        curved
        width={100}
        height={250}
        hideAxesAndRules
        data={data}
        color1='#12bd12a2'
        startFillColor="rgba(108, 214, 117, 0.575)"
        startOpacity={0.8}
        endFillColor="rgb(123, 250, 165)"
        initialSpacing={0}
        // disableScroll={true}
        dataPointsColor1='green'
        endOpacity={0.3}/> */}
        <BarChart 
        data={data}
        frontColor={'#48da48a0'}
        hideAxesAndRules
        width={100}
        height={200}
        barWidth={10}
        spacing={2}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    analyticsBox:{
        display: 'flex',
        width: '90%',
        height: '40%',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#151515',
        padding: 20,
        borderRadius: 15,
        // margin: 10,
    },
    box:{
        width: '55%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919',
        borderRadius: 15,
        margin: 10,
        paddingBottom: 20
    },
    box1:{
        width: '55%',
        shadowColor: 'black',
        elevation: 10

    },
    box2:{
        width: '40%'
    },
    linechart:{
        marginLeft: -55,
        marginTop: -50
    },
    countHeading: {
        margin: 30,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    dataDotView:{
        display: 'flex',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 10
    },
    dotView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginBottom: 5,
    },
    dotText:{
        color: 'white',
        fontSize: 9,
        fontWeight: 'bold'
    }
})
export default Analytics
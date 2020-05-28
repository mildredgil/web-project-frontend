import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import * as colors from '../../constants/colors';
import { themeBlack } from '../../constants/chartThemes';

const MyResponsiveLine = ({ data, isSmall=true, isMobile=false, isConfirm=false  }) => {
    let axisBottom = null;
    let axisLeft = null;
    var Defaultmargin = { top: 10, right: 10, bottom: 15, left: 15 };
    var legendTy = 0;
    var legendTx = 0;
    var colorArray = [colors.RED,colors.BLUE_LIGHT];
    var dataContent = data;

    if ( isMobile ) {
        axisLeft = {
            orient: 'left',
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legend: 'CASOS',
            legendOffset: -45,
            legendPosition: 'middle'
        };

        Defaultmargin = { top: 10, right: 10, bottom: 15, left: 50 };
        
        if( data.length ) {
            dataContent = [data[isConfirm ? 1 : 0]];
        }

        if( isConfirm ) {
            colorArray = [colors.BLUE_LIGHT];
        } else {
            colorArray = [colors.RED];
        }
    }

    if( !isSmall ) {
        axisBottom = {
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 0,
            tickRotation: -31,
            legendOffset: 55,
            legendPosition: 'middle',
            legend: 'FECHA'
        };
        axisLeft = {
            orient: 'left',
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legend: 'CASOS',
            legendOffset: -45,
            legendPosition: 'middle'
        };
        Defaultmargin = { 
            top: 60, 
            right: 60, 
            bottom: 60, 
            left: 60 
        };
        legendTy = -20;
        legendTx = 20;
    }

    return(
        <ResponsiveLine
        theme={themeBlack}
        colors={colorArray}
        data={dataContent}
        margin={Defaultmargin}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        lineWidth={2}
        pointSize={7}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabel="y"
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={.6}
        useMesh={!isSmall}
        enableGridX={false}
        enableGridY={false}
        legends={[
            {
                colors: 'BLUE',
                anchor: 'top',
                fill: colors.WHITE,
                direction: 'row',
                justify: false,
                translateX: legendTx,
                translateY: legendTy,
                itemsSpacing: 5,
                itemDirection: 'left-to-right',
                itemWidth: 90,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                itemTextColor: colors.WHITE,
                
            }
        ]}
        />
    )
}

export default MyResponsiveLine;
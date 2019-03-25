import React from 'react';
import { View, DatePickerIOS, requireNativeComponent, StyleSheet } from 'react-native';
import moment from 'moment'

const NativeDatePicker = requireNativeComponent(`DatePickerManager`, DatePickerAndroid, { nativeOnly: { onChange: true } });

class DatePickerAndroid extends React.PureComponent {

    static defaultProps = {
        mode: 'datetime',
        minuteInterval: 1,
    };

    render = () => {
        return (
            <View style={styles.container} >
                <NativeDatePicker
                    {...this.props}
                    date={this._date()}
                    minimumDate={this._minimumDate()}
                    maximumDate={this._maximumDate()}
                    onChange={this._onChange}
                    style={[styles.picker]}
                />
            </View>
        )
    }

    _onChange = e => {
        const momentDateWithOffset = moment(e.nativeEvent.date).add(this._getOffsetMinutes(), 'minutes')
        const jsDate = momentDateWithOffset.toDate()
        this.props.onDateChange(jsDate)
    }

    _maximumDate = () => this._toIsoWithTimeZoneOffset(this.props.maximumDate);

    _minimumDate = () => this._toIsoWithTimeZoneOffset(this.props.minimumDate);

    _date = () => this._toIsoWithTimeZoneOffset(this.props.date);

    _toIsoWithTimeZoneOffset = date => date && moment(date).add(-this._getOffsetMinutes(), 'minutes').toISOString()

    _getOffsetMinutes = () => this.props.timeZoneOffsetInMinutes === undefined ? 0
        : -(this.props.timeZoneOffsetInMinutes + new Date().getTimezoneOffset())

}

const styles = StyleSheet.create({
    picker: {
        width: 500,
        height: 180,
        borderWidth: 1,
    },
    container: {
        borderWidth: 1,
    }
})

DatePickerAndroid.propTypes = DatePickerIOS.propTypes;

export default DatePickerAndroid;

import React, { Component } from 'react';
import { PickerAddress } from '../components-ext';
import '../style/area.scss';

export default class PickerDemo extends Component {

    constructor() {
        super();

        this.defaultAddress = ['湖南省','长沙市','开福区'];
        this.state = {
            userPickerVisible: false,
            addressPickerVisible: false,
            defaultValue: {name: 'Lincal', value: 5},
            address: this.defaultAddress,
        };

    }


    // 地址选择
    showAddressPicker (e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({addressPickerVisible: true});
    }

    handleChangeAddress (address) {
        this.setState({address: address});
    }

    closeAddressPicker (address) {
        this.setState({
            address: address,
            addressPickerVisible: false,
        });
    }

    cancelAddressPicker () {
        this.setState({
            address: this.defaultAddress,
            addressPickerVisible: false,
        });
    }

    render() {
        return (
            <div className = "picker-demo">


                <PickerAddress
                    defaultValue={this.state.address}
                    onCancel={this.cancelAddressPicker.bind(this)}
                    onConfirm={this.closeAddressPicker.bind(this)}
                    visible={this.state.addressPickerVisible}
                    onChange={this.handleChangeAddress.bind(this)}>
                </PickerAddress>


                <div className="item">
                    { this.state.address }
                </div>

                <div className="button-wrap">
                    <button
                        type="button"
                        onClick={this.showAddressPicker.bind(this)}
                        className="btn button-primary">
                        选择地址
                    </button>
                </div>

            </div>
        )
    }
}
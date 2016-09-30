export default class HeartrateMonitor{

  HeartrateMonitor(){
    this.chosenHeartRateService = null;
  }


  requestDevice(){
    navigator.bluetooth.requestDevice({
      filters: [{
        services: ['heart_rate'],
      }]
    }).then(device => {device.gatt.connect()})
    .then(server => server.getPrimaryService('heart_rate'))
    .then(service => {
      this.chosenHeartRateService = service;
      return Promise.all([
        service.getCharacteristic('body_sensor_location')
        .then(this.handleBodySensorLocationCharacteristic),
        service.getCharacteristic('heart_rate_measurement')
        .then(this.handleHeartRateMeasurementCharacteristic),
        ]);
    });
  }
  

  handleBodySensorLocationCharacteristic(characteristic) {
    if (characteristic === null) {
      console.log("Unknown sensor location.");
      return Promise.resolve();
    }
    return characteristic.readValue()
    .then(sensorLocationData => {
      let sensorLocation = sensorLocationData.getUint8(0);
      switch (sensorLocation) {
        case 0: return 'Other';
        case 1: return 'Chest';
        case 2: return 'Wrist';
        case 3: return 'Finger';
        case 4: return 'Hand';
        case 5: return 'Ear Lobe';
        case 6: return 'Foot';
        default: return 'Unknown';
      }
    }).then(location => console.log(location));
  }

  handleHeartRateMeasurementCharacteristic(characteristic) {
    return characteristic.startNotifications()
    .then(char => {
      characteristic.addEventListener('characteristicvaluechanged',
        this.onHeartRateChanged);
    });
  }

  onHeartRateChanged(event) {
    let characteristic = event.target;
    console.log(this.parseHeartRate(characteristic.value));
  }

  parseHeartRate(data) {
    let flags = data.getUint8(0);
    let rate16Bits = flags & 0x1;
    let result = {};
    let index = 1;
    if (rate16Bits) {
      result.heartRate = data.getUint16(index, /*littleEndian=*/true);
      index += 2;
    } else {
      result.heartRate = data.getUint8(index);
      index += 1;
    }
    let contactDetected = flags & 0x2;
    let contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
      result.contactDetected = !!contactDetected;
    }
    let energyPresent = flags & 0x8;
    if (energyPresent) {
      result.energyExpended = data.getUint16(index, /*littleEndian=*/true);
      index += 2;
    }
    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      let rrIntervals = [];
      for (; index + 1 < data.byteLength; index += 2) {
        rrIntervals.push(data.getUint16(index, /*littleEndian=*/true));
      }
      result.rrIntervals = rrIntervals;
    }
    return result;
  }
}

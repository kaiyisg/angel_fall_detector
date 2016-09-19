export default class BluetoothHelper{

	requestDevice(){
		navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
		.then(device => {
			console.log('> Name:             ' + device.name);
			console.log('> Id:               ' + device.id);
			console.log('> Allowed Services: ' + device.uuids.join('\n' + ' '.repeat(20)));
			console.log('> Connected:        ' + device.gatt.connected);
		}).then(device => { console.log(device); })
		.catch(error => { console.log(error); });

	}
}
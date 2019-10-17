import React, { PureComponent } from 'react'
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';



export default function Contact() {

	return (
		<>
			<Card title="Contact Information">
			<Text style={{margin: 10}}>
				121, Clear Water Bay Road
				Clear Water Bay, Kowloon
				HONG KONG
				Tel: +852 1234 5678
				Fax: +852 8765 4321
				Email:confusion@food.net
			</Text>
			</Card>
			</>
		)
}

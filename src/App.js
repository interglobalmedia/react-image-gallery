import React, {Component} from 'react';
import Gallery from './components/Gallery';
import Radium, {StyleRoot} from 'radium';


class App extends Component {
	render() {

		return (
			<StyleRoot>
				<div>
					<Gallery />
				</div>
			</StyleRoot>
		)
	}
}

export default Radium(App);

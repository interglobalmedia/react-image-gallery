import React, {Component} from 'react';
import Gallery from './components/Gallery';
import Radium, {StyleRoot} from 'radium';


class App extends Component {
	render() {

		return (
			<StyleRoot>
				<div className='App'>
					<Gallery />
					<footer>© 2017 Maria D. Campbell</footer>
				</div>
			</StyleRoot>
		)
	}
}

export default Radium(App);

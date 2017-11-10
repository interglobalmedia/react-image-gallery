import React, {Component} from 'react';
import GalleryModal from './GalleryModal';
import Radium from 'radium';

const imgUrls = [
	'https://source.unsplash.com/jdFscnVoDxw/800x600',
	'https://source.unsplash.com/sfgH9dXcMRw/800x600',
	'https://source.unsplash.com/RTZ4af86CkU/800x600',
	'https://source.unsplash.com/whDrFMucHkc/800x600',
	'https://source.unsplash.com/OP3ghv27Yto/800x600',
	'https://source.unsplash.com/eTa53Uf0StE/800x600',
	'https://source.unsplash.com/qCxN0_piuHc/800x600',
	'https://source.unsplash.com/CWgkBbVxYqo/800x600',
	'https://source.unsplash.com/lXgH5qfaliQ/800x600',
	'https://source.unsplash.com/hDXs7TnArEE/800x600',
	'https://source.unsplash.com/FueRaNunlUc/800x600',
	'https://source.unsplash.com/aDTMGRdx28w/800x600'
];

class Gallery extends Component {
	state = {
		currentIndex: null
	};
	renderImageContent(src, index) {
		const imgStyle = {
			width: '100%',
			display: 'block'
		}
		return (
			<div key={src} onClick={(e) => this.openModal(e, index)}>
				<img style={imgStyle} src={src}/>
			</div>
		)
	}
	openModal = (e, index) => {
		this.setState({
			currentIndex: index
		});
	}
	closeModal = (e) => {
		if(e != undefined) {
			e.preventDefault();
		}
		this.setState({
			currentIndex: null
		});
	}
	findPrev = (e) => {
		let currentIndex = this.state.currentIndex;
		if(e != undefined) {
			e.preventDefault();
		}
		if(currentIndex >= 1) {
			this.setState(prevState => ({
				currentIndex: prevState.currentIndex - 1
			}))
		}
	}
	findNext = (e) => {
		let currentIndex = this.state.currentIndex;
		if(e != undefined) {
			e.preventDefault();
		}
		if(currentIndex + 1 < imgUrls.length) {
			this.setState(prevState => ({
				currentIndex: prevState.currentIndex + 1
			}));
		}
	}
	render() {
		const galleryContainerStyle = {
			padding: '0.9375rem 0'
		}
		const galleryGridStyle = {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			width: '100%'
		}
		const mediaMin320StyleGTC = {
			'@media (min-width: 320px)': {
				gridTemplateColumns: 'repeat(1, 1fr)'
			}
		}
		const mediaMin544StyleGTC = {
			'@media (min-width: 544px)': {
				gridTemplateColumns: 'repeat(2, 1fr)'
			}
		}
		const mediaMin960StyleGTC = {
			'@media (min-width: 960px)': {
				gridTemplateColumns: 'repeat(3, 1fr)'
			}
		}
		return (
			<div className='gallery-container' style={galleryContainerStyle}>
				<header><div data-text='What a Sizzler!' className='title'></div></header>
				<div className='gallery-grid' style={[galleryGridStyle, mediaMin320StyleGTC, mediaMin544StyleGTC, mediaMin960StyleGTC]}>
					{imgUrls.map(this.renderImageContent.bind(this))}
				</div>
				<GalleryModal
					closeModal={this.closeModal.bind(this)}
					findPrev={this.findPrev.bind(this)}
					findNext={this.findNext.bind(this)}
					hasPrev={this.state.currentIndex > 0}
					hasNext={this.state.currentIndex + 1 < imgUrls.length}
					src={imgUrls[this.state.currentIndex]}
				/>
			</div>
		)
	}
}

export default Radium(Gallery);

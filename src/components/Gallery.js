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
	constructor(props) {
		super(props);
		this.state = {currentIndex: null};
		this.closeModal = this.closeModal.bind(this);
		this.findNext = this.findNext.bind(this);
		this.findPrev = this.findPrev.bind(this);
		this.renderImageContent = this.renderImageContent.bind(this);
	}
	renderImageContent(src, index) {
		const imgStyle = {
			border: '5px solid #8b3a62',
			width: '100%'
		}
		return (
			<div key={src} onClick={(e) => this.openModal(e, index)}>
				<img style={imgStyle} src={src}/>
			</div>
		)
	}
	openModal(e, index) {
		this.setState({
			currentIndex: index
		});
	}
	closeModal(e) {
		if(e != undefined) {
			e.preventDefault();
		}
		this.setState({
			currentIndex: null
		});
	}
	findPrev(e) {
		if(e != undefined) {
			e.preventDefault();
		}
		this.setState(prevIndex => ({
			currentIndex: prevIndex.currentIndex - 1
		}));
	}
	findNext(e) {
		if(e != undefined) {
			e.preventDefault();
		}
		this.setState(prevIndex => ({
			currentIndex: prevIndex.currentIndex + 1
		}));
	}
	render() {
		const galleryContainerStyle = {
			padding: '0.9375rem 0'
		}
		const galleryContainerH1Style = {
		    margin: '2rem 0',
		    padding: '0',
		    textAlign: 'center',
		    color: '#8b3a62',
		    textTransform: 'uppercase',
		    fontSize: '7vw',
		    fontWeight: 'lighter',
			fontFamily: 'Inconsolata, monospace'
		}
		const galleryGridStyle = {
			display: 'grid',
		    gridTemplateColumns: 'repeat(3, 1fr)',
		    gridGap: '8px',
		    maxWidth: '1200px',
		    width: '100%',
		    margin: '0 auto',
			'img': {
				width: '100%',
				border: '5px solid #8b3a62'
			}
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
				<h1 style={galleryContainerH1Style}>This gallery is hot!</h1>
				<div className='gallery-grid' style={[galleryGridStyle, mediaMin320StyleGTC, mediaMin544StyleGTC, mediaMin960StyleGTC]}>
					{imgUrls.map(this.renderImageContent)}
				</div>
				<GalleryModal
					closeModal={this.closeModal}
					findPrev={this.findPrev}
					findNext={this.findNext}
					hasPrev={this.state.currentIndex > 0}
					hasNext={this.state.currentIndex + 1 < imgUrls.length}
					src={imgUrls[this.state.currentIndex]}
				/>
			</div>
		)
	}
}

export default Radium(Gallery);

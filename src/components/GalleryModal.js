import React, {Component} from 'react';
import Radium from 'radium';

class GalleryModal extends Component {
	constructor() {
		super();
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	componentDidMount() {
		document.body.addEventListener('keydown', this.handleKeyDown);
	}
	componentWillUnMount() {
		document.body.removeEventListener('keydown', this.handleKeyDown);
	}
	handleKeyDown(e) {
		if(e.keyCode === 27) {
			this.props.closeModal();
		}
		if(e.keyCode === 37 && this.props.hasPrev) {
			this.props.findPrev();
		}
		if(e.keyCode === 39 && this.props.hasNext) {
			this.props.findNext();
		}
	}
	render() {
		const modalOverlayStyle = {
		    position: 'fixed',
		    zIndex: '1',
		    height: '100%',
		    width: '100%',
		    backgroundColor: 'rgba(0, 0, 0, 0.4)',
		    top: '0',
		    left: '0'
		}
		const modalStyle = {
			position: 'fixed',
		    zIndex: '999',
		    width: '50%',
		    maxWidth: '800px',
		    top: '50%',
		    left: '50%',
		    transform: 'translate3d(-50%, -50%, 0)'
		}
		const modalBodyStyle = {
			position: 'relative'
		}
		const mediaMin320StyleModal = {
			'@media (min-width: 320px)': {
				width: '95%'
			}
		}
		const mediaMin544StyleModal = {
			'@media (min-width: 544px)': {
				width: '80%'
			}
		}
		const mediaMin960StyleModal = {
			'@media (min-width: 960px)': {
				width: '60%'
			}
		}
		const {closeModal, hasNext, hasPrev, findNext, findPrev, src} = this.props;
		if(!src) {
			return null;
		}
		return (
			<div>
				<div className='modal-overlay' style={modalOverlayStyle} onClick={closeModal}></div>
				<div className='modal' style={[modalStyle, mediaMin320StyleModal, mediaMin544StyleModal, mediaMin960StyleModal]} isOpen={!!src}>
					<div className='modal-body' style={modalBodyStyle}>
						<a href='#' className='modal-close' onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</a>
						{hasPrev && <a href='#' className='modal-prev' onClick={findPrev} onKeyDown={this.handleKeyDown}>&lsaquo;</a>}
						{hasNext && <a href='#' className='modal-next' onClick={findNext} onKeyDown={this.handleKeyDown}>&rsaquo;</a>}
						<img src={src}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Radium(GalleryModal);

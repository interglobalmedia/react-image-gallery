import React, {Component} from 'react';
import Radium from 'radium';

class GalleryModal extends Component {
	componentDidMount() {
		document.body.addEventListener('keydown', this.handleKeyDown);
	}
	componentWillUnMount() {
		document.body.removeEventListener('keydown', this.handleKeyDown);
	}
	handleKeyDown = (e) => {
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
		const anchorStyle = {
			position: 'absolute',
			display: 'inline',
			color: 'orange',
			textDecoration: 'none',
			lineHeight: '36px',
			fontSize: '30px',
			fontWeight: 'lighter',
			background: '#8b3a62',
			borderRadius: '5px',
			height: '40px',
			width: '40px',
			textAlign: 'center'
		}
		const modalCloseStyle = {
			right: '0',
			top: '0',
			borderRadius: '0 0 0 5pxs'
		}
		const constModalNextPrevStyle = {
			right: '0',
			top: 'calc(50% - 25px)',
			borderRadius: '5px 0 0 5px',
			height: '50px',
			lineHeight: '40px',
			fontSize: '60px'
		}
		const modalPrevStyle = {
			left: '0',
			right: 'auto',
			borderRadius: '0 5px 5px 0'
		}
		const imgStyle = {
			width: '100%',
			border: '5px solid #8b3a62'
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
		const {closeModal, hasPrev, hasNext, findNext, findPrev, src} = this.props;
		if(!src) {
			return null;
		}
		return (
			<div>
				<div className='modal-overlay' style={modalOverlayStyle} onClick={closeModal}></div>
				<div className='modal' style={[modalStyle, mediaMin320StyleModal, mediaMin544StyleModal, mediaMin960StyleModal]} isOpen={!!src}>
					<div className='modal-body' style={modalBodyStyle}>
						<a href='#' className='modal-close' style={[modalCloseStyle, anchorStyle]} onClick={closeModal} onKeyDown={this.handleKeyDown.bind(this)}>&times;</a>
						{hasPrev && <a href='#' className='modal-prev' style={[anchorStyle, constModalNextPrevStyle, modalPrevStyle]} onClick={findPrev} onKeyDown={this.handleKeyDown.bind(this)}>&lsaquo;</a>}
						{hasNext && <a href='#' className='modal-next' style={[anchorStyle, constModalNextPrevStyle]} onClick={findNext} onKeyDown={this.handleKeyDown.bind(this)}>&rsaquo;</a>}
						<img style={imgStyle} src={src}/>
					</div>
				</div>
			</div>
		)
	}
}

export default Radium(GalleryModal);

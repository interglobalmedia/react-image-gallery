import React, { Component } from 'react';
import GalleryModal from './GalleryModal';
import Radium from 'radium';

import abdelrahmanHassanein358776 from '../../images/abdelrahman-hassanein-358776-unsplash.jpg';
import antonRepponen99546 from '../../images/anton-repponen-99546-unsplash.jpg';
import caterinaSanders397156 from '../../images/caterina-sanders-397156-unsplash.jpg';
import davidClode453269 from '../../images/david-clode-453269-unsplash.jpg';
import elijahHiett401346 from '../../images/elijah-hiett-401346-unsplash.jpg';
import enikoPolgar81606 from '../../images/eniko-polgar-81606-unsplash.jpg';
import matthewMeredith364671 from '../../images/matthew-meredith-364671-unsplash.jpg';
import michalPrucha233888 from '../../images/michal-prucha-233888-unsplash.jpg';
import mohamedNohassi427279 from '../../images/mohamed-nohassi-427279-unsplash.jpg';
import nasa90395 from '../../images/nasa-90395-unsplash.jpg';
import roiDimor427577 from '../../images/roi-dimor-427577-unsplash.jpg';
import samanthaScholl157431 from '../../images/samantha-scholl-157431-unsplash.jpg';

const imgUrls = [
	abdelrahmanHassanein358776,
	antonRepponen99546,
	matthewMeredith364671,
	nasa90395,
	caterinaSanders397156,
	samanthaScholl157431,
	roiDimor427577,
	michalPrucha233888,
	elijahHiett401346,
	davidClode453269,
	enikoPolgar81606,
	mohamedNohassi427279
];

class Gallery extends Component {
    state = {
        currentIndex: null
    };
    openModal = (e, index) => {
        this.setState({
            currentIndex: index
        });
    }
    closeModal = (e) => {
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({
            currentIndex: null
        });
    }
    findPrev = (e) => {
        let currentIndex = this.state.currentIndex;
        if (e !== undefined) {
            e.preventDefault();
        }
        if (currentIndex >= 1) {
            this.setState(prevState => ({
                currentIndex: prevState.currentIndex - 1
            }))
        }
    }
    findNext = (e) => {
        let currentIndex = this.state.currentIndex;
        if (e !== undefined) {
            e.preventDefault();
        }
        if (currentIndex + 1 < imgUrls.length) {
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
        const imgStyle = {
			width: '100%',
			maxWidth: '800px',
			height: '100%',
			maxHeight: '600px',
            display: 'block'
        }
		return (
			<div className='gallery-container' style={galleryContainerStyle}>
				<header><div data-text='What a Sizzler!' className='title'></div></header>
				<div className='gallery-grid' style={[galleryGridStyle, mediaMin320StyleGTC, mediaMin544StyleGTC, mediaMin960StyleGTC]}>
					{imgUrls.map((imgUrl, index) =>
						<div key={imgUrl} onClick={(e) => this.openModal(e, index)}>
							<img style={imgStyle} src={imgUrl} />
						</div>
					)}
				</div>
				<GalleryModal
					closeModal={() => this.closeModal()}
					findPrev={() => this.findPrev()}
					findNext={() => this.findNext()}
					hasPrev={this.state.currentIndex > 0}
					hasNext={this.state.currentIndex + 1 < imgUrls.length}
					src={imgUrls[this.state.currentIndex]}
				/>
			</div>
		)
    }
}

export default Radium(Gallery);
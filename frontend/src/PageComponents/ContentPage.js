import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './ContentPage.css'
import ShortCollabsAPI from '../helpers/api';
import ContentPreviewComponent from '../DumbComponents/ContentPreviewComponent';

function ContentPage(){

	const { contentID } = useParams();
	const [contentDetails, setContentDetails] = useState({
		id: contentID,
		title: '',
		description: '',
		participants: [],
		link: '',
		datePublished: ''
	});
	// extra time: make falsey isLoading gif maybe with lazy/fallback attr
	
	useEffect(() => {

		async function fetchContentDetails(){

			const selectedRandomUser = await ShortCollabsAPI.selectContent(contentID);
			const contentResult = await ShortCollabsAPI.getContentData(selectedRandomUser.username, contentID);
			setContentDetails(contentResult);

		}

		fetchContentDetails();

	}, [contentID]);

	return (
	<div className="page paddedPage">
		<div id="content-majorContainer" className="width-85percent floatLeft">		
			<ContentPreviewComponent
				contentTitle={contentDetails.title}
				contentLink={contentDetails.link}
				isFullSize={true}/>
			<h2>{contentDetails.title}</h2>
			<p><strong>Views</strong>: [number]&nbsp;&#183;&nbsp;<strong>Published</strong>: {contentDetails.datePublished ? contentDetails.datePublished.substring(0, 10) : contentDetails.datePublished}</p>
			<p>{contentDetails.description}</p>
			<p>{contentDetails.participants.map((element, index) => (
				<React.Fragment key={element}>
					<Link to={`/user/${element}`}>
						@{element}
					</Link>
					{index === contentDetails.participants.length - 1 ? null : <span>,&nbsp;</span>}
				</React.Fragment>
			))}</p>
		</div>
		<div id="content-minorContainer" className="width-15percent floatRight">
			<p>Engagement or Related Content goes here</p>
		</div>

	</div>
	);

}

export default ContentPage;
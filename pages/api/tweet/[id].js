import axios from 'axios'

const headers = {
    'Authorization': `Bearer ${process.env.NEXT_APP_BEARER_TOKEN}`
}

export default async function handler (req, res) 
{
	const id = req.query.id
	try {
		const response = await axios.get(`https://api.twitter.com/2/tweets/${id}?expansions=author_id,attachments.media_keys&user.fields=profile_image_url,verified&tweet.fields=created_at,attachments,public_metrics,entities,source&media.fields=preview_image_url,url`, {headers})
		console.log(response.data)
		res.status(200).json({ data:  response.data, status: response.status})
	}

	catch(e) {
		res.send({message: 'Something went wrong, please try again'})
	}
}

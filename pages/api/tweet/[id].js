import axios from 'axios'

const headers = {
    'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
}

export default async function handler (req, res) 
{
	const id = req.query.id
	const data = await axios.get(`https://api.twitter.com/2/tweets/${id}?expansions=author_id,attachments.media_keys&user.fields=profile_image_url,verified&tweet.fields=created_at,attachments,public_metrics,entities,source&media.fields=preview_image_url,url`, {headers})
	res.status(200).send({ data:  data.data})
}
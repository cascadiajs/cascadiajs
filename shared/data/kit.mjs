async function addSubscriber({ email_address }) {
    const options = {
        method: 'POST',
        headers: { 'X-Kit-Api-Key': process.env.KIT_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email_address,
            state: 'active',
        })
    };
    const response = await fetch('https://api.kit.com/v4/subscribers', options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function tagSubscriber({ email_address, tag_id }) {
    const options = {
        method: 'POST',
        headers: { 'X-Kit-Api-Key': process.env.KIT_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email_address
        })
    };
    const response = await fetch(`https://api.kit.com/v4/tags/${ tag_id }/subscribers`, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export {
    addSubscriber,
    tagSubscriber
}
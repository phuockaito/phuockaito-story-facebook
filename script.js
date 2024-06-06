(() => {

    const message = "💙"
    function getUserId() {
        const regex = /c_user=(\d+);/gm;
        const resp = regex.exec(document.cookie);
        return resp[1];
    }

    function getFbdtsg() {
        const regex = /"DTSGInitialData",\[],{"token":"(.+?)"/gm;
        const resp = regex.exec(document.documentElement.innerHTML);
        return resp[1];
    }

    function getStoryId() {
        const htmlStory = document.getElementsByClassName('xh8yej3 x1n2onr6 xl56j7k x5yr21d x78zum5 x6s0dn4');
        return htmlStory[htmlStory.length - 1].getAttribute('data-id');
    }

    const user_id = getUserId();
    const fb_dtsg = getFbdtsg();
    const story_id = getStoryId();

    return new Promise(async (resolve, reject) => {
        const variables = {
            input: {
                lightweight_reaction_actions: {
                    offsets: [0],
                    reaction: message
                },
                story_id,
                story_reply_type: 'LIGHT_WEIGHT',
                actor_id: user_id,
                client_mutation_id: 7,
            },
        };

        const body = new URLSearchParams();
        body.append('av', user_id);
        body.append('__user', user_id);
        body.append('__a', 1);
        body.append('fb_dtsg', fb_dtsg);
        body.append('fb_api_caller_class', 'RelayModern');
        body.append(
            'fb_api_req_friendly_name',
            'useStoriesSendReplyMutation'
        );
        body.append('variables', JSON.stringify(variables));
        body.append('server_timestamps', true);
        body.append('doc_id', '3769885849805751');

        try {
            const response = await fetch(
                'https://www.facebook.com/api/graphql/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body,
                }
            );
            const res = await response.json();
            if (res.errors) return reject(res);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
})()

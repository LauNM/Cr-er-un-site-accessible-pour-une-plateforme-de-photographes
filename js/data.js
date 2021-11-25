export const getPhotographersData = async () =>
    fetch('/data.json').then(response => {
        return response.json();
    }).then(({ photographers }) => {
        return ({ photographers })
    })

export const getMediaData = async () =>
    fetch('/data.json').then(response => {
        return response.json();
    }).then(({ media }) => {
        return ({ media })
    })